i wanted memory for voice agents that behaves less like a vector database and more like a person. a fact someone mentioned once should stick around, what they had for breakfast three weeks ago shouldn't, and what gets pulled up for a question should be whatever's relevant, not whatever was said most recently.

voice makes this harder than chat. there's no time to pause and go look something up mid-conversation, so whatever memory gets injected has to be right and small.

## how it works

the store is split in two, and that split is the main decision in the codebase.

- **semantic memory** holds facts, preferences and people. it doesn't decay, "the user's dog is named max" isn't less true a month from now.
- **episodic memory** holds specific events. it decays ebbinghaus-style, salience drops over turns unless emotional intensity or getting recalled again boosts it.

an earlier version ran everything through one decaying store, and the forgetting cycle meant for stale episodes was quietly deleting durable facts too. splitting the store by type fixed it.

retrieval is hipporag-style: vector seeds, a 1-hop graph walk, then a rerank that blends relevance with the memory's current salience. two simpler versions failed first. raw blending let salience (which spans about 13 orders of magnitude) swamp relevance completely, and reciprocal rank fusion stopped meaning anything once the candidate pool got small. log-normalising salience against a forget threshold is what worked.

a few things only showed up in real runs:
- blending salience into semantic hits gave every fact a flat bonus and noise jumped to 90% before i caught it. facts are now scored on relevance alone.
- embeddings couldn't separate "jon" from "john", two different people in one conversation. exact proper-noun matching needed its own signal and a full-store scan feeding the candidate pool, a bonus at rerank time wasn't enough.
- a decay rate tuned for 100-turn chats forgets almost everything before a 600-turn conversation is half done, so decay is a per-scale parameter.

## how i measured it

[locomo](https://github.com/snap-research/locomo): 10 long conversations, 369-689 turns each, 1,540 questions with real ground truth. it's what mem0, a-mem and memorybank report on.

i didn't compare against published numbers. those use different llms and lenient llm-as-judge scoring (zep alone has been reported anywhere from 58% to 84% depending on who measured it). instead i reimplemented mem0, a-mem and a naive rag baseline locally (plus a simplified zep that's still being re-run) and ran everything through one harness, same llm (qwen3-4b), same scorer (the published stemmed token f1), same retrieval budget.

| system | avg f1 | top_k |
|---|---|---|
| naive rag | 33.9% | 10 |
| hippovoice | 29.47% | 10 |
| mem0-style | 29.11% | 10 |
| a-mem-style | 22.0% | 5 (not yet re-run at 10) |

**hippovoice and mem0 are a tie.** an earlier version of this showed hippovoice well ahead (23.4% for mem0), and it turned out that was a retrieval-budget mismatch, mem0 was running at top_k=5 and hippovoice at 10. i found it by re-running the baseline, not because anyone pointed it out. at matched settings the lead disappears.

**naive rag wins, and it's worth saying why.** it never forgets anything. on a fixed set of 10 conversations that never grows big enough to cost anything, keeping everything wins on raw recall. that's the regime this benchmark tests, and it says nothing about a store that grows for months.

so the number i care about more is noise, how much of the retrieved context is actually irrelevant. on a smaller synthetic benchmark hippovoice retrieves 10% irrelevant context against 30% for mem0-style and naive rag. two caveats i'd rather state than hide: the baselines were measured against hippovoice's earlier 20% run and weren't re-run after the fix, and a-mem-style also gets 10%. so the honest summary is that clean retrieval is achievable without the full decay machinery, and separating them needs a much bigger store than 90 turns.

## voice, end to end

the same memory runs behind a real audio-to-audio model (qwen2.5-omni-3b). on an a10g, "my favorite color is blue", then an unrelated turn, then "what is my favorite color?" gets the spoken reply "your favorite color is blue", with real speech in, real extraction and retrieval, and real audio out. a 40-question locomo run through the full audio pipeline finished with zero errors at 25.81% avg f1 (2 conversations, so not comparable to the full-set numbers above).

## what i took away

- the most important result here is a tie, and the most useful thing i did was find out my early lead was a bug.
- benchmarks test a regime. locomo rewards never forgetting, which is exactly what you can't afford in a real product.
- i kept a lab notebook (bugs.md in the repo) with every fix that was tried and reverted and the numbers that killed it. the dead ends are as informative as what worked.

code, results and the full lab notebook: [github.com/shivansh193/hippovoice](https://github.com/shivansh193/hippovoice)
