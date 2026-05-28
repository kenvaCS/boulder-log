import { useTrainingContext } from '../../../context/TrainingContext'

export default function SessionList() {
    const { sessions, routines, exercises } = useTrainingContext()

    if (sessions.length === 0) return null

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-medium">Sessions ({sessions.length})</h2>
            <ul className="flex flex-col gap-4">
                {sessions.map(session => {
                    const routine = routines.find(r => r.id === session.routineId)
                    return (
                        <li key={session.id} className="flex flex-col gap-2">
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-medium">{routine?.name ?? 'Unknown routine'}</span>
                                <span className="text-xs text-gray-400">{session.date}</span>
                            </div>
                            <ul className="flex flex-wrap gap-2">
                                {session.exercises.map((se, i) => {
                                    const ex = exercises.find(e => e.id === se.exerciseId)
                                    return (
                                        <li key={i} className="flex flex-col gap-0.5 border rounded-lg px-3 py-2 text-xs">
                                            <span className="font-medium text-gray-700">{ex?.name ?? se.exerciseId}</span>
                                            <span className="text-gray-400">
                                                {se.setsCompleted} sets
                                                {se.repsPerSet !== undefined ? ` · ${se.repsPerSet} reps` : ''}
                                                {se.weightKg > 0 ? ` · ${se.weightKg}kg` : ''}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                            {session.notes && (
                                <p className="text-xs text-gray-400">{session.notes}</p>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
