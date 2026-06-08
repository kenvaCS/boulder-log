import { useNavigate } from 'react-router-dom'
import type { Climb } from '../types'
import { usePatternsContext } from '../../../context/PatternsContext'

interface Props {
    climb: Climb
    onDelete: (id: string) => void
}

export default function ClimbCard({ climb, onDelete }: Props) {
    const navigate = useNavigate()
    const { patterns } = usePatternsContext()
    const climbPatterns = patterns.filter(p => climb.patternIds?.includes(p.id))

    return (
    <div 
        className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 cursor-pointer transition-[box-shadow, transform] duration-150 hover:shadow-md hover:ring-2 hover:ring-grey-400 hover:-translate-y-0.5"
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
                {climbPatterns.map(p => (
                    <span 
                        key={p.id} 
                        className="text-xs bg-violet-100 text-violet-700 rounded-full px-2 py-0.5"
                        onClick={(e) => { e.stopPropagation(); navigate(`/pattern/${p.id}`) }} 
                    >
                        {p.name}
                    </span>
                ))}
            </div>
            <button
                onClick={(e) => {e.stopPropagation(); onDelete(climb.id)}}
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
