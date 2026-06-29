import { useState, useEffect } from 'react'
import { useTrainingContext } from '../../../context/TrainingContext'
import type { SessionExercise, TrainingSession } from '../types'

const today = new Date().toISOString().split('T')[0]

const EMPTY_FORM = {
    routineId: '',
    date: today,
    exercises: [] as SessionExercise[],
    notes: '',
}

const STORAGE_KEY="sessionFormDraft";

export default function SessionForm() {
    const { routines, exercises, addSession } = useTrainingContext()
    const [form, setForm] = useState<Omit<TrainingSession, 'id'>>(() => {
        const draft = localStorage.getItem(STORAGE_KEY)
        return draft ? JSON.parse(draft): EMPTY_FORM
    })
    
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    },[form])


    function handleRoutineChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const routineId = e.target.value
        const routine = routines.find(r => r.id === routineId)
        const rows: SessionExercise[] = routine
            ? routine.exercises.map(re => ({
                exerciseId: re.exerciseId,
                setsCompleted: re.sets,
                repsPerSet: re.reps,
                weightKg: 0,
            }))
            : []
        setForm(prev => ({ ...prev, routineId, exercises: rows }))
    }

    function handleRowChange(
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = e.target as HTMLInputElement
        setForm(prev => {
            const updated = prev.exercises.map((ex, i) =>
                i === index
                    ? { ...ex, [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value }
                    : ex
            )
            return { ...prev, exercises: updated }
        })
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.routineId || form.exercises.length === 0) return
        addSession({
            routineId: form.routineId,
            date: form.date,
            exercises: form.exercises,
            notes: form.notes,
        })
        setForm({ ...EMPTY_FORM, date: form.date })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-medium">Log session</h2>

            <div className="flex gap-3">
                <select
                    value={form.routineId}
                    onChange={handleRoutineChange}
                    className="border rounded-lg px-3 py-2 text-sm flex-1"
                >
                    <option value="">Select routine…</option>
                    {routines.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                    className="border rounded-lg px-3 py-2 text-sm"
                />
            </div>

            {form.exercises.length > 0 && (
                <ul className="flex flex-col gap-3">
                    {form.exercises.map((row, i) => {
                        const ex = exercises.find(e => e.id === row.exerciseId)
                        return (
                            <li key={i} className="flex flex-col gap-2 border rounded-lg p-3 bg-gray-50">
                                <span className="text-sm font-medium">{ex?.name ?? row.exerciseId}</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-400">Sets</span>
                                        <input
                                            name="setsCompleted"
                                            type="number"
                                            min={0}
                                            value={row.setsCompleted}
                                            onChange={e => handleRowChange(i, e)}
                                            className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-400">Reps</span>

                                        <input
                                            name="repsPerSet"
                                            type="number"
                                            min={0}
                                            value={row.repsPerSet ?? ''}
                                            onChange={e => handleRowChange(i, e)}
                                            placeholder="Reps"
                                            className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-400">Weight (kg)</span>
                                         <input
                                        name="weightKg"
                                        type="number"
                                        min={0}
                                        step={0.5}
                                        value={row.weightKg}
                                        onChange={e => handleRowChange(i, e)}
                                        placeholder="kg"
                                        className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                    </label>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}

            <textarea
                value={form.notes}
                onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Session notes (optional)"
                rows={2}
                className="border rounded-lg px-3 py-2 text-sm resize-none"
            />

            <button
                type="submit"
                disabled={!form.routineId || form.exercises.length === 0}
                className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
                Save session
            </button>
        </form>
    )
}
