import { useNavigate } from 'react-router-dom'
import type { Climb } from '../types'

interface Props {
    climb: Climb
    onDelete: (id: string) => void
}

export default function ClimbCard({ climb, onDelete }: Props) {
    const navigate = useNavigate()

    return (
    <div 
        className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 cursor-pointer transition-[box-shadow, transform] duration-150 hover:shadow-md hover:ring-2 hover:ring-violet-400 hover:-translate-y-0.5"
        onClick={() => navigate(`/climb/${climb.id}`)}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="font-medium">
                    {climb.routeName}
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                    {climb.grade}
                </span>
                {climb.isProject && (
                    <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                        project
                    </span>
                )}
            </div>
            <button
                onClick={() => onDelete(climb.id)}
                className="text-gray-400 hover:text-red-500 text-sm"
            >
                delete
            </button>
        </div>

        <div className="text-sm text-gray-500 flex gap-3">
            <span>{climb.date}</span>
            {climb.location && <span>{climb.location}</span>}
            <span>{climb.attempts} {climb.attempts === 1 ? 'attempt' : 'attempts'}</span>
        </div>

        {climb.notes && (
            <p className="text-sm text-gray-600">{climb.notes}</p>
        )}
    </div>
    )
}   
