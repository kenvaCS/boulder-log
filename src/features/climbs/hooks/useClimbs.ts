import { useState, useEffect } from 'react'
import { loadClimbs, saveClimbs } from '../api'
import type { Climb } from '../types'

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
