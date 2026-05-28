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

    function filterClimbs(query: string, minGrade?: string, maxGrade?: string) {
        const GRADE_ORDER = ['V0','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15','V16','V17']
        return climbs.filter(c => {
            const matchesQuery =
                query === '' ||
                c.routeName.toLowerCase().includes(query.toLowerCase()) ||
                c.location.toLowerCase().includes(query.toLowerCase()) ||
                c.notes.toLowerCase().includes(query.toLowerCase())
            const gradeIdx = GRADE_ORDER.indexOf(c.grade)
            const minIdx = minGrade ? GRADE_ORDER.indexOf(minGrade) : 0
            const maxIdx = maxGrade ? GRADE_ORDER.indexOf(maxGrade) : GRADE_ORDER.length - 1
            const matchesGrade = gradeIdx === -1 || (gradeIdx >= minIdx && gradeIdx <= maxIdx)
            return matchesQuery && matchesGrade
        })
    }

    return { climbs, addClimb, updateClimb, deleteClimb, filterClimbs }

}

// load, save, use 
