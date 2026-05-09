'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Nav() {
  const progressRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<NodeListOf<HTMLAnchorElement> | null>(null)

  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return

    function updateProgress() {
      const h = document.documentElement
      const sc = h.scrollTop || document.body.scrollTop
      const max = h.scrollHeight - h.clientHeight
      if (bar) bar.style.width = Math.min(100, max > 0 ? (sc / max) * 100 : 0) + '%'
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('.nav a[data-navlink]')
    linksRef.current = links

    const sections = Array.from(links)
      .map(a => document.querySelector<HTMLElement>(a.getAttribute('href') || ''))
      .filter(Boolean) as HTMLElement[]

    function updateActive() {
      const y = window.scrollY + 80
      let active = -1
      sections.forEach((s, i) => { if (s.offsetTop <= y) active = i })
      links.forEach(a => a.classList.remove('active'))
      if (active >= 0) links[active].classList.add('active')
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', updateActive)
  }, [])

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute('href')
    if (!href || !href.startsWith('#')) return
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return
    e.preventDefault()
    window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      <div className="progress" ref={progressRef} />
      <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
        <div className="mark">SK</div>
        <span>shivansh.kalra</span>
        <span className="dot" title="online" />
      </Link>
      <ul>
        <li><a href="#work" data-navlink onClick={handleAnchor}>work</a></li>
        <li><a href="#projects" data-navlink onClick={handleAnchor}>projects</a></li>
        <li><a href="#research" data-navlink onClick={handleAnchor}>research</a></li>
        <li><a href="#ventures" data-navlink onClick={handleAnchor}>ventures</a></li>
        <li><a href="#contact" data-navlink onClick={handleAnchor}>contact</a></li>
      </ul>
      <div className="meta">SNU · DEL · IST <span style={{ color: 'var(--green)', marginLeft: 8 }}>●</span></div>
    </nav>
  )
}
