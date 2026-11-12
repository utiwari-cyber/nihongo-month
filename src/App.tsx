import { useEffect, useState } from 'react'
import { useStore } from './store'
import { TRACKS, type TrackId } from './data/tracks'
import Study from './screens/Study'

// Each learner has their own link: …/#work or …/#home. With no hash, the last choice on this device is used.
const LAST = 'nihongo-track'
const fromHash = (): TrackId | null => {
  const h = location.hash.slice(1)
  return h === 'work' || h === 'home' ? h : null
}
const remembered = (): TrackId | null => {
  try { const t = localStorage.getItem(LAST); return t === 'work' || t === 'home' ? t : null } catch { return null }
}

export default function App() {
  const [track, setTrack] = useState<TrackId | null>(() => fromHash() ?? remembered())

  useEffect(() => {
    const onHash = () => { const t = fromHash(); if (t) setTrack(t) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!track) return
    try { localStorage.setItem(LAST, track) } catch { /* private mode */ }
    if (location.hash !== `#${track}`) history.replaceState(null, '', `#${track}`)
  }, [track])

  const choose = (t: TrackId | null) => {
    if (!t) {
      try { localStorage.removeItem(LAST) } catch { /* private mode */ }
      history.replaceState(null, '', location.pathname + location.search)
    }
    setTrack(t)
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      <header className="top">
        <div className="brand"><small>日本語</small>Nihongo Month{track && <span className="who"> · {TRACKS[track].name}</span>}</div>
        {track && <button className="switch" onClick={() => choose(null)}>Switch</button>}
      </header>
      <main className="screen">
        {track ? <Learner key={track} track={track} /> : <Chooser onPick={choose} />}
      </main>
    </div>
  )
}

function Learner({ track }: { track: TrackId }) {
  const store = useStore(track)
  return <Study store={store} track={TRACKS[track]} />
}

function Chooser({ onPick }: { onPick: (t: TrackId) => void }) {
  return (
    <div className="learn chooser">
      <h1>Who’s learning?</h1>
      <p className="lead">Two paths through the same month. Each keeps its own progress, so you can share a device.</p>
      <ul className="deck-list">
        {(['work', 'home'] as const).map(id => {
          const t = TRACKS[id]
          return (
            <li key={id}>
              <button className="deck-row" onClick={() => onPick(id)}>
                <span lang="ja" className="kicker">{t.ja}</span>
                <strong>{t.name}</strong>
                <small>{t.pitch}</small>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="note">Tip: bookmark your own path. The address ends in #work or #home.</p>
    </div>
  )
}
