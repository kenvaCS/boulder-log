import RoutineForm from '../features/training/components/RoutineForm'
import ExerciseForm from '../features/training/components/ExerciseForm'

export default function TrainingPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-lg font-medium">Training</h1>
        <ExerciseForm />
        <RoutineForm />
        </div>
    )
}
