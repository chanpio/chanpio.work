// Looping case-study videos: a pause/play control on each, and no autoplay for people
// who asked for reduced motion (WCAG 2.2.2: moving content over 5 seconds can be paused).
(() => {
  const reduce = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false } })()
  const PAUSE = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"/><rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"/></svg>'
  const PLAY = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 2.9v10.2a.9.9 0 0 0 1.37.77l8.2-5.1a.9.9 0 0 0 0-1.54l-8.2-5.1A.9.9 0 0 0 5 2.9Z" fill="currentColor"/></svg>'
  document.querySelectorAll('video[autoplay]').forEach((v) => {
    const host = v.parentElement
    host.classList.add('has-vctl')
    const b = document.createElement('button')
    b.type = 'button'
    b.className = 'vctl'
    const sync = () => {
      const playing = !v.paused
      b.innerHTML = playing ? PAUSE : PLAY
      b.setAttribute('aria-label', playing ? 'Pause video' : 'Play video')
    }
    if (reduce) { v.removeAttribute('autoplay'); v.pause() }
    b.addEventListener('click', () => { v.paused ? v.play() : v.pause() })
    v.addEventListener('play', sync)
    v.addEventListener('pause', sync)
    sync()
    host.appendChild(b)
  })
})()
