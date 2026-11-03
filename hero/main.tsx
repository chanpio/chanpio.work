import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import NudgeHero from './nudge-hero'
import { StillContext } from './kit/reduced-motion'

// Mounts the demo into #nudge-hero and keeps the hero's Knowing / Anticipating / Acting
// list in step with it: the stage writes the beat it is on as data-mark.
// The story plays three times, each run fading out to the opening frame, then holds on
// the result. One control under the list: Stop while it plays (WCAG 2.2.2, motion over
// 5 seconds can be stopped), which shows the finished frame, and Replay once it rests.
const root = document.getElementById('nudge-hero')
const steps = [...document.querySelectorAll<HTMLElement>('[data-step]')]
const control = document.getElementById('nudge-replay') as HTMLButtonElement | null
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

function setControl(mode: 'stop' | 'replay' | 'none') {
  if (!control) return
  control.toggleAttribute('data-ready', mode !== 'none')
  control.textContent = mode === 'stop' ? 'Stop' : 'Replay'
  control.setAttribute('aria-label', mode === 'stop' ? 'Stop the animation' : 'Replay the animation')
}

function Hero() {
  const [run, setRun] = useState(0)
  const [still, setStill] = useState(reduced())
  const plays = useRef(1)
  const resting = useRef(still) // true once it rests on the result: stopped, or after the last run
  const box = useRef<HTMLDivElement>(null)

  const swap = (next: () => void) => {
    root!.setAttribute('data-fading', '')
    setTimeout(() => { light(''); next() }, FADE) // the fade clears once the new stage has painted (below)
  }

  useEffect(() => {
    if (!control) return
    setControl(reduced() ? 'none' : 'stop')
    const go = () => {
      if (resting.current) {
        resting.current = false
        plays.current = 1
        setControl('stop')
        swap(() => { setStill(false); setRun((n) => n + 1) })
      } else {
        resting.current = true
        setControl('replay')
        swap(() => { setStill(true); setRun((n) => n + 1) })
      }
    }
    control.addEventListener('click', go)
    return () => control.removeEventListener('click', go)
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
    if (still) { light('acting'); return }
    let timer = 0
    const read = () => {
      const mark = stage.getAttribute('data-mark') ?? ''
      light(mark)
      if (mark !== 'acting') return
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (plays.current < PLAYS) {
          plays.current += 1
          swap(() => setRun((n) => n + 1))
        } else {
          resting.current = true // the script has finished and holds its result
          setControl('replay')
        }
      }, HOLD)
    }
    const mo = new MutationObserver(read)
    mo.observe(stage, { attributes: true, attributeFilter: ['data-mark'] })
    read()
    return () => { mo.disconnect(); clearTimeout(timer) }
  }, [run, still])

  return (
    <div ref={box}>
      <StillContext.Provider value={still}>
        <NudgeHero key={run} />
      </StillContext.Provider>
    </div>
  )
}

if (root) createRoot(root).render(<StrictMode><Hero /></StrictMode>)
