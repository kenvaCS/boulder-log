import { useState, useEffect } from 'react'
import type { Exercise } from '../types'
import { loadExercises, saveExercises } from '../api'

export function useExercises() {
    const [exercises, setExercises] = useState<Exercise []>(loadExercises)

    useEffect(() => {
        saveExercises(exercises) // note that saveExercises and setExercises are different. setExercises changes the state. saveExercises saves the changes to state to our local storage...
    }, [exercises]) 

    // The UI elements provide the data and the hook here just does the logici
    // Also don't need exports because subfunction/nested function.
    
   function addExercise(data: Omit<Exercise, "id">) {
        // we use saveExercises with prev
        // the thing is though, we need to have an exercise to save into it
        const newExercise: Exercise = {...data, id: crypto.randomUUID()}
        setExercises(prev => [newExercise, ...prev])
    }

        // id: string here because that's how we identify which to change (not coming through the data from UI)
   function updateExercise(id: string, data: Partial<Exercise>) {
        setExercises(prev => 
            prev.map(c => (c.id == id ? {...c, ...data} : c))
        )
            // map takes a function, c is input, return is ()
            // returns new array populated with results of calling provided
            // function on every element
            // likewise prev is input, prev.map(...) is return
    }

    function deleteExercise(id: string) {
        setExercises(prev => prev.filter(c => c.id !== id))
        // filter uses positive condition to determine which elements to keep
        // non-mutating tho
    }

    // NOT SURE IF I NEED FILTER_EXERCISE YET
    //

    return { exercises, addExercise, updateExercise, deleteExercise }

}
    


