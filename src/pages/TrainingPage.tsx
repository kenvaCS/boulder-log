import { useState } from 'react'
import RoutineForm from '../features/training/components/RoutineForm'
import RoutineList from '../features/training/components/RoutineList'
import ExerciseForm from '../features/training/components/ExerciseForm'
import ExerciseList from '../features/training/components/ExerciseList'
import SessionForm from '../features/training/components/SessionForm'
import SessionList from '../features/training/components/SessionList'

type Tab = 'exercises' | 'routines' | 'sessions'

const TABS: { id: Tab; label: string }[] = [
    { id: 'exercises', label: 'Exercises' },
    { id: 'routines', label: 'Routines' },
    { id: 'sessions', label: 'Sessions' },
]

export default function TrainingPage() {
    const [tab, setTab] = useState<Tab>('exercises')

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-lg font-medium">Training</h1>

            <div className="flex border-b">
                {TABS.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                            tab === t.id
                                ? 'border-gray-900 text-gray-900'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === 'exercises' && (
                <>
                    <ExerciseForm />
                    <ExerciseList />
                </>
            )}

            {tab === 'routines' && (
                <>
                    <RoutineForm />
                    <RoutineList />
                </>
            )}

            {tab === 'sessions' && (
                <>
                    <SessionForm />
                    <SessionList />
                </>
            )}
        </div>
    )
}
