import { useState } from 'react'
import { usePatternsContext } from "../../../context/PatternsContext"
import type { Pattern } from "../types"


const EMPTY_FORM = {
    name: '',
    notes: '',
    muscles: [] as string[],
    thumbnail: [] as string[],
    video: [] as string[],
}

export default function PatternForm() {
    const { addPattern } = usePatternsContext()
    const [ form, setForm ] = useState(EMPTY_FORM)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.name.trim()) return // no name given to pattern
        addPattern(form)
        setForm(EMPTY_FORM)
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-medium">Add a pattern</h2>
            
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Pattern name"
                className="border rounded-lg px-3 py-2 text-sm"
            />

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
                className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium"
            >
                Add pattern
            </button>
        </form>
    )
}


