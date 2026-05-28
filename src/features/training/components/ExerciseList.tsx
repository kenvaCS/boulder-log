import { useTrainingContext } from '../../../context/TrainingContext'

export default function ExerciseList() {
    const { exercises } = useTrainingContext()

    if (exercises.length === 0) return null

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-3">
            <h2 className="text-lg font-medium">Exercises ({exercises.length})</h2>
            <ul className="flex flex-col gap-2">
                {exercises.map(ex => (
                    <li key={ex.id} className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{ex.name}</span>
                            {ex.rpe !== undefined && (
                                <span className="text-xs text-gray-400">RPE {ex.rpe}</span>
                            )}
                        </div>
                        {ex.description && (
                            <p className="text-xs text-gray-500">{ex.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
