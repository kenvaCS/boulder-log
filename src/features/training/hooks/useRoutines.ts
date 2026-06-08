import { useState, useEffect } from 'react'
import type { TrainingRoutine } from '../types'
import { loadRoutines, saveRoutines } from '../api'

export function useRoutines() {
    const [routines, setRoutines] = useState<TrainingRoutine []>(loadRoutines)

    useEffect(() => {
        saveRoutines(routines)
    }, [routines]) 

   function addRoutine(data: Omit<TrainingRoutine, "id">) {
        const newRoutine: TrainingRoutine = {...data, id: crypto.randomUUID()}
        setRoutines(prev => [newRoutine, ...prev])
    }

   function updateRoutine(id: string, data: Partial<TrainingRoutine>) {
        setRoutines(prev => 
            prev.map(c => (c.id === id ? {...c, ...data} : c))
        )
    }

    function deleteRoutine(id: string) {
        setRoutines(prev => prev.filter(c => c.id !== id))
    }

    return { routines, addRoutine, updateRoutine, deleteRoutine }

}
    

