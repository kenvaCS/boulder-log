import { useState } from 'react'
import { useClimbsContext } from '../../../context/ClimbsContext'
import ClimbCard from './ClimbCard'

const GRADES = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17']
const MAX_IDX = GRADES.length - 1

export default function ClimbList() {
    const { deleteClimb, filterClimbs } = useClimbsContext()
    const [query, setQuery] = useState('')
    const [minIdx, setMinIdx] = useState(0)
    const [maxIdx, setMaxIdx] = useState(MAX_IDX)

    const minPct = (minIdx / MAX_IDX) * 100
    const maxPct = (maxIdx / MAX_IDX) * 100

    const isFullRange = minIdx === 0 && maxIdx === MAX_IDX
    const filtered = filterClimbs(query, GRADES[minIdx], GRADES[maxIdx])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search climbs..."
                    className="border rounded-lg px-3 py-2 text-sm"
                />

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Grade range</span>
                        <span className="font-medium text-gray-700">
                            {isFullRange ? 'All grades' : `${GRADES[minIdx]} – ${GRADES[maxIdx]}`}
                        </span>
                    </div>

                    {/* dual range slider — each step is one V grade */}
                    <div className="relative h-5 flex items-center">
                        <div className="absolute w-full h-1.5 rounded-full bg-gray-200" />
                        <div
                            className="absolute h-1.5 rounded-full bg-blue-500"
                            style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
                        />
                        <input
                            type="range"
                            min={0}
                            max={MAX_IDX}
                            step={1}
                            value={minIdx}
                            onChange={e => setMinIdx(Math.min(Number(e.target.value), maxIdx))}
                            className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-solid"
                        />
                        <input
                            type="range"
                            min={0}
                            max={MAX_IDX}
                            step={1}
                            value={maxIdx}
                            onChange={e => setMaxIdx(Math.max(Number(e.target.value), minIdx))}
                            className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-solid"
                        />
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                        <span>V0</span>
                        <span>V17</span>
                    </div>
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                    {query || !isFullRange ? 'No climbs match your search.' : 'No climbs logged yet.'}
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
