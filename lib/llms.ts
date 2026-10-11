// Plain-text versions of the site for LLMs (llmstxt.org convention).
// Generated from the same JSON the pages render, so they can't drift.
import experiences from '@/app/data/experiences.json'
import projects from '@/app/data/projects.json'
import papers from '@/app/data/papers.json'
import ventures from '@/app/data/ventures.json'

export const SITE = 'https://shivansh-kalra.vercel.app'

const strip = (s: string) => s.replace(/<[^>]+>/g, '')

type DeepDive = {
  tagline: string
  overview: string
  why: string
  components: { name: string; tech: string; description: string }[]
  metrics: string[]
}

const HEADER = `# Shivansh Kalra

> Software engineer and CS student at Shiv Nadar University (B.Tech, graduating May 2027). I build things fast, then measure whether they actually work: AI systems and evals, systems and security tooling, and quant research. Previously SDE at Attack Capital (YC-backed), founding engineer (contract) at Pactle. Shipping software since 2021.

- Email: shivanshkalra796@gmail.com
- GitHub: https://github.com/shivansh193
- LinkedIn: https://linkedin.com/in/shivansh-kalra
- Site: ${SITE}
- Resume (PDF): ${SITE}/Shivansh_Kalra_Resume.pdf
- Open to: founding-team roles, research, and conversations worth having.`

function links(p: { link: string | null; github: string | null }) {
  const out = []
  if (p.link) out.push(`live: ${p.link}`)
  if (p.github) out.push(`code: ${p.github}`)
  return out.length ? out.join(' · ') : 'no public link'
}

export function llmsIndex(): string {
  const proj = projects
    .map(p => `- [${p.name}](${p.deepdive ? `${SITE}/projects/${p.slug}` : (p.link ?? p.github ?? SITE + '/projects')}): ${p.description}`)
    .join('\n')
  const exp = experiences
    .map(e => `- ${e.company}, ${e.role} (${e.period})`)
    .join('\n')
  const res = papers.map(p => `- ${p.title} (${p.venue}, ${p.venueDetail})`).join('\n')

  return `${HEADER}

The full site as plain text: ${SITE}/llms-full.txt

## Experience
${exp}

## Projects
${proj}

## Research
${res}
`
}

export function llmsFull(): string {
  const exp = experiences.map(e =>
    `### ${e.company}: ${e.role}
${e.period} · ${e.location}
${e.bullets.map(b => `- ${strip(b)}`).join('\n')}
Stack: ${e.stack.join(', ')}`).join('\n\n')

  const proj = projects.map(p => {
    const d = p.deepdive as DeepDive | null
    let s = `### ${p.name} (${p.year})
${p.meta} · ${links(p)}
Stack: ${p.stack.join(', ')}

${p.description}`
    if (d) {
      s += `

${d.tagline}

${d.overview}

Why: ${d.why}

Components:
${d.components.map(c => `- ${c.name} (${c.tech}): ${c.description}`).join('\n')}

Key facts:
${d.metrics.map(m => `- ${m}`).join('\n')}`
    }
    return s
  }).join('\n\n')

  const res = papers.map(p =>
    `### ${p.title}
${p.venue} · ${p.venueDetail} · ${p.author}

${p.abstract}

Key facts: ${p.metrics.join('; ')}`).join('\n\n')

  const ven = ventures.map(v => {
    let s = `### ${v.name}: ${v.role} (${v.status})
${v.description}`
    if (v.phases) s += '\n' + v.phases.map(ph => `- ${ph.name} (${ph.year}): ${ph.description}`).join('\n')
    return s
  }).join('\n\n')

  return `${HEADER}

Education: Shiv Nadar University, Greater Noida, India. B.Tech in Computer Science, Aug 2023 to May 2027.

## Experience

${exp}

## Projects

${proj}

## Research

${res}

## Ventures

${ven}
`
}
