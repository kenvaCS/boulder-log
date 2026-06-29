export interface Climb {
    id: string
    routeName: string
    grade: string
    date: string
    location: string
    attempts: number
    notes: string
    photos: string[]
    isProject: boolean
    sentAt?: string
    patternIds: string[]
}

export interface Goal {
    id: string
    targetGrade: string
    description: string
    deadline?: string
    achieved: boolean
    climbId?: string
}
