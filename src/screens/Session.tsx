import { useMemo, useState } from 'react'
import type { Deck, Phrase } from '../types'
import { play, reviewed, useStore } from '../store'

export function Session({ deck, store, onDone, onExit, quiz: withQuiz = true }: { deck: Deck; store: ReturnType<typeof useStore>; onDone: () => void; onExit: () => void; quiz?: boolean }) {
  const { state, update } = store
  // Least-known phrases come first. "Again" sends a phrase to the back of the queue.
  const [queue, setQueue] = useState<Phrase[]>(() => [...deck.phrases].sort((a, b) => (state.known[a.id] ?? 0) - (state.known[b.id] ?? 0)))
  const [missed, setMissed] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)
  const [quiz, setQuiz] = useState(false)
  const total = deck.phrases.length
  const done = total - new Set(queue.map(q => q.id)).size
  const cur = queue[0]

  const answer = (gotIt: boolean) => {
    if (gotIt) {
      // A phrase you stumbled on this session comes back tomorrow, whatever box it was in.
      const r = reviewed(state.known[cur.id] ?? 0, !missed.includes(cur.id))
      update(s => ({ known: { ...s.known, [cur.id]: r.box }, due: { ...s.due, [cur.id]: r.due } }))
      const rest = queue.slice(1)
      if (rest.length === 0) { if (withQuiz && deck.phrases.length >= 3) setQuiz(true); else onDone() }
      setQueue(rest)
    } else {
      setMissed([...missed, cur.id])
      setQueue([...queue.slice(1), cur])
    }
    setRevealed(false)
  }

  if (quiz) return <Quiz deck={deck} onDone={onDone}  />
  if (!cur) return null

  return (
    <div className="session">
      <div className="session-top">
        <button className="link" onClick={onExit}>Back</button>
        <span>{done + 1} of {total}</span>
      </div>
      <div className="meter big"><i style={{ width: `${(done / total) * 100}%` }} /></div>
      <article className="flash" onClick={() => setRevealed(true)}>
        <p className="romaji big">{cur.romaji}</p>
        <p className="jp-big" lang="ja">{cur.ja}</p>
        {revealed
          ? <><p className="en big">{cur.en}</p>{cur.note && <p className="note">{cur.note}</p>}</>
          : <p className="note">Say it out loud, then tap to check.</p>}
      </article>
      <button className="btn ghost wide" onClick={() => play(cur.id, cur.say ?? cur.ja)}>Hear it</button>
      {revealed
        ? <div className="two"><button className="btn ghost" onClick={() => answer(false)}>Again</button><button className="btn" onClick={() => answer(true)}>Got it</button></div>
        : <button className="btn wide" onClick={() => setRevealed(true)}>Show meaning</button>}
    </div>
  )
}

function Quiz({ deck, onDone }: { deck: Deck; onDone: () => void }) {
  const qs = useMemo(() => [...deck.phrases].sort(() => Math.random() - 0.5).slice(0, 4).map(p => ({
    p, opts: [p, ...deck.phrases.filter(o => o.id !== p.id).sort(() => Math.random() - 0.5).slice(0, 2)].sort(() => Math.random() - 0.5),
  })), [deck])
  const [i, setI] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  if (i >= qs.length) {
    return (
      <div className="quiz-end">
        <h1>{score === qs.length ? 'Perfect!' : `${score} out of ${qs.length}`}</h1>
        <p className="lead">{score === qs.length ? 'Perfect. Those are yours now.' : 'Good. The ones you missed will come back in review.'}</p>
        <button className="btn wide" onClick={onDone}>Continue</button>
      </div>
    )
  }
  const q = qs[i]
  const pick = (id: string) => {
    if (chosen) return
    setChosen(id)
    if (id === q.p.id) setScore(score + 1)
    play(q.p.id, q.p.say ?? q.p.ja)
  }
  return (
    <div className="session">
      <p className="kicker">Quick check · {i + 1} of {qs.length}</p>
      <h2>What does this mean?</h2>
      <p className="romaji big">{q.p.romaji}</p>
      <p className="jp-big" lang="ja">{q.p.ja}</p>
      <div className="choice-list">
        {q.opts.map(o => (
          <button key={o.id} onClick={() => pick(o.id)} className={`choice ${chosen ? (o.id === q.p.id ? 'right' : o.id === chosen ? 'wrong' : '') : ''}`}>{o.en}</button>
        ))}
      </div>
      {chosen && <button className="btn wide" onClick={() => { setI(i + 1); setChosen(null) }}>Next</button>}
    </div>
  )
}
