import { useState, useEffect } from 'react'
import type { Climb } from '../types/index'

const STORAGE_KEY = 'boulder-log-climbs'

function loadClimbs(): Climb[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw): []
    } catch {
        return []
    }
}

function saveClimbs(climbs: Climb[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(climbs))
}

export function useClimbs() {
    const [climbs, setClimbs] = useState<Climb []>(loadClimbs)

    useEffect(() => {
        saveClimbs(climbs)
    }, [climbs]) // dependency array

    function addClimb(data: Omit<Climb, 'id'>) {
        const newClimb: Climb = {...data, id: crypto.randomUUID() }
        setClimbs(prev => [newClimb, ...prev])
    }

    function updateClimb(id: string, data: Partial<Climb>) {
        setClimbs(prev => 
            prev.map(c => (c.id == id ? {...c, ...data } : c))
        )
    }

    function deleteClimb(id: string) {
        setClimbs(prev => prev.filter(c => c.id !== id))
    }

    function filterClimbs(query: string, grade?: string) {
        return climbs.filter(c => {
            const matchesQuery = 
                query === '' ||
                c.routeName.toLowerCase().includes(query.toLowerCase()) ||
                c.location.toLowerCase().includes(query.toLowerCase()) ||
                c.notes.toLowerCase().includes(query.toLowerCase())
            const matchesGrade = !grade || c.grade === grade
            return matchesQuery && matchesGrade
        })
    }

    return { climbs, addClimb, updateClimb, deleteClimb, filterClimbs }

}

// load, save, use 
