import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Pattern } from '../types'

interface Props {
    pattern: Pattern
    onDelete: (id: string) => void
}

export default function PatternCard({ pattern, onDelete }: Props) {
    const navigate = useNavigate()
    const dragging = useRef(false)

    return (
    <div
        className="relative bg-white rounded-xl shadow-sm p-3 flex flex-col transition-[box-shadow, transform] duration-150 hover:shadow-md hover:-translate-y-0.5 h-48 overflow-hidden"
        onMouseDown={() => { dragging.current = false}}
        onMouseMove={() => { dragging.current = true}}
        onClick = {() => { if (!dragging.current)
        navigate(`/pattern/${pattern.id}`)}}
    >
        <div className="flex items-start justify-between">
            <div className="font-bold text-me">
                {pattern.name}
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(pattern.id)}}
                className="text-gray-400 hover:text-red-500 text-sm p-1"
            >
                delete
            </button>
        </div>

        <div className="flex-1 min-h-0 mt-2">
            <img 
                src={pattern.video?.[0] || "/assets/sample.jpg"}
                alt="Chrysalis"
                className="h-full w-full object-cover rounded-lg"
            />
        </div>
    </div>
    )
}
