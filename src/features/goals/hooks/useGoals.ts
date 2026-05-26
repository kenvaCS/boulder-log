import { useState, useEffect } from 'react'
import type { Goal } from '../../climbs/types'

const STORAGE_KEY = 'boulder-log-goals'

function loadGoals(): Goal[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw): []
    } catch {
        return []
    }
}

function saveGoals(goals: Goal[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals))
}

export function useGoals() {
    const [goals, setGoals] = useState<Goal[]>(loadGoals)

    useEffect(() => {
        saveGoals(goals)
    }, [goals])

    function addGoal(data: Omit<Goal, 'id' | 'achieved'>) {
        const newGoal: Goal = {...data, id: crypto.randomUUID(), achieved: false }
        setGoals(prev => [newGoal, ...prev])
    }

    function achieveGoal(id: string, climbId?: string) {
        setGoals(prev => 
            prev.map(g => g.id === id ? {...g, achieved: true, climbId } : g)
        )
    }

    function deleteGoal(id: string) {
        setGoals(prev => prev.filter(g => g.id !== id))
    }

    return { goals, addGoal, achieveGoal, deleteGoal }
}


