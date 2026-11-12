export type Phrase = { id: string; ja: string; romaji: string; en: string; say?: string; note?: string }
export type Deck = { id: string; title: string; ja: string; blurb: string; stamp: string; phrases: Phrase[] }
