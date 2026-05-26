import LogForm from '../features/climbs/components/LogForm'
import ClimbList from '../features/climbs/components/ClimbList'
import { useClimbsExport } from '../features/climbs/hooks/useClimbsExport'

export default function LogPage() {
    const { exportToCSV } = useClimbsExport()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium">Log</h1>
                <button
                    onClick={exportToCSV}
                    className="text-sm text-gray-400 hover:text-gray-600"
                >
                    Export CSV
                </button>
            </div>
            <LogForm />
            <ClimbList />
        </div>
    )
}


