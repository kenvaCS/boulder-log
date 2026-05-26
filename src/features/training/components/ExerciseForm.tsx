import { useState } from 'react'
import { useTrainingContext } from '../../../context/TrainingContext'

const EMPTY_FORM = {
    name: '',
    description: '',
    rpe: undefined as number | undefined,
}

export default function ExerciseForm() {
    const { addExercise } = useTrainingContext()
    const [form, setForm] = useState(EMPTY_FORM)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value, type } = e.target as HTMLInputElement
        setForm(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value,
        }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.name.trim()) return
        addExercise({
            name: form.name.trim(),
            ...(form.description.trim() && { description: form.description.trim() }),
            ...(form.rpe !== undefined && { rpe: form.rpe }),
        })
        setForm(EMPTY_FORM)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-medium">New exercise</h2>

            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Exercise name"
                className="border rounded-lg px-3 py-2 text-sm"
            />

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description / how to perform (optional)"
                rows={3}
                className="border rounded-lg px-3 py-2 text-sm resize-none"
            />

            <input
                name="rpe"
                type="number"
                min={1}
                max={10}
                step={0.5}
                value={form.rpe ?? ''}
                onChange={handleChange}
                placeholder="Target RPE (optional)"
                className="border rounded-lg px-3 py-2 text-sm"
            />

            <button
                type="submit"
                disabled={!form.name.trim()}
                className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
                Add exercise
            </button>
        </form>
    )
}
