import { useState } from 'react'
import { useClimbsContext } from '../context/ClimbsContext'
import ClimbCard from './ClimbCard'

const GRADES = ['', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17']

export default function ClimbList() {
    const { deleteClimb, filterClimbs } = useClimbsContext() 
    const [query, setQuery] = useState('')
    const [grade, setGrade] = useState('')

    const filtered = filterClimbs(query, grade)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3">
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search climbs..."
                    className="border rounded-lg px-3 py-2 text-sm flex-1"
                />
                <select
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm"
                >
                    {GRADES.map(g => (
                        <option key={g} value={g}>{g === '' ? 'All grades' : g}</option>
                    ))}
                </select>
            </div>

            {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                    {query || grade ? 'No climbs match your search.' : 'No climbs logged yet.'}
                </p>
            ) : (
                filtered.map(climb => (
                    <ClimbCard
                        key={climb.id}
                        climb={climb}
                        onDelete={deleteClimb}
                    />
                ))
            )}
        </div>
    )
}


