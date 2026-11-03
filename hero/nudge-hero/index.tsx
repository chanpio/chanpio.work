import { Stage, Phone, Thread, Bubble, Avatar, Bar, type Act } from '../kit'
import { Sym } from './icons'
import calendarIcon from './calendar-icon.png'
import './nudge.css'

// Now Nudge, the hero for chanpio.work. Built against the shipped One UI screens
// in the case study (images/nudge/w-place-keyboard, w-share): Samsung Messages,
// Samsung Keyboard with the nudge in its toolbar row, the Galaxy status bar.
//   Knowing      Mina's message lands; "this Tuesday at lunchtime" is read
//   Anticipating "Open calendar" rises in the keyboard toolbar, Calendar's own icon
//   Acting       a tap, and Tuesday opens as a glance that grows out of the chip,
//                the lunchtime slot free
// Plays once and holds the payoff; the host remounts it for Replay.
//
// Real strings: Mina, my message, her question, the chip, the day and its free slot.

type S = { typing: boolean; reply: boolean; known: boolean; nudge: boolean; event: boolean }
const initial: S = { typing: false, reply: false, known: false, nudge: false, event: false }
const poster: S = { typing: false, reply: true, known: true, nudge: true, event: true }

// Where the calendar glance rests, in stage px, per layout
const CARD = { wide: { x: 40, y: 128, w: 256 }, compact: { x: 16, y: 96, w: 204 } }

async function script(a: Act<S>) {
  await a.wait(900)
  a.put({ typing: true })
  await a.wait(1500)
  a.put({ typing: false, reply: true })
  await a.wait(1100)
  a.mark('knowing')
  a.put({ known: true })
  await a.wait(1300)
  a.mark('anticipating')
  a.put({ nudge: true })
  await a.wait(1600)
  await a.click('nudge')
  a.mark('acting')
  await a.wait(120)
  a.put({ event: true })
  await a.wait(3000)
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
        const card = CARD[layout]
        const from = rect('nudge')
        // Closed, the glance sits over the chip at the chip's width; open, it is itself
        const closed = from && from.width
          ? `translate(${from.x - card.x}px, ${from.y - card.y}px) scale(${from.width / card.w})`
          : 'scale(.3)'
        return (
          <>
            <Phone width={layout === 'wide' ? 352 : 326} frame="android" status={false} className="nh-phone">
              <div className="nh-app">
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
                  <Bubble from="them" tail={false}><Bar w={150} h={8} /><Bar w={96} h={8} /></Bubble>
                  <Bubble from="me" tail={false}><Bar w={120} h={8} /></Bubble>
                  <Bubble from="them" tail={false}><Bar w={170} h={8} /><Bar w={130} h={8} /></Bubble>
                  <Bubble from="me" tail={false}>My flight is on 9/15, next week.</Bubble>
                  <Bubble from="them" tail={false}><Bar w={176} h={8} /><Bar w={140} h={8} /><Bar w={60} h={8} /></Bubble>
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
              </div>
            </Phone>

            <div
              className="nh-event"
              data-target="event"
              data-open={s.event ? '' : undefined}
              style={{ left: card.x, top: card.y, width: card.w, transform: s.event ? 'none' : closed }}
            >
              <div className="nh-event__head">
                <img src={calendarIcon} width={24} height={24} alt="" />
                <span>Tue, Sep 9</span>
              </div>
              <div className="nh-day">
                <span className="nh-day__hr">10</span>
                <span className="nh-day__busy"><Bar w={96} h={7} /></span>
                <span className="nh-day__hr">12</span>
                <span className="nh-day__free"><b>Free</b>12:00 – 1:00 PM</span>
                <span className="nh-day__hr">3</span>
                <span className="nh-day__busy"><Bar w={72} h={7} /></span>
              </div>
            </div>
          </>
        )
      }}
    </Stage>
  )
}
