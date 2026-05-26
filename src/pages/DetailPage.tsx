import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useClimbsContext } from '../context/ClimbsContext'
import type { Climb } from '..types/index'

const GRADES = ['V0','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15','V16','V17']

export default function DetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { climbs, updateClimb, deleteClimb } = useClimbsContext()

    const climb = climbs.find(c => c.id === id)

    const [form, setForm] = useState<Omit<Climb, 'id'> | null>(null)

    useEffect(() => {
        if (climb) {
            setForm({
                routeName: climb.routeName,
                grade: climb.grade,
                date: climb.date,
                location: climb.location,
                attempts: climb.attempts, 
                notes: climb.notes,
                photos: climb.photos,
                isProject: climb.isProject,
                sentAt: climb.sentAt,
            })
        }
    }, [climb])

    if (!climb || !form) {
        return (
            <div className="text-sm text-gray-400 text-center py-8">
                Climb not found.
            </div>
        )
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value, type } = e.target
        setForm(prev => prev ? ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }) : prev)
    }

    function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        setForm(prev => prev ? ({...prev, isProject: e.target.checked }) : prev)
    }

    function handleSave(e: React.FormEvent) {
        e.preventDefault()
        if (!form.routeName.trim()) return
        updateClimb(id!, form)
        navigate('/')
    }

    function handleDelete() {
        deleteClimb(id!)
        navigate('/')
    }

    return (
        <form onSubmit={handleSave} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Edit climb</h2>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-sm text-gray-400 hover:text-gray-600"
                >
                    back
                </button>
            </div>

            <input
                name="routeName"
                value={form.routeName}
                onChange={handleChange}
                placeholder="Route name"
                className="border rounded-lg px-3 py-2 text-sm"
            />

            <div className="flex gap-3">
                <select
                    name="grade"
                    value={form.grade}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm flex-1"
                >
                    {GRADES.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>

                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-sm flex-1"
                />
            </div>

            <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location / crag"
                className="border rounded-lg px-3 py-2 text-sm"
            />

            <input
                name="attempts"
                type="number"
                min={1}
                value={form.attempts}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 text-sm"
            />

            <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Notes / beta"
                rows={3}
                className="border rounded-lg px-3 py-2 text-sm resize-none"
            />

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={form.isProject}
                    onChange={handleCheckbox}
                />
                Mark as project
            </label>

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium"
                >
                    Save changes
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-600 text-sm px-4 py-2"
                >
                    Delete
                </button>
            </div>
        </form>
    )
}

