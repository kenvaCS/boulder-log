export function useClimbsStats(climbs: Climb[]) {

    const GRADES = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17']

    const totalSends = climbs.filter(c => !c.isProject).length
    const totalProjects = climbs.filter(c => c.isProject).length
    const avgAttempts = climbs.length === 0 ? 0 : 
        Math.round(climbs.reduce((sum, c) => sum + c.attempts, 0) / climbs.length)
    const hardestSend = climbs
        .filter(c => !c.isProject)
        .sort((a, b) => {
            const gradeNum = (g: string) => parseInt(g.replace('V', ''))
            return gradeNum(b.grade) - gradeNum(a.grade)
        })[0]

    const gradeData = GRADES.map(grade => ({
        grade,
        sends: climbs.filter(c => c.grade === grade && !c.isProject).length,
    })).filter(d => d.sends > 0)

    const sendTypeData = GRADES.map(grade => ({
        grade,
        sends: climbs.filter(c => c.grade === grade && !c.isProject).length,
        projects: climbs.filter(c => c.grade === grade && c.isProject).length,
    })).filter(d => d.sends > 0 || d.projects > 0) 

    return { totalSends, totalProjects, avgAttempts, hardestSend, gradeData, sendTypeData }
}

