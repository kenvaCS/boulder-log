import { useClimbsContext } from '../../../context/ClimbsContext'


export function useClimbsExport() {
    const { climbs } = useClimbsContext()
    
    function exportToCSV() {
        const headers = ['date', 'routeName', 'grade', 'location', 'attempts', 'isProject', 'notes']

        const rows = climbs.map(c => [
            c.date,
            c.routeName,
            c.grade,
            c.location,
            c.attempts,
            c.isProject ? 'yes' : 'no', 
            c.notes.replace(/,/g, ' ').replace(/\n/g, ' '),
        ])
        
        const csv = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n')

        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `boulder-log-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return { exportToCSV }
}

