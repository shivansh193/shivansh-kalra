this is the follow-up to my [moe project](/writeups/moe-on-a-4gb-gpu). there, keeping the experts a user actually uses in fast memory worked well. the question here: does the same idea carry over to dense models, keeping only the ffn neurons a given user fires in gpu memory and streaming or skipping the rest?

short answer, not enough to be worth it. i stopped the track.

## the setup

same rules as before. every test was pre-registered in a json file committed before the data existed, with a pass bar written down in advance.

- a neuron-usage collector for turbosparse-mistral-7b, a natively sparse model (dReLU, 32 layers x 14,336 ffn neurons)
- the test: build a per-user hot set from the user's last ~2,048 tokens, score it on their next 512, and compare it to one global set, at a budget of 20% of each layer's neurons
- the comparison set was deliberately the strong one, profiled on all four domains plus general web text
- runs on kaggle 2x t4, positive and negative controls in the tests

## what i found

**pilot: fails, 0 of 4 domains.** the bar was +10 points of coverage.

| domain | per-user | global | gap |
|---|---|---|---|
| code | 51.5% | 47.1% | +4.4 |
| math | 58.6% | 50.9% | +7.6 |
| german | 56.3% | 50.1% | +6.2 |
| arxiv | 54.7% | 49.7% | +5.0 |

the gain is real, every confidence interval is well above 0, it's just too small. against a powerinfer-style set profiled on general web only, the gap is bigger (+8 to +14), but that wasn't the pre-registered comparison, so it can't rescue the claim. most of the gain comes from using any in-domain statistics, not from personalising.

**replay (exploratory): partly.** at 20% budget, per-user sets are modelled 17-24% faster than powerinfer-style sets when cold neurons run on the cpu, and about 10% faster when they stream over pcie.

**teal on qwen3-4b-base: fails.** current dense models aren't natively sparse, so i tested training-free activation sparsity instead. the bar was staying within 2 points at 40% and 50% sparsity. it narrowly misses at 40% (hellaswag -2.4). about 25% is nearly free (1.4 points or less, 1.28x modelled) and there's a cliff past 50%.

## what i took away

per-user residency helps on a natively sparse dense model, but by single-digit points, which doesn't justify per-user machinery. on normal dense models the training-free route buys about 1.3x for almost nothing, which is useful but generic. so i stopped. writing the bar down before running anything made that an easy call instead of a sunk-cost one.

the code is in a private repo for now, happy to share access if you want to dig in.
