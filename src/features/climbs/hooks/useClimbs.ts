import { useState, useEffect } from 'react'
import { loadClimbs, saveClimbs } from '../api'
import type { Climb } from '../types'

export function useClimbs() {
    const [climbs, setClimbs] = useState<Climb []>(loadClimbs)

    // no use for useEffect
    function addClimb(data: Omit<Climb, 'id'>) {
        const newClimb: Climb = {...data, id: crypto.randomUUID() }
        const updated = [newClimb, ...climbs]
        // technically if await, then stale closure risk, but here should be fine.
        setClimbs(updated)
        saveClimbs(updated)
    }

    function updateClimb(id: string, data: Partial<Climb>) {
        const updated = climbs.map(c => (c.id === id ? {...c, ...data } : c))
        setClimbs(updated)
        saveClimbs(updated)
    }

    function deleteClimb(id: string) {
        const updated = climbs.filter(c => c.id !== id)
        setClimbs(updated)
        saveClimbs(updated)
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
