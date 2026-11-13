import { useCallback, useEffect, useState } from 'react'

// Everything lives on this device. Nothing is uploaded.
export type State = {
  start: string | null // date you pressed "Start my month"
  steps: Record<string, string> // path step id -> date finished
  missions: Record<string, boolean> // unit id -> real-world task done
  lessons: Record<string, string> // kana lesson id -> date passed
  kana: Record<string, number> // character -> right answers in a row
  known: Record<string, number> // phrase id -> Leitner box
  due: Record<string, string> // phrase id -> next review date, YYYY-MM-DD
}
// The work track keeps the original key so existing progress carries over.
const keyFor = (track: string) => (track === 'work' ? 'nihongo-month-v1' : `nihongo-month-${track}-v1`)
const initial: State = { start: null, steps: {}, missions: {}, lessons: {}, kana: {}, known: {}, due: {} }

function load(key: string): State {
  try { return { ...initial, ...JSON.parse(localStorage.getItem(key) ?? '{}') } } catch { return initial }
}

// Mount with key={track} so switching learners loads that learner's progress.
export function useStore(track: string) {
  const key = keyFor(track)
  const [state, setState] = useState<State>(() => load(key))
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)) } catch { /* private mode */ } }, [key, state])
  const update = useCallback((patch: Partial<State> | ((s: State) => Partial<State>)) => {
    setState(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }))
  }, [])
  return { state, update }
}

// ?date=2027-04-03 previews any day.
export function now(): Date {
  const d = new URLSearchParams(location.search).get('date')
  return d ? new Date(`${d}T09:00:00+09:00`) : new Date()
}

const DAY = 86400000
export const dateKey = (d = now()) => d.toLocaleDateString('en-CA', { timeZone: 'Asia/Tokyo' })
export const daysBetween = (a: Date, b: Date) => Math.floor((b.getTime() - a.getTime()) / DAY)

// Leitner boxes: each right answer pushes the next review further out.
const INTERVALS = [1, 3, 7, 16, 35]
export function reviewed(box: number, gotIt: boolean, today = now()) {
  const next = gotIt ? box + 1 : 1
  const days = gotIt ? INTERVALS[Math.min(next - 1, INTERVALS.length - 1)] : 1
  return { box: next, due: dateKey(new Date(today.getTime() + days * DAY)) }
}

// Ids with a recorded clip in public/audio, listed at build time (see vite.config.ts).
const CLIPS = new Set<string>(__CLIPS__)

// Keep a reference to the utterance: some browsers drop it mid-sentence if it is garbage-collected.
let utterance: SpeechSynthesisUtterance | null = null
let jaVoice: SpeechSynthesisVoice | undefined
const findVoice = () => { jaVoice = window.speechSynthesis?.getVoices().find(v => v.lang.replace('_', '-').toLowerCase().startsWith('ja')) }
try {
  findVoice()
  window.speechSynthesis?.addEventListener('voiceschanged', findVoice)
} catch { /* no speech support */ }

// The device's own Japanese voice, used for anything without a recorded clip.
// Must be called directly from a tap: phones block speech that starts later.
export function speak(text: string) {
  try {
    const synth = window.speechSynthesis
    if (!synth) return
    // Cancelling an idle synth right before speaking silences Safari, so only cancel when busy.
    if (synth.speaking || synth.pending) synth.cancel()
    utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.85
    if (jaVoice) utterance.voice = jaVoice
    synth.resume()
    synth.speak(utterance)
  } catch { /* sound is a bonus */ }
}

let current: HTMLAudioElement | null = null
// Plays the recorded clip if there is one, otherwise speaks `text` straight away, inside the same tap.
export function play(id: string, text?: string) {
  current?.pause()
  current = null
  if (!CLIPS.has(id)) {
    if (text) speak(text)
    return
  }
  if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel()
  const clip = new Audio(`${import.meta.env.BASE_URL}audio/${id}.m4a`)
  current = clip
  clip.play().catch(() => { if (text) speak(text) })
}
