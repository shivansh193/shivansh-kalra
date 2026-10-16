// Long-form write-ups. Bodies live in content/writeups/<slug>.md (a small markdown subset, see lib/markdown.tsx).
import fs from 'node:fs'
import path from 'node:path'

export interface Writeup {
  slug: string
  title: string
  summary: string
  date: string
  tags: string[]
}

export const writeups: Writeup[] = [
  {
    slug: 'moe-on-a-4gb-gpu',
    title: 'running a 14 gb moe model on a 4 gb laptop gpu',
    summary: 'what actually works when only ~20% of a mixture-of-experts model fits on the gpu. five pre-registered phases, failures included.',
    date: '2026-10',
    tags: ['ml systems', 'moe', 'inference'],
  },
  {
    slug: 'dense-residency',
    title: 'does per-user neuron residency work for dense models? (no, mostly)',
    summary: 'the follow-up to the moe project. a pre-registered test that failed in 0 of 4 domains, and why i stopped.',
    date: '2026-10',
    tags: ['ml systems', 'negative result', 'sparsity'],
  },
  {
    slug: 'hippovoice-memory',
    title: 'memory for voice agents, and why my best result is a tie',
    summary: 'decay, graph retrieval and a semantic/episodic split, benchmarked against mem0 and a-mem on one harness.',
    date: '2026-09',
    tags: ['agents', 'memory', 'evals'],
  },
]

export function getWriteup(slug: string): Writeup | undefined {
  return writeups.find(w => w.slug === slug)
}

export function writeupBody(slug: string): string {
  return fs.readFileSync(path.join(process.cwd(), 'content', 'writeups', `${slug}.md`), 'utf8')
}
