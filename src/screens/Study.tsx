import { useEffect, useMemo, useState } from 'react'
import type { Deck, Phrase } from '../types'
import { daysBetween, dateKey, now, play, speak, useStore } from '../store'
import { ALL_PHRASES } from '../data'
import { Session } from './Session'
import { KANA, type Kana, type KanaLesson, type Unit } from '../data/path'
import { KIND_LABEL, UNIT_BY_ID, type Track } from '../data/tracks'
import { GRAMMAR, HABITS, KANJI, ROADMAP, type Grammar } from '../data/deeper'

type Store = ReturnType<typeof useStore>
type Seg = 'path' | 'script' | 'deeper'

const TARGET_DAYS = 30
const REVIEW_LIMIT = 15
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5)
const mkDeck = (id: string, title: string, phrases: Phrase[]): Deck => ({ id, title, ja: '', blurb: '', stamp: '', phrases })

export default function Study({ store, track }: { store: Store; track: Track }) {
  const PATH = track.path
  const { state, update } = store
  const study = state
  const [seg, setSeg] = useState<Seg>('path')
  const [unit, setUnit] = useState<string | null>(null)
  const [lesson, setLesson] = useState<string | null>(null)
  const [deck, setDeck] = useState<{ deck: Deck; stepId?: string } | null>(null)

  const patch = (p: Partial<typeof study>) => update(p)
  const today = dateKey()
  useEffect(() => { window.scrollTo(0, 0) }, [unit, lesson, deck, seg])

  const finishStep = (id: string) => {
    if (study.steps[id]) return
    const steps = { ...study.steps, [id]: today }
    patch({ steps })
  }

  if (deck) {
    return (
      <Session key={deck.deck.id} deck={deck.deck} store={store} quiz={deck.deck.phrases.length >= 3}
        onDone={() => { if (deck.stepId) finishStep(deck.stepId); setDeck(null) }} onExit={() => setDeck(null)} />
    )
  }

  if (unit) {
    const step = PATH.find(p => p.id === unit)!
    return step.check
      ? <Checkpoint stepId={step.id} covers={step.covers!} store={store} done={study.steps[step.id]} onBack={() => setUnit(null)}
          start={d => setDeck({ deck: d, stepId: step.id })} />
      : <UnitView unit={UNIT_BY_ID.get(unit)!} store={store} done={study.steps[unit]} mission={!!study.missions[unit]}
          onMission={v => patch({ missions: { ...study.missions, [unit]: v } })} onFinish={() => finishStep(unit)}
          onBack={() => setUnit(null)} start={d => setDeck({ deck: d, stepId: unit })} />
  }

  if (lesson) {
    return <LessonView key={lesson} lesson={KANA.find(l => l.id === lesson)!} store={store} onBack={() => setLesson(null)} />
  }

  const total = PATH.length
  const done = PATH.filter(p => study.steps[p.id]).length
  const nextId = PATH.find(p => !study.steps[p.id])?.id
  const day = study.start ? Math.max(1, daysBetween(new Date(`${study.start}T00:00:00+09:00`), now()) + 1) : 0
  // Steps a 30-day pace would have finished before today, so day 1 never starts out behind.
  const expected = Math.min(total, Math.floor(((day - 1) * total) / TARGET_DAYS))
  const dueIds = Object.keys(state.known).filter(id => state.known[id] > 0 && ALL_PHRASES.has(id) && (state.due[id] ?? '') <= today)
  const lessonsPassed = KANA.filter(l => study.lessons[l.id]).length

  return (
    <div className="learn study">
            <div className="chips" role="group" aria-label="Study sections">
        <button className={seg === 'path' ? 'chip on' : 'chip'} aria-pressed={seg === 'path'} onClick={() => setSeg('path')}>Month one</button>
        <button className={seg === 'script' ? 'chip on' : 'chip'} aria-pressed={seg === 'script'} onClick={() => setSeg('script')}>Kana</button>
        <button className={seg === 'deeper' ? 'chip on' : 'chip'} aria-pressed={seg === 'deeper'} onClick={() => setSeg('deeper')}>Go deeper</button>
      </div>

      {seg === 'path' && <>
        {!study.start
          ? <section className="study-hero">
              <p className="kicker">一ヶ月</p>
              <h2>{track.name} in a month</h2>
              <p>{PATH.filter(p => !p.check).length} short units: {track.intro}, with a real-world task for each. About 30 minutes a day, but there are no deadlines. Go at your own pace.</p>
              <button className="btn wide" onClick={() => patch({ start: today })}>Start my month</button>
            </section>
          : <section className="study-hero">
              <p className="kicker">Day {day} · {done} of {total} steps</p>
              <span className="meter big" role="img" aria-label={`${done} of ${total} steps done`}><i style={{ width: `${(done / total) * 100}%` }} /></span>
              <p className="note">{done >= total ? 'Month one complete. Time to go deeper.' : done >= expected ? `On or ahead of a ${TARGET_DAYS}-day pace.` : `${expected - done} ${expected - done === 1 ? 'step' : 'steps'} behind a ${TARGET_DAYS}-day pace. That’s fine: you set the pace. A short review each day keeps what you’ve learned.`}</p>
            </section>}

        {dueIds.length > 0
          ? <button className="btn ghost wide" onClick={() => setDeck({ deck: mkDeck('review', 'Today’s review', dueIds.slice(0, REVIEW_LIMIT).map(id => ALL_PHRASES.get(id)!)) })}>Review {Math.min(dueIds.length, REVIEW_LIMIT)} due {dueIds.length === 1 ? 'phrase' : 'phrases'}</button>
          : Object.keys(state.known).length > 0 && <p className="note">Nothing due today. Phrases return just as you’re about to forget them.</p>}

        <ul className="deck-list steps">
          {PATH.map((p, i) => {
            const u = UNIT_BY_ID.get(p.id)
            const learned = u ? u.phrases.filter(x => (state.known[x.id] ?? 0) > 0).length : 0
            const isDone = !!study.steps[p.id]
            return (
              <li key={p.id}>
                <button className={`deck-row step${isDone ? ' done' : ''}${p.id === nextId ? ' next' : ''}`} onClick={() => setUnit(p.id)}>
                  <span className="step-n" aria-hidden="true">{isDone ? '✓' : i + 1}</span>
                  <span className="step-body">
                    <strong>{u ? u.title : `Checkpoint ${p.id.slice(1)}`}</strong>
                    <small>{u ? `${KIND_LABEL[u.kind]} · ${u.ja}` : 'Review the last few units'}{p.id === nextId ? ' · up next' : ''}</small>
                    {u && <span className="meter" role="img" aria-label={`${learned} of ${u.phrases.length} learned`}><i style={{ width: `${(learned / u.phrases.length) * 100}%` }} /></span>}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="note">Audio uses recorded clips where they exist and your device’s Japanese voice otherwise. Phrases here haven’t been checked by a native speaker yet, so ask a colleague to correct you. They will enjoy it.</p>
      </>}

      {seg === 'script' && <>
        <p className="lead">Hiragana and katakana: {lessonsPassed} of {KANA.length} lessons passed. Do one a day alongside the units. {track.id === 'work' ? 'Katakana is where most Uber vocabulary lives.' : 'Katakana is everywhere: menus, shop signs and baby products.'}</p>
        <ul className="deck-list">
          {(['hiragana', 'katakana'] as const).map(script => (
            <li key={script}>
              <h3 className="seg-h">{script === 'hiragana' ? 'ひらがな · Hiragana' : 'カタカナ · Katakana'}</h3>
              {KANA.filter(l => l.script === script).map(l => (
                <button key={l.id} className={`deck-row${study.lessons[l.id] ? ' done' : ''}`} onClick={() => setLesson(l.id)}>
                  <strong>{l.title.replace(/^(Hiragana|Katakana): /, '')}{study.lessons[l.id] ? ' ✓' : ''}</strong>
                  <span className="kana-peek" lang="ja">{l.chars.slice(0, 8).map(c => c.c).join(' ')}</span>
                </button>
              ))}
            </li>
          ))}
        </ul>
      </>}

      {seg === 'deeper' && <Deeper store={store} track={track} start={d => setDeck({ deck: d })} />}
    </div>
  )
}

// ---------------------------------------------------------------- Unit

function PhraseRow({ p }: { p: Phrase }) {
  return (
    <li className="phrase-row">
      <div className="phrase-main">
        <p className="jp" lang="ja">{p.ja}</p>
        <p className="romaji">{p.romaji}</p>
        <p className="en">{p.en}</p>
        {p.note && <p className="note">{p.note}</p>}
      </div>
      <button className="btn ghost play-btn" aria-label={`Hear ${p.romaji}`} onClick={() => play(p.id, p.say ?? p.ja)}>▶</button>
    </li>
  )
}

function UnitView({ unit, store, done, mission, onMission, onFinish, onBack, start }: {
  unit: Unit; store: Store; done?: string; mission: boolean; onMission: (v: boolean) => void; onFinish: () => void; onBack: () => void; start: (d: Deck) => void
}) {
  const { state } = store
  const learned = unit.phrases.filter(p => (state.known[p.id] ?? 0) > 0).length
  return (
    <div className="learn study unit">
      <div className="session-top"><button className="link" onClick={onBack}>Back</button><span>{learned} of {unit.phrases.length} learned</span></div>
      <p className="kicker">{KIND_LABEL[unit.kind]} · {unit.ja}</p>
      <h1>{unit.title}</h1>
      <p>{unit.goal}</p>
      {unit.pattern && <aside className="pattern"><strong>{unit.pattern.title}</strong><p>{unit.pattern.body}</p></aside>}
      <button className="btn wide" onClick={() => start(mkDeck(unit.id, unit.title, unit.phrases))}>{learned === 0 ? 'Learn these phrases' : 'Practise again'}</button>
      <h2 className="sub">The phrases</h2>
      <ul className="phrase-list">{unit.phrases.map(p => <PhraseRow key={p.id} p={p} />)}</ul>
      <h2 className="sub">Today’s mission</h2>
      <label className="mission">
        <input type="checkbox" checked={mission} onChange={e => onMission(e.target.checked)} />
        <span>{unit.mission}</span>
      </label>
      {done
        ? <p className="note">Finished on {done}.</p>
        : <button className="btn ghost wide" onClick={() => { onFinish(); onBack() }}>Mark this step done</button>}
    </div>
  )
}

function Checkpoint({ stepId, covers, store, done, onBack, start }: { stepId: string; covers: string[]; store: Store; done?: string; onBack: () => void; start: (d: Deck) => void }) {
  const { state } = store
  const pool = covers.flatMap(id => UNIT_BY_ID.get(id)?.phrases ?? [])
  const go = () => {
    // The phrases you know least come first, so the checkpoint targets your weak spots.
    const picks = shuffle(pool).sort((a, b) => (state.known[a.id] ?? 0) - (state.known[b.id] ?? 0)).slice(0, 12)
    start(mkDeck(stepId, `Checkpoint ${stepId.slice(1)}`, picks))
  }
  return (
    <div className="learn study unit">
      <div className="session-top"><button className="link" onClick={onBack}>Back</button></div>
      <p className="kicker">Checkpoint</p>
      <h1>Checkpoint {stepId.slice(1)}</h1>
      <p>Twelve cards from the last {covers.length} units, starting with the ones you know least. A quick quiz follows. Finishing this completes the step.</p>
      <p className="note">Units covered: {covers.map(id => UNIT_BY_ID.get(id)?.title).join(', ')}.</p>
      <button className="btn wide" onClick={go}>Start the checkpoint</button>
      {done && <p className="note">Finished on {done}. You can take it again any time.</p>}
    </div>
  )
}

// ---------------------------------------------------------------- Kana

function LessonView({ lesson, store, onBack }: { lesson: KanaLesson; store: Store; onBack: () => void }) {
  const { state, update } = store
  const [quiz, setQuiz] = useState(false)
  const [shown, setShown] = useState<string | null>(null)
  const passed = state.lessons[lesson.id]

  if (quiz) {
    return <KanaQuiz lesson={lesson} store={store} onExit={() => setQuiz(false)}
      onPass={() => {
        update({ lessons: { ...state.lessons, [lesson.id]: dateKey() } })
      }} />
  }

  return (
    <div className="learn study unit">
      <div className="session-top"><button className="link" onClick={onBack}>Back</button>{passed && <span>Passed {passed}</span>}</div>
      <p className="kicker">{lesson.script === 'hiragana' ? 'ひらがな' : 'カタカナ'}</p>
      <h1>{lesson.title.replace(/^(Hiragana|Katakana): /, '')}</h1>
      <p>{lesson.tip}</p>
      <div className="kana-grid" role="group" aria-label="Characters. Tap to hear.">
        {lesson.chars.map(c => (
          <button key={c.c} className="kana-cell" onClick={() => { speak(c.c) }}>
            <span lang="ja">{c.c}</span>
            <small>{c.r}</small>
          </button>
        ))}
      </div>
      <p className="note">Tap a character to hear it. Say each one out loud before the quiz.</p>
      <h2 className="sub">Read these words</h2>
      <ul className="kana-words">
        {lesson.words.map(w => (
          <li key={w.w}>
            <button className="word" onClick={() => { setShown(shown === w.w ? null : w.w); speak(w.w) }}>
              <span className="jp" lang="ja">{w.w}</span>
              <small>{shown === w.w ? `${w.r} · ${w.en}` : 'Tap to check'}</small>
            </button>
          </li>
        ))}
      </ul>
      <button className="btn wide" onClick={() => setQuiz(true)}>{passed ? 'Quiz me again' : 'Quiz me'}</button>
    </div>
  )
}

function KanaQuiz({ lesson, store, onPass, onExit }: { lesson: KanaLesson; store: Store; onPass: () => void; onExit: () => void }) {
  const { update } = store
  const quizzable = (c: Kana) => !c.r.startsWith('(')
  const qs = useMemo(() => {
    // The current lesson's characters count double; earlier lessons in the same script come back as review.
    const idx = KANA.findIndex(l => l.id === lesson.id)
    const earlier = KANA.slice(0, idx).filter(l => l.script === lesson.script).flatMap(l => l.chars).filter(quizzable)
    const current = lesson.chars.filter(quizzable)
    const all = [...earlier, ...current]
    const picks = shuffle([...current, ...current, ...earlier]).filter((c, i, a) => a.findIndex(x => x.c === c.c) === i).slice(0, 12)
    return picks.map(c => {
      const toKana = Math.random() < 0.4
      const wrong = shuffle(all.filter(o => o.c !== c.c && o.r !== c.r)).slice(0, 3)
      return { c, toKana, opts: shuffle([c, ...wrong]) }
    })
  }, [lesson])
  const [i, setI] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const need = Math.ceil(qs.length * 0.8)

  if (i >= qs.length) {
    const pass = score >= need
    return (
      <div className="learn study unit quiz-end">
        <h1>{score} out of {qs.length}</h1>
        <p>{pass ? 'Lesson passed. Nicely done.' : `You need ${need} to pass. Have another look at the characters and try again.`}</p>
        {pass ? <button className="btn wide" onClick={() => { onPass(); onExit() }}>Done</button> : <button className="btn wide" onClick={onExit}>Back to the lesson</button>}
      </div>
    )
  }

  const q = qs[i]
  const pick = (c: Kana) => {
    if (chosen) return
    setChosen(c.c)
    const right = c.c === q.c.c
    if (right) setScore(score + 1)
    update(s => ({ kana: { ...s.kana, [q.c.c]: right ? (s.kana[q.c.c] ?? 0) + 1 : 0 } }))
    speak(q.c.c)
  }
  return (
    <div className="session">
      <div className="session-top"><button className="link" onClick={onExit}>Back</button><span>{i + 1} of {qs.length}</span></div>
      <p className="kicker">{q.toKana ? 'Which character is this sound?' : 'What sound is this?'}</p>
      <p className="kana-q" lang={q.toKana ? undefined : 'ja'}>{q.toKana ? q.c.r : q.c.c}</p>
      <div className="choice-row">
        {q.opts.map(o => (
          <button key={o.c} onClick={() => pick(o)} lang={q.toKana ? 'ja' : undefined}
            className={`choice kana-choice ${chosen ? (o.c === q.c.c ? 'right' : o.c === chosen ? 'wrong' : '') : ''}`}>
            {q.toKana ? o.c : o.r}
          </button>
        ))}
      </div>
      {chosen && <button className="btn wide" onClick={() => { setI(i + 1); setChosen(null) }}>{i + 1 >= qs.length ? 'See result' : 'Next'}</button>}
    </div>
  )
}

// ---------------------------------------------------------------- Go deeper

function Deeper({ store, track, start }: { store: Store; track: Track; start: (d: Deck) => void }) {
  const [part, setPart] = useState<'grammar' | 'kanji' | 'plan'>('grammar')
  const { state } = store
  return (
    <>
      <p className="lead">When month one feels comfortable, build the foundations: grammar you can use, kanji you’ll meet at work, and a plan for the next year.</p>
      <div className="chips" role="group" aria-label="Go deeper">
        {(['grammar', 'kanji', 'plan'] as const).map(p => (
          <button key={p} className={part === p ? 'chip on' : 'chip'} aria-pressed={part === p} onClick={() => setPart(p)}>{p === 'grammar' ? 'Grammar' : p === 'kanji' ? 'Kanji' : 'The plan'}</button>
        ))}
      </div>

      {part === 'grammar' && <ul className="deck-list">
        {GRAMMAR.map(g => <GrammarCard key={g.id} g={g} start={start} />)}
      </ul>}

      {part === 'kanji' && <>
        <p className="note">Learn kanji inside real words. Each set is a deck with a quick quiz at the end.</p>
        <ul className="deck-list">
          {track.kanji.map(id => KANJI.find(k => k.id === id)!).map(s => {
            const known = s.phrases.filter(p => (state.known[p.id] ?? 0) > 0).length
            return (
              <li key={s.id}>
                <button className="deck-row" onClick={() => start(mkDeck(`kj-${s.id}`, s.title, s.phrases))}>
                  <span lang="ja" className="deck-ja">{s.ja}</span>
                  <strong>{s.title}</strong>
                  <small>{s.blurb}</small>
                  <span className="meter" role="img" aria-label={`${known} of ${s.phrases.length} learned`}><i style={{ width: `${(known / s.phrases.length) * 100}%` }} /></span>
                  <small>{known} of {s.phrases.length} learned</small>
                </button>
              </li>
            )
          })}
        </ul>
      </>}

      {part === 'plan' && <>
        {ROADMAP.map(r => (
          <section key={r.when} className="road">
            <p className="kicker">{r.when}</p>
            <h3>{r.goal}</h3>
            <ul>{r.steps.filter(s => !s.only || s.only === track.id).map(s => <li key={s.title}><strong>{s.title}.</strong> {s.body}</li>)}</ul>
          </section>
        ))}
        <section className="road">
          <p className="kicker">Habits that last</p>
          <ul>{HABITS.map(h => <li key={h}>{h}</li>)}</ul>
        </section>
        <p className="note">These are rough guides, not promises. How fast you move depends on how much time you can give, and a steady 30 to 60 minutes a day beats bursts. Book and app names are suggestions; check what’s currently available.</p>
      </>}
    </>
  )
}

function GrammarCard({ g, start }: { g: Grammar; start: (d: Deck) => void }) {
  return (
    <li>
      <details className="deck-row grammar">
        <summary><span className="tag">{g.level}</span> <strong>{g.title}</strong> <span lang="ja" className="g-ja">{g.ja}</span></summary>
        <p>{g.why}</p>
        <ul className="rules">{g.rules.map(r => <li key={r}>{r}</li>)}</ul>
        <ul className="phrase-list">{g.examples.map(e => <PhraseRow key={e.id} p={e} />)}</ul>
        <button className="btn wide" onClick={() => start(mkDeck(`gr-${g.id}`, g.title, g.examples))}>Drill these examples</button>
      </details>
    </li>
  )
}
