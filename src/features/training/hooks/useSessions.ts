import { useState, useEffect } from 'react'
import type { TrainingSession } from '../types'
import { loadSessions, saveSessions } from '../api'

export function useSessions() {
    const [sessions, setSessions] = useState<TrainingSession []>(loadSessions)
    useEffect(() => {
        saveSessions(sessions)
    }, [sessions]) 

   function addSession(data: Omit<TrainingSession, "id">) {
        const newSession: TrainingSession = {...data, id: crypto.randomUUID()}
        setSessions(prev => [newSession, ...prev])
    }

   function updateSession(id: string, data: Partial<TrainingSession>) {
        setSessions(prev => 
            prev.map(c => (c.id === id ? {...c, ...data} : c))
        )
    }

    function deleteSession(id: string) {
        setSessions(prev => prev.filter(c => c.id !== id))
    }

    return { sessions, addSession, updateSession, deleteSession }

}
    
