// Material Symbols Rounded (the Android set): outline for One UI's thin chrome glyphs,
// filled for the small status icons. One opaque color each.
import back from '@material-symbols/svg-400/rounded/arrow_back_ios_new.svg?raw'
import expand from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw'
import moreVert from '@material-symbols/svg-400/rounded/more_vert.svg?raw'
import chevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?raw'
import chevronLeft from '@material-symbols/svg-400/rounded/chevron_left.svg?raw'
import mood from '@material-symbols/svg-400/rounded/mood.svg?raw'
import voice from '@material-symbols/svg-400/rounded/graphic_eq.svg?raw'
import moreHoriz from '@material-symbols/svg-400/rounded/more_horiz.svg?raw'
import wifi from '@material-symbols/svg-400/rounded/wifi-fill.svg?raw'
import signal from '@material-symbols/svg-400/rounded/signal_cellular_alt-fill.svg?raw'

const RAW = { back, expand, moreVert, chevronRight, chevronLeft, mood, voice, moreHoriz, wifi, signal }
export type IconName = keyof typeof RAW
const D = Object.fromEntries(Object.entries(RAW).map(([k, v]) => [k, v.match(/ d="([^"]+)"/)![1]])) as Record<IconName, string>

export function Sym({ name, size = 22, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 -960 960 960" fill="currentColor" aria-hidden>
      <path d={D[name]} />
    </svg>
  )
}
