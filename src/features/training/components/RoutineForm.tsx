import { useState, useEffect } from 'react'
import type { RoutineExercise } from '../types'

import { useTrainingContext } from '../../../context/TrainingContext'

const EMPTY_FORM = {
    name: '',
    exercises: [] as RoutineExercise[], // preferred TS way to typecast
    notes: '',
}

const STORAGE_KEY = "routineFormDraft";

const EMPTY_EXERCISE_ROW = {
    exerciseId: '',
    sets: 1,
    reps: undefined as number | undefined,
    duration: undefined as number | undefined,
    rpe: undefined as number | undefined,
}

export default function RoutineForm() {
    const { exercises, addRoutine } = useTrainingContext()
    const [form, setForm] = useState(() => {
        const draft = localStorage.getItem(STORAGE_KEY)
        return draft ? JSON.parse(draft) : EMPTY_FORM
    })
    const [row, setRow] = useState(EMPTY_EXERCISE_ROW)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    }, [form])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value })) // computed property name, evaluates name before using it
    }

    function handleRowChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target
        setRow(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value,
        }))
    }

    function addExerciseToRoutine() {
        if (!row.exerciseId || row.sets < 1) return
        const entry: RoutineExercise = {
            exerciseId: row.exerciseId,
            sets: row.sets,
            ...(row.reps !== undefined && { reps: row.reps }),
            ...(row.duration !== undefined && { duration: row.duration }),
            ...(row.rpe !== undefined && { rpe: row.rpe }),
        }
        setForm(prev => ({ ...prev, exercises: [...prev.exercises, entry] }))
        setRow(EMPTY_EXERCISE_ROW)
    }

    function removeExercise(index: number) {
        setForm(prev => ({
            ...prev,
            exercises: prev.exercises.filter((_, i) => i !== index),
        }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.name.trim() || form.exercises.length === 0) return
        addRoutine(form)
        setForm(EMPTY_FORM)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-medium">New routine</h2>

            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Routine name"
                className="border rounded-lg px-3 py-2 text-sm"
            />

            {form.exercises.length > 0 && (
                <ul className="flex flex-col gap-2">
                    {form.exercises.map((ex, i) => {
                        const exercise = exercises.find(e => e.id === ex.exerciseId)
                        return (
                            <li key={i} className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm">
                                <span className="font-medium flex-1">{exercise?.name ?? ex.exerciseId}</span>
                                <span className="text-gray-400 text-xs">
                                    {ex.sets} sets
                                    {ex.reps !== undefined ? ` · ${ex.reps} reps` : ''}
                                    {ex.duration !== undefined ? ` · ${ex.duration}s` : ''}
                                    {ex.rpe !== undefined ? ` · RPE ${ex.rpe}` : ''}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeExercise(i)}
                                    className="text-gray-300 hover:text-red-400 text-xs ml-1"
                                    aria-label="Remove exercise"
                                >
                                    ✕
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}

            {/* Add exercise row */}
            <div className="flex flex-col gap-2 border rounded-lg p-3 bg-gray-50">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Add exercise</p>

                <select
                    name="exerciseId"
                    value={row.exerciseId}
                    onChange={handleRowChange}
                    className="border rounded-lg px-3 py-2 text-sm bg-white"
                >
                    <option value="">Select exercise…</option>
                    {exercises.map(ex => (
                        <option key={ex.id} value={ex.id}>{ex.name}</option>
                    ))}
                </select>

                <div className="grid grid-cols-3 gap-2">
                    <input
                        name="sets"
                        type="number"
                        min={1}
                        value={row.sets}
                        onChange={handleRowChange}
                        placeholder="Sets"
                        className="border rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                        name="reps"
                        type="number"
                        min={1}
                        value={row.reps ?? ''}
                        onChange={handleRowChange}
                        placeholder="Reps"
                        className="border rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                        name="duration"
                        type="number"
                        min={1}
                        value={row.duration ?? ''}
                        onChange={handleRowChange}
                        placeholder="Duration (s)"
                        className="border rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <input
                    name="rpe"
                    type="number"
                    min={1}
                    max={10}
                    step={0.5}
                    value={row.rpe ?? ''}
                    onChange={handleRowChange}
                    placeholder="Target RPE (optional)"
                    className="border rounded-lg px-3 py-2 text-sm"
                />

                <button
                    type="button"
                    onClick={addExerciseToRoutine}
                    disabled={!row.exerciseId}
                    className="border rounded-lg px-3 py-2 text-sm font-medium hover:bg-white disabled:opacity-40 transition-colors"
                >
                    + Add to routine
                </button>
            </div>

            <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Notes"
                rows={3}
                className="border rounded-lg px-3 py-2 text-sm resize-none"
            />

            <button
                type="submit"
                disabled={!form.name.trim() || form.exercises.length === 0}
                className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
                Save routine
            </button>
        </form>
    )
}
