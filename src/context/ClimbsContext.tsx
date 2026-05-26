import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useClimbs } from '../features/climbs/hooks/useClimbs'
import type { Climb } from '../features/climbs/types'

interface ClimbsContextType {
    climbs: Climb[]
    addClimb: (data: Omit<Climb, 'id'>) => void
    updateClimb: (id: string, data: Partial<Climb>) => void
    deleteClimb: (id: string) => void
    filterClimbs: (query: string, grade?: string) => Climb[]
}

const ClimbsContext = createContext<ClimbsContextType | null>(null)

export function ClimbsProvider({ children }: { children: ReactNode }) {
    const value = useClimbs()
    return (
        <ClimbsContext.Provider value={value}>
            {children}
        </ClimbsContext.Provider>
    )
}

export function useClimbsContext(): ClimbsContextType {
    const context = useContext(ClimbsContext)
    if (!context) throw new Error('useClimbsContext must be used within a ClimbsProvider')
    return context
}
