export interface Exercise {
    id: string
    name: string
    description?: string // [ ]?: indicates optionality
    rpe?: number // some exercises ought to be done at certain RPE: max-hang etc.
}

// want this separate so we can specify 
export interface RoutineExercise {
    exerciseId: string
    sets: number
    reps?: number
    duration?: number 
    rpe?: number 
}

export interface TrainingRoutine {
    id: string
    name: string
    exercises: RoutineExercise[]
    notes?: string
}

export interface SessionExercise {
    exerciseId: string
    setsCompleted: number
    repsPerSet?: number
    weightKg: number
    notes?: string
}

export interface TrainingSession {
    id: string
    routineId: string // give it a routine Id so we can compare it to the trainingRoutine
    date: string
    exercises: SessionExercise[]
    notes: string
}

/* Design Decisions:
 *
 * Exercise is our library of exercises for composing routines. Shouldn't specify weight, reps or sets here, but a description of how to do is good. RoutineExercise identifies the exercise it's referring to but specifies reps/sets. We keep weight added session specific as it can depend on the day. Because RPE is important for the kind of gains targetted, we keep RPE as attached to the routineExercise. Not clear if it should belong to the routineExercise or exercise. TrainingRoutine is fairly self-explanatory, but SessionExercise and TrainingSession are the logged sessions we want to save after performing the routines. Routine stores intention, session stores actuality.
 *
 */
