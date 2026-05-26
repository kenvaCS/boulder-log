import type { Exercise, TrainingRoutine, TrainingSession } from './types';

const EXERCISES_STORAGE_KEY = 'boulder-log-exercises';
const ROUTINES_STORAGE_KEY = 'boulder-log-routines';
const SESSIONS_STORAGE_KEY = 'boulder-log-sessions';

export function loadExercises(): Exercise[] {
    try { 
        const raw = localStorage.getItem(EXERCISES_STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function saveExercises(exercises: Exercise[]) {
    localStorage.setItem(EXERCISES_STORAGE_KEY, JSON.stringify(exercises));
}

export function loadRoutines(): TrainingRoutine[] {
    try {
        const raw = localStorage.getItem(ROUTINES_STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function saveRoutines(routines: TrainingRoutine[]) {
    localStorage.setItem(ROUTINES_STORAGE_KEY, JSON.stringify(routines));
}

export function loadSessions(): TrainingSession[] {
    try {
        const raw = localStorage.getItem(SESSIONS_STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function saveSessions(sessions: TrainingSession[]) {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
}
