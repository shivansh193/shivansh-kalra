'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const progressRef = useRef<HTMLDivElement>(null)
  const [dark, setDark] = useState(true)

  // init theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDark = saved ? saved === 'dark' : true
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    const t = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
  }

  // scroll progress bar
  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return
    function update() {
      const h = document.documentElement
      const sc = h.scrollTop || document.body.scrollTop
      const max = h.scrollHeight - h.clientHeight
      if (bar) bar.style.width = Math.min(100, max > 0 ? (sc / max) * 100 : 0) + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  // active link highlight
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('.nav a[data-navlink]')
    const sections = Array.from(links)
      .map(a => document.querySelector<HTMLElement>(a.getAttribute('href') || ''))
      .filter(Boolean) as HTMLElement[]

    function pick() {
      const y = window.scrollY + 80
      let active = -1
      sections.forEach((s, i) => { if (s.offsetTop <= y) active = i })
      links.forEach(a => a.classList.remove('active'))
      if (active >= 0) links[active].classList.add('active')
    }
    window.addEventListener('scroll', pick, { passive: true })
    pick()
    return () => window.removeEventListener('scroll', pick)
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div className="meta">SNU · DEL · IST <span style={{ color: 'var(--green)', marginLeft: 8 }}>●</span></div>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle theme"
        >
          {dark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
