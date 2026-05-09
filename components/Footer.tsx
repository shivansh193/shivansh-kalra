export default function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="availability">
              Available for <span className="acc">exceptional opportunities.</span>
              <small>STATUS · <b>open to roles, collabs, and research</b></small>
            </div>
          </div>

          <div>
            <h3>direct</h3>
            <a href="mailto:sk262@snu.edu.in">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="14" /><path d="M3 7l9 7 9-7" />
              </svg>
              sk262@snu.edu.in
            </a>
            <a href="tel:+919717094960">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 6a2 2 0 012-2z" />
              </svg>
              +91 9717 094 960
            </a>
          </div>

          <div>
            <h3>code</h3>
            <a href="https://github.com/shivansh193" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.46-1.12-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.52 2.36 1.08 2.94.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0012 2z" />
              </svg>
              github.com/shivansh193
            </a>
            <a href="https://linkedin.com/in/shivansh-kalra" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h4v4H4zM4 10h4v10H4zM10 10h4v2c.7-1.2 2-2.3 4-2.3 4 0 4 2.7 4 5.3V20h-4v-4.7c0-1.2-.4-2-1.5-2-1.3 0-1.5 1-1.5 2V20h-4z" />
              </svg>
              /in/shivansh-kalra
            </a>
          </div>

          <div>
            <h3>resume</h3>
            <a href="/Resume_Dec25.pdf" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              cv / resume
            </a>
            <a href="/projects">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
              all projects
            </a>
          </div>
        </div>

        <div className="colofon">
          <div className="git">
            <span><b>location</b> · Greater Noida, India</span>
            <span><b>university</b> · SNU B.Tech CS &apos;27</span>
            <span><b>uptime</b> · 5y compounding</span>
          </div>
          <div>© Shivansh Kalra · 2026 <span style={{ color: 'var(--accent)', marginLeft: 8 }}>↑</span></div>
        </div>
      </div>
    </footer>
  )
}
