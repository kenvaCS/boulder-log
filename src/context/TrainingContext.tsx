import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useExercises } from '../features/training/hooks/useExercises'
import { useRoutines } from '../features/training/hooks/useRoutines'
import { useSessions } from '../features/training/hooks/useSessions'
import type { Exercise, TrainingRoutine, TrainingSession } from '../features/training/types'

interface TrainingContextType {
    exercises: Exercise[]
    addExercise: (data: Omit<Exercise, 'id'>) => void
    updateExercise: (id: string, data: Partial<Exercise>) => void
    deleteExercise: (id: string) => void

    routines: TrainingRoutine[]
    addRoutine: (data: Omit<TrainingRoutine, 'id'>) => void
    updateRoutine: (id: string, data: Partial<TrainingRoutine>) => void
    deleteRoutine: (id: string) => void

    sessions: TrainingSession[]
    addSession: (data: Omit<TrainingSession, 'id'>) => void
    updateSession: (id: string, data: Partial<TrainingSession>) => void
    deleteSession: (id: string) => void
}

const TrainingContext = createContext<TrainingContextType | null>(null)

export function TrainingProvider({ children }: { children: ReactNode }) {
    const exercises = useExercises()
    const routines = useRoutines()
    const sessions = useSessions()

    return (
        <TrainingContext.Provider value={{ ...exercises, ...routines, ...sessions }}>
            {children}
        </TrainingContext.Provider>
    )
}

export function useTrainingContext(): TrainingContextType {
    const context = useContext(TrainingContext)
    if (!context) throw new Error('useTrainingContext must be used within a TrainingProvider')
    return context
}
