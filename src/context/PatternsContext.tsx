import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { usePatterns } from '../features/patterns/hooks/usePatterns'
import type { Pattern } from '../features/patterns/types'

interface PatternsContextType {
    patterns: Pattern[]
    addPattern: (data: Omit<Pattern, 'id'>) => void
    updatePattern: (id: string, data: Partial<Pattern>) => void
    deletePattern: (id: string) => void
}

const PatternsContext = createContext<PatternsContextType | null>(null);

// what is going on here
export function PatternsProvider({ children }: { children: ReactNode }) {
    const value = usePatterns()
    return (
        <PatternsContext.Provider value={value}>
            {children}
        </PatternsContext.Provider>
    )
}

export function usePatternsContext(): PatternsContextType {
    const context = useContext(PatternsContext)
    if (!context) throw new Error('usePatternsContext must be used within a PatternsProvider')
    return context
}
