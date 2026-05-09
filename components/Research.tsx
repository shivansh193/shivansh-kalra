interface Paper {
  id: string
  arxivId: string
  title: string
  venue: string
  venueDetail: string
  abstract: string
  tags: string[]
  author: string
  metrics: string[]
}

export default function Research({ papers }: { papers: Paper[] }) {
  return (
    <section id="research">
      <div className="wrap">
        <div className="section-head">
          <div className="idx"><b>03</b> / <span>research</span></div>
          <h2>papers.arxiv_style <span>// preprints, working drafts, competitions</span></h2>
        </div>

        <div className="research">
          {papers.map((p) => (
            <article key={p.id} className="paper">
              <div className="pid">{p.arxivId}</div>
              <div className="pbody">
                <div className="ptitle">{p.title}</div>
                <div className="venue">
                  <b>{p.venue}</b> &nbsp;·&nbsp; {p.venueDetail}
                </div>
                <div className="abs">
                  {p.abstract.split(/(`[^`]+`)/).map((part, i) =>
                    part.startsWith('`') && part.endsWith('`')
                      ? <code key={i}>{part.slice(1, -1)}</code>
                      : part
                  )}
                </div>
              </div>
              <div className="pright">
                <span className="auth">{p.author}</span>
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                {p.metrics.map(m => <span key={m}>{m}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
