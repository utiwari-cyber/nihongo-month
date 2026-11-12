import type { Phrase } from '../types'
import { STUDY_PHRASES } from './path'
import { HOME_UNITS } from './home'
import { DEEPER_PHRASES } from './deeper'

export const ALL_PHRASES = new Map<string, Phrase>([...STUDY_PHRASES, ...HOME_UNITS.flatMap(u => u.phrases), ...DEEPER_PHRASES].map(p => [p.id, p]))
