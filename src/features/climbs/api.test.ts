import { describe, it, expect, beforeEach } from 'vitest'
import { loadClimbs, saveClimbs } from './api'
import type { Climb } from './types'

const STORAGE_KEY = 'boulder-log-climbs'

const makeClimb = (overrides: Partial<Climb> = {}): Climb => ({
  id: '1',
  routeName: 'Test Route',
  grade: 'V5',
  date: '2026-01-01',
  location: 'Gym',
  attempts: 1,
  notes: '',
  photos: [],
  isProject: false,
  patternIds: [],
  ...overrides,
})

beforeEach(() => {
  localStorage.clear()
})

describe('loadClimbs', () => {
  it('returns empty array when storage is empty', () => {
    expect(loadClimbs()).toEqual([])
  })

  it('returns parsed climbs from storage', () => {
    const climbs = [makeClimb(), makeClimb({ id: '2', routeName: 'Another' })]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(climbs))
    expect(loadClimbs()).toEqual(climbs)
  })

  it('returns empty array when storage contains invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')
    expect(loadClimbs()).toEqual([])
  })
})

describe('saveClimbs', () => {
  it('writes climbs to storage', () => {
    const climbs = [makeClimb()]
    saveClimbs(climbs)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(climbs)
  })

  it('overwrites existing data', () => {
    saveClimbs([makeClimb({ id: '1' })])
    saveClimbs([makeClimb({ id: '2', routeName: 'Updated' })])
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored).toHaveLength(1)
    expect(stored[0].id).toBe('2')
  })

  it('round-trips correctly through load', () => {
    const climbs = [makeClimb({ isProject: true, sentAt: '2026-02-01' })]
    saveClimbs(climbs)
    expect(loadClimbs()).toEqual(climbs)
  })
})
