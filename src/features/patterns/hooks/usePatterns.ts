import { useState } from 'react'
import { loadPatterns, savePatterns } from '../api'
import type { Pattern } from '../types'

export function usePatterns() {
    const [patterns, setPatterns] = useState<Pattern []>(loadPatterns);
    // sync saveClimbs from api with change to climbs
    
    function addPattern(data: Omit<Pattern, 'id'>) {
        const newPattern: Pattern = {...data, id: crypto.randomUUID() }
        const updated=[newPattern, ...patterns]
        setPatterns(updated)
        savePatterns(updated)
    }

    function updatePattern(id: string, data: Partial<Pattern>) {
        const updated=patterns.map(c => (c.id === id ? {...c, ...data} : c))
        setPatterns(updated)
        savePatterns(updated)
    }

    function deletePattern(id: string) {
        const updated=patterns.filter(c => (c.id != id))
        setPatterns(updated)
        savePatterns(updated)
    }

    // function filterPatterns()

    return { patterns, addPattern, updatePattern, deletePattern }

}

