// Optional, macOS only: records every phrase in src/data/*.ts to public/audio with the Kyoko voice.
// Without clips the app uses the device's own Japanese voice. Existing clips are kept.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs'

mkdirSync('public/audio', { recursive: true })
const clips = new Map()
for (const f of readdirSync('src/data').filter(f => f.endsWith('.ts'))) {
  const src = readFileSync(`src/data/${f}`, 'utf8')
  for (const m of src.matchAll(/\{ id: '([a-z]+-[a-z0-9-]+)', ja: '([^']+)'[^\n]*/g)) {
    clips.set(m[1], m[0].match(/say: '([^']+)'/)?.[1] ?? m[2])
  }
}
let made = 0
for (const [id, text] of clips) {
  const out = `public/audio/${id}.m4a`
  if (existsSync(out)) continue
  const tmp = `/tmp/${id}.aiff`
  execFileSync('say', ['-v', 'Kyoko', '-r', '150', '-o', tmp, text])
  execFileSync('afconvert', [tmp, out, '-f', 'm4af', '-d', 'aac', '-b', '32000'])
  rmSync(tmp)
  made++
}
console.log(`${clips.size} clips ready, ${made} new`)
