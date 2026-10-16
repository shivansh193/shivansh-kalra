// Minimal markdown renderer for write-ups: ## / ### headings, paragraphs, "- " lists, pipe tables,
// fenced code, and inline **bold**, `code`, [text](url). Enough for content/writeups, no dependency.
import Link from 'next/link'
import type { ReactNode } from 'react'

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  const clean = (s: string) => s.replace(/\\([*_|\\])/g, '$1')
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(clean(text.slice(last, m.index)))
    const key = `${keyBase}-${i++}`
    if (m[1] !== undefined) out.push(<b key={key}>{inline(m[1], key)}</b>)
    else if (m[2] !== undefined) out.push(<code key={key}>{m[2]}</code>)
    else {
      const href = m[4]
      out.push(href.startsWith('/')
        ? <Link key={key} href={href}>{inline(m[3], key)}</Link>
        : <a key={key} href={href} target="_blank" rel="noopener noreferrer">{inline(m[3], key)}</a>)
    }
    last = re.lastIndex
  }
  if (last < text.length) out.push(clean(text.slice(last)))
  return out
}

const cells = (row: string) => row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const k = `b${i}`
    if (!line.trim()) { i++; continue }

    if (line.startsWith('```')) {
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++])
      i++
      blocks.push(<pre key={k}><code>{code.join('\n')}</code></pre>)
      continue
    }
    if (line.startsWith('### ')) { blocks.push(<h3 key={k}>{inline(line.slice(4), k)}</h3>); i++; continue }
    if (line.startsWith('## ')) { blocks.push(<h2 key={k}>{inline(line.slice(3), k)}</h2>); i++; continue }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) items.push(lines[i++].slice(2))
      blocks.push(<ul key={k}>{items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}</ul>)
      continue
    }

    if (line.trim().startsWith('|')) {
      const rows: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++])
      const [head, , ...body] = rows
      blocks.push(
        <div key={k} className="wu-table">
          <table>
            <thead><tr>{cells(head).map((c, j) => <th key={j}>{inline(c, `${k}h${j}`)}</th>)}</tr></thead>
            <tbody>{body.map((r, ri) => (
              <tr key={ri}>{cells(r).map((c, j) => <td key={j}>{inline(c, `${k}r${ri}-${j}`)}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      )
      continue
    }

    const para: string[] = []
    while (i < lines.length && lines[i].trim() && !/^(## |### |- |```|\s*\|)/.test(lines[i])) para.push(lines[i++])
    const text = para.join(' ')
    blocks.push(<p key={k} className={text.startsWith('\\*') ? 'wu-note' : undefined}>{inline(text, k)}</p>)
  }
  return <div className="wu-prose">{blocks}</div>
}
