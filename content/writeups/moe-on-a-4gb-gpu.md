i have an rtx 3050 laptop with 4 gb of vram. olmoe-1b-7b needs about 14 gb in fp16. i wanted to know what actually happens when only ~20% of a mixture-of-experts model's experts fit on the gpu, and which of the usual tricks hold up when you measure them properly.

## the setup

every test was pre-registered. i wrote the hypothesis and the pass bar into a json file and committed it to git before collecting any data, so i couldn't move the goalposts after seeing results. i ran five phases this way on kaggle gpus, and reported the ones that failed as failures.

the pieces:
- a router-trace collector that logs which experts every token picks
- a trace-replay simulator (numba) to test caching policies: lru, lfu, decaying lfu and belady, the offline-optimal bound
- a live evaluator that hooks every moe router, rewrites its choices, and runs many policies as batch rows next to the full model, so output change (kl) is measured in the same forward pass with a noise floor of exactly 0
- task accuracy on gsm8k, hellaswag and arc-challenge with kv-cached generation
- 83 tests on tiny random moe models

## what i found

at ~3.4 gb of gpu memory (0.24x the full model):

| approach | kl vs full model | hellaswag | arc-c | ms/token* |
|---|---|---|---|---|
| full model (13.8 gb) | 0 | 77.4 | 47.4 | 13.6 |
| exact offloading | 0 | same | same | 76 |
| skip experts that aren't resident | 2.3 | 31.6 | 25.8 | 13.7 |
| quantise every expert to int3 | 0.14 | 73.6 | 43.0 | ~6 |
| resident fp16 experts, int4 copy on a miss | 0.0085 | 77.2 | 46.8 | 34 |

\* modelled from bandwidths measured on the laptop gpu, not an end-to-end kernel.

- better caching can't save exact offloading. even belady, which knows the future, is 4.5x slower than the compute floor at this budget, because routing changes too much from token to token.
- skipping experts breaks the model. gsm8k drops to 0 on both models.
- quantising everything so it all fits is too lossy.
- what works is keeping the hot experts in fp16 and serving a miss from a low-bit copy of the right expert. near-identical accuracy and 2.2x faster than exact offloading.

that mechanism isn't mine, it's hobbit-style. what i added is two refinements that helped on both models (exact first positions per document, hqq copies, -11% kl) and a careful evaluation.

## what didn't work

- phase 2 failed. substituting a similar resident expert couldn't reach the quality bar.
- in phase 3 the method i was testing lost to the plain low-bit baseline.
- on granite-3.1-3b-a800m (the replication) 20% residency missed the bar on gsm8k, 104 to 94 of 250. with the same 2.4 gb (40% of its experts) it matches the full model.

## limitations

two models. latency is modelled from measured bandwidths. the "users" are streams built from benchmark documents, not real logs. gsm8k doesn't have much statistical power on olmoe's base model.

## what i took away

most ideas in this space look good in a simulator and fall apart under a live quality check. pre-registering kept me honest about that, half the hypotheses failed and the thing that worked was the boring one.

the code is in a private repo for now, happy to share access if you want to dig in. the follow-up on dense models is [here](/writeups/dense-residency).
