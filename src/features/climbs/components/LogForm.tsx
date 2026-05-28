import { useState } from 'react'
import { useClimbsContext } from '../../../context/ClimbsContext'

const GRADES = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17']

const EMPTY_FORM = {
    routeName: '',
    grade: 'V0',
    date: new Date().toISOString().split('T')[0],
    location: '',
    attempts: 0,
    notes: '',
    photos: [] as string[],
    isProject: false,
    sentAt: undefined as string | undefined,
}

export default function LogForm() {
    const { addClimb } = useClimbsContext()
    const [form, setForm] = useState(EMPTY_FORM)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value, type } = e.target
        setForm(prev => ({
            ...prev, 
            [name]: type === 'number' ? Number(value): value,
        }))
     }   

    function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        setForm(prev => ({...prev, isProject: e.target.checked }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.routeName.trim()) return
        addClimb(form)
        setForm(EMPTY_FORM)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-medium">Log a climb</h2>

            <input
                name="routeName"
                value={form.routeName}
                onChange={handleChange}
                placeholder="Route name"
                className="border rounded-lg px-3 py-2 text-sm"
            />

            <div className="flex gap-3 items-end">
                <div className="flex flex-col gap-1 flex-1">
                    <span className="text-sm font-medium">{form.grade}</span>
                    <input
                        type="range"
                        min={0}
                        max={GRADES.length - 1}
                        value={GRADES.indexOf(form.grade)}
                        onChange={e => setForm(prev => ({ ...prev, grade: GRADES[Number(e.target.value)] }))}
                        className="w-full accent-gray-900"
                    />
                </div>

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
                placeholder="Attempts"
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

            <button
                type="submit"
                className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium"
            >
                Add climb
            </button>
        </form>
    )
}
