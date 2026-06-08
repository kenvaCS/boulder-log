import ClimbForm from '../features/climbs/components/ClimbForm'
import ClimbList from '../features/climbs/components/ClimbList'
import { useClimbsExport } from '../features/climbs/hooks/useClimbsExport'
import { PatternsProvider } from '../context/PatternsContext'

export default function ClimbPage() {
    const { exportToCSV } = useClimbsExport()

    return (
        <PatternsProvider>
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium">Climbs</h1>
                <button
                    onClick={exportToCSV}
                    className="text-sm text-gray-400 hover:text-gray-600"
                >
                    Export CSV
                </button>
            </div>
            <div className="flex items-start gap-10">
                <div className="flex-1 min-w-0"> 
                    <ClimbList/>
                </div>
                <div className="w-100 shrink-0">
                    <ClimbForm />
                </div>
            </div>
        </div>
        </PatternsProvider>
    )
}


