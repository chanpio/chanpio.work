import { Stage, Phone, Thread, Bubble, Avatar, type Act } from '../kit'
import { Sym } from './icons'
import calendarIcon from './calendar-icon.png'
import './nudge.css'

// Now Nudge, the hero for chanpio.work. Built against the shipped One UI screens
// in the case study (images/nudge/w-place-keyboard, w-share): Samsung Messages,
// Samsung Keyboard with the nudge in its toolbar row, the Galaxy status bar.
//   Knowing      Mina's message lands; "this Tuesday at lunchtime" is read
//   Anticipating "Open calendar" rises in the keyboard toolbar, Calendar's own
//                icon, shimmering softly while it waits
//   Acting       a tap, and the keyboard gives way to Tuesday as a glance
//                inside the chat, the lunchtime slot free
// Nothing leaves the conversation: the phone never moves, there is no camera
// and no satellite card; every move happens inside the thread.
// Plays once and holds the payoff; the host remounts it for Replay.
//
// Real strings: Mina, my message, her question, the chip, the day and its free slot.

type S = { typing: boolean; reply: boolean; known: boolean; nudge: boolean; event: boolean }
const initial: S = { typing: false, reply: false, known: false, nudge: false, event: false }
const poster: S = { typing: false, reply: true, known: true, nudge: true, event: true }

async function script(a: Act<S>) {
  await a.wait(500)
  a.put({ typing: true })
  await a.wait(900)
  a.put({ typing: false, reply: true })
  await a.wait(700)
  a.mark('knowing')
  a.put({ known: true })
  await a.wait(800)
  a.mark('anticipating')
  a.put({ nudge: true })
  await a.wait(1100)
  await a.click('nudge')
  a.mark('acting')
  await a.wait(100)
  a.put({ event: true })
  await a.wait(2200)
}

function StatusBar() {
  return (
    <div className="nh-status">
      <span className="nh-status__time">12:45</span>
      <span className="nh-status__sys">
        <Sym name="wifi" size={17} />
        <Sym name="signal" size={17} />
        <span className="nh-battery">100</span>
      </span>
    </div>
  )
}

const KEYS = ['1234567890', 'QWERTYUIOP', 'ASDFGHJKL']

export default function NudgeHero() {
  return (
    <Stage
      width={560}
      height={620}
      compact={{ below: 560, width: 358, height: 580 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      cursor={{ at: { wide: { x: 470, y: 560 }, compact: { x: 300, y: 540 } }, style: 'touch' }}
      className="nh"
    >
      {(s, rect, layout) => {
        return (
          <>
            <Phone width={layout === 'wide' ? 352 : 326} frame="android" status={false} className="nh-phone">
              <div className="nh-app" data-sheet={s.event ? '' : undefined}>
                <StatusBar />
                <div className="nh-head">
                  <Sym name="back" size={22} />
                  <span className="nh-ava">
                    <Avatar name="Mina" size={40} />
                    <i className="nh-ava__dot" />
                  </span>
                  <div className="nh-name">Mina</div>
                  <Sym name="expand" size={20} className="nh-head__chev" />
                  <Sym name="moreVert" size={24} className="nh-head__end" />
                </div>

                <Thread app="sms" className="nh-thread">
                  <Bubble from="them" tail={false}>Finally home! That SF trip wiped me out</Bubble>
                  <Bubble from="me" tail={false}>Welcome back — how long were you there?</Bubble>
                  <Bubble from="them" tail={false}>Five days. The workshop ran all week</Bubble>
                  <Bubble from="me" tail={false}>My flight is on 9/15, next week.</Bubble>
                  <Bubble from="them" tail={false}>And I still owe you a coffee from last time</Bubble>
                  {(s.typing || s.reply) && (
                    <Bubble from="them" tail={false} typing={s.typing}>
                      <span className="nh-msg" data-known={s.known ? '' : undefined}>
                        Then can we have a coffee chat before you leave? How about <mark className="nh-ent">this Tuesday at lunchtime</mark>?
                      </span>
                    </Bubble>
                  )}
                </Thread>

                <div className="nh-compose">
                  <Sym name="chevronRight" size={26} className="nh-compose__more" />
                  <span className="nh-field">
                    <i className="nh-caret" />
                    <span className="nh-field__ph">Enter chat message</span>
                    <Sym name="mood" size={24} />
                  </span>
                  <Sym name="voice" size={24} className="nh-compose__voice" />
                </div>

                <div className="nh-kb">
                  <div className="nh-tools" data-nudged={s.nudge ? '' : undefined}>
                    <span className="nh-tools__panel"><Sym name="chevronLeft" size={18} /></span>
                    <button type="button" tabIndex={-1} className="nh-nudge" data-target="nudge" data-cursor="pointer">
                      <img src={calendarIcon} width={30} height={30} alt="" />
                      <span>Open calendar</span>
                    </button>
                    <Sym name="moreHoriz" size={22} className="nh-tools__more" />
                  </div>
                  <div className="nh-keys">
                    {KEYS.map((row, i) => (
                      <div key={row} className={`nh-krow nh-krow--${i}`}>
                        {[...row].map((k) => <span key={k}>{k}</span>)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="nh-sheet" data-open={s.event ? '' : undefined}>
                  <div className="nh-sheet__head">
                    <img src={calendarIcon} width={24} height={24} alt="" />
                    <span>Tue, Sep 9</span>
                  </div>
                  <div className="nh-day">
                    <span className="nh-day__hr">10</span>
                    <span className="nh-day__busy"><b>Team standup</b><span>10:00 – 11:00 AM</span></span>
                    <span className="nh-day__hr">12</span>
                    <span className="nh-day__free"><b>Free</b>12:00 – 1:00 PM</span>
                    <span className="nh-day__hr">3</span>
                    <span className="nh-day__busy"><b>Design review</b><span>3:00 – 4:00 PM</span></span>
                  </div>
                </div>
              </div>
            </Phone>
          </>
        )
      }}
    </Stage>
  )
}
