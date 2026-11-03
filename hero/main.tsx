import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import NudgeHero from './nudge-hero'

// Mounts the demo into #nudge-hero and keeps the hero's Knowing / Anticipating / Acting
// list in step with it: the stage writes the beat it is on as data-mark.
// The story plays three times, each run fading out to the opening frame, then holds on
// the result and shows Replay. Replay plays it three times again.
const root = document.getElementById('nudge-hero')
const steps = [...document.querySelectorAll<HTMLElement>('[data-step]')]
const replay = document.getElementById('nudge-replay') as HTMLButtonElement | null
const ORDER = ['knowing', 'anticipating', 'acting']
const PLAYS = 3
const HOLD = 3200 // the payoff stays on screen this long before the next run
const FADE = 400 // matches .hero-stage's opacity transition

const reduced = () => {
  try { return matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}

function light(mark: string) {
  const on = ORDER.indexOf(mark)
  steps.forEach((li, i) => {
    li.toggleAttribute('data-on', i === on)
    li.toggleAttribute('data-past', on > i)
  })
}

function Hero() {
  const [run, setRun] = useState(0)
  const plays = useRef(1)
  const box = useRef<HTMLDivElement>(null)

  const restart = () => {
    const stageCol = root!
    stageCol.setAttribute('data-fading', '')
    setTimeout(() => {
      light('')
      setRun((n) => n + 1) // the fade clears once the fresh stage has painted (below)
    }, FADE)
  }

  useEffect(() => {
    if (!replay) return
    const go = () => {
      replay.removeAttribute('data-ready')
      plays.current = 1
      restart()
    }
    replay.addEventListener('click', go)
    return () => replay.removeEventListener('click', go)
  }, [])

  // Fade the new run in only after it has mounted and painted its opening frame
  useEffect(() => {
    if (!run) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => root!.removeAttribute('data-fading')))
    return () => cancelAnimationFrame(id)
  }, [run])

  useEffect(() => {
    const stage = box.current?.querySelector('.ss-stage')
    if (!stage) return
    let timer = 0
    const read = () => {
      // Reduced motion shows the poster, the finished story, with no marks and no replays
      const mark = stage.getAttribute('data-mark') ?? (reduced() ? 'acting' : '')
      light(mark)
      if (mark !== 'acting' || reduced()) return
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (plays.current < PLAYS) {
          plays.current += 1
          restart()
        } else {
          replay?.setAttribute('data-ready', '')
        }
      }, HOLD)
    }
    const mo = new MutationObserver(read)
    mo.observe(stage, { attributes: true, attributeFilter: ['data-mark'] })
    read()
    return () => { mo.disconnect(); clearTimeout(timer) }
  }, [run])

  return (
    <div ref={box}>
      <NudgeHero key={run} />
    </div>
  )
}

if (root) createRoot(root).render(<StrictMode><Hero /></StrictMode>)
