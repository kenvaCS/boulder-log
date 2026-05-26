import LogForm from '../components/LogForm'
import ClimbList from '../components/ClimbList'
import { useExport } from '../hooks/useExport'

export default function LogPage() {
    const { exportToCSV } = useExport()

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


