import { describe, it, expect, beforeEach } from 'vitest'
import {
  loadExercises, saveExercises,
  loadRoutines, saveRoutines,
  loadSessions, saveSessions,
} from './api'
import type { Exercise, TrainingRoutine, TrainingSession } from './types'

const EXERCISES_KEY = 'boulder-log-exercises'
const ROUTINES_KEY = 'boulder-log-routines'
const SESSIONS_KEY = 'boulder-log-sessions'

const makeExercise = (overrides: Partial<Exercise> = {}): Exercise => ({
  id: 'e1',
  name: 'Pull-up',
  ...overrides,
})

const makeRoutine = (overrides: Partial<TrainingRoutine> = {}): TrainingRoutine => ({
  id: 'r1',
  name: 'Strength Day',
  exercises: [{ exerciseId: 'e1', sets: 3, reps: 5 }],
  ...overrides,
})

const makeSession = (overrides: Partial<TrainingSession> = {}): TrainingSession => ({
  id: 's1',
  routineId: 'r1',
  date: '2026-01-01',
  exercises: [{ exerciseId: 'e1', setsCompleted: 3, weightKg: 10 }],
  notes: '',
  ...overrides,
})

beforeEach(() => {
  localStorage.clear()
})

describe('exercises', () => {
  it('loadExercises returns [] when empty', () => {
    expect(loadExercises()).toEqual([])
  })

  it('loadExercises returns [] on invalid JSON', () => {
    localStorage.setItem(EXERCISES_KEY, '{bad}')
    expect(loadExercises()).toEqual([])
  })

  it('saveExercises + loadExercises round-trips', () => {
    const data = [makeExercise(), makeExercise({ id: 'e2', name: 'Dead hang' })]
    saveExercises(data)
    expect(loadExercises()).toEqual(data)
  })

  it('saveExercises overwrites previous data', () => {
    saveExercises([makeExercise({ id: 'e1' })])
    saveExercises([makeExercise({ id: 'e2', name: 'New' })])
    expect(JSON.parse(localStorage.getItem(EXERCISES_KEY)!)).toHaveLength(1)
  })
})

describe('routines', () => {
  it('loadRoutines returns [] when empty', () => {
    expect(loadRoutines()).toEqual([])
  })

  it('loadRoutines returns [] on invalid JSON', () => {
    localStorage.setItem(ROUTINES_KEY, '{bad}')
    expect(loadRoutines()).toEqual([])
  })

  it('saveRoutines + loadRoutines round-trips', () => {
    const data = [makeRoutine()]
    saveRoutines(data)
    expect(loadRoutines()).toEqual(data)
  })
})

describe('sessions', () => {
  it('loadSessions returns [] when empty', () => {
    expect(loadSessions()).toEqual([])
  })

  it('loadSessions returns [] on invalid JSON', () => {
    localStorage.setItem(SESSIONS_KEY, '{bad}')
    expect(loadSessions()).toEqual([])
  })

  it('saveSessions + loadSessions round-trips', () => {
    const data = [makeSession(), makeSession({ id: 's2', notes: 'felt strong' })]
    saveSessions(data)
    expect(loadSessions()).toEqual(data)
  })
})
