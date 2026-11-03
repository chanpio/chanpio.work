import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import NudgeHero from './nudge-hero'

// Mounts the demo into #nudge-hero and keeps the hero's Knowing / Anticipating / Acting
// list in step with it: the stage writes the beat it is on as data-mark.
const root = document.getElementById('nudge-hero')
const steps = [...document.querySelectorAll<HTMLElement>('[data-step]')]
const replay = document.getElementById('nudge-replay') as HTMLButtonElement | null
const ORDER = ['knowing', 'anticipating', 'acting']

const reduced = () => {
  try { return matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}

function light(mark: string) {
  const on = ORDER.indexOf(mark)
  steps.forEach((li, i) => {
    li.toggleAttribute('data-on', i === on)
    li.toggleAttribute('data-past', on > i)
  })
  if (replay) replay.toggleAttribute('data-ready', mark === 'acting' && !reduced())
}

function Hero() {
  const [run, setRun] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!replay) return
    const go = () => { light(''); setRun((n) => n + 1) }
    replay.addEventListener('click', go)
    return () => replay.removeEventListener('click', go)
  }, [])
  useEffect(() => {
    const stage = box.current?.querySelector('.ss-stage')
    if (!stage) return
    // Reduced motion shows the poster, the finished story, with no marks
    const read = () => light(stage.getAttribute('data-mark') ?? (reduced() ? 'acting' : ''))
    const mo = new MutationObserver(read)
    mo.observe(stage, { attributes: true, attributeFilter: ['data-mark'] })
    read()
    return () => mo.disconnect()
  }, [run])
  return (
    <div ref={box}>
      <NudgeHero key={run} />
    </div>
  )
}

if (root) createRoot(root).render(<StrictMode><Hero /></StrictMode>)
