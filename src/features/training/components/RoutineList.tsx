import { useTrainingContext } from '../../../context/TrainingContext'

export default function RoutineList() {
    const { routines, exercises } = useTrainingContext()

    if (routines.length === 0) return null

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-medium">Routines ({routines.length})</h2>
            <ul className="flex flex-col gap-4">
                {routines.map(routine => (
                    <li key={routine.id} className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium">{routine.name}</span>
                        <ul className="flex flex-wrap gap-2">
                            {routine.exercises.map((re, i) => {
                                const ex = exercises.find(e => e.id === re.exerciseId)
                                return (
                                    <li key={i} className="flex flex-col gap-0.5 border rounded-lg px-3 py-2 text-xs">
                                        <span className="font-medium text-gray-700">{ex?.name ?? re.exerciseId}</span>
                                        <span className="text-gray-400">
                                            {re.sets} sets
                                            {re.reps !== undefined ? ` · ${re.reps} reps` : ''}
                                            {re.duration !== undefined ? ` · ${re.duration}s` : ''}
                                            {re.rpe !== undefined ? ` · RPE ${re.rpe}` : ''}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                        {routine.notes && (
                            <p className="text-xs text-gray-400">{routine.notes}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
