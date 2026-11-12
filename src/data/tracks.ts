// The two learners. Each track has its own path and its own saved progress; kana and grammar are shared.
import { PATH, UNITS, type Unit } from './path'
import { HOME_PATH, HOME_UNITS } from './home'

export type TrackId = 'work' | 'home'
export type Track = {
  id: TrackId
  name: string
  ja: string
  pitch: string
  intro: string
  path: { id: string; check?: boolean; covers?: string[] }[]
  kanji: string[] // kanji set ids, in order
}

export const TRACKS: Record<TrackId, Track> = {
  work: {
    id: 'work', name: 'Work & life', ja: '仕事と生活',
    pitch: 'For leading courier operations at Uber Japan: meetings, Slack, keigo, the delivery business, plus daily life.',
    intro: 'the Japanese you’ll use at work in courier operations and in daily life',
    path: PATH, kanji: ['ops', 'office', 'app', 'signs', 'time'],
  },
  home: {
    id: 'home', name: 'Home & baby', ja: '暮らしと子育て',
    pitch: 'For daily life at home with a baby: the paediatrician, ward office, shops, parks, neighbours and other parents.',
    intro: 'the Japanese you’ll use every day with a baby: shops, clinics, the ward office, parks and neighbours',
    path: HOME_PATH, kanji: ['baby', 'signs', 'time'],
  },
}

export const UNIT_BY_ID = new Map<string, Unit>([...UNITS, ...HOME_UNITS].map(u => [u.id, u]))
export const KIND_LABEL: Record<Unit['kind'], string> = { work: 'Work', life: 'Life', baby: 'Baby' }
