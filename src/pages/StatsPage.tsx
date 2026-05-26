import { useClimbsContext } from '../context/ClimbsContext'
import { useClimbsStats } from '../hooks/useClimbsStats'
import GradeChart from '../components/charts/GradeChart'
import SendTypeBar from '../components/charts/SendTypeBar'

export default function StatsPage() {
    const { climbs } = useClimbsContext()
    const { totalSends, totalProjects, avgAttempts, hardestSend, gradeData, sendTypeData } = useClimbsStats(climbs)
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-lg font-medium">Stats</h1>

            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-1">
                    <span className="text-2xl font-medium">{totalSends}</span>
                    <span className="text-xs text-gray-400">total sends</span>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-1">
                    <span className="text-2xl font-medium">{totalProjects}</span>
                    <span className="text-xs text-gray-400">projects</span>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-1">
                    <span className="text-2xl font-medium">{avgAttempts}</span>
                    <span className="text-xs text-gray-400">avg attempts</span>
                </div>
            </div>

            {hardestSend && (
                <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Hardest send</span>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{hardestSend.routeName}</span>
                        <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                            {hardestSend.grade}
                        </span>
                    </div>
                </div>
            )}

            <GradeChart data={gradeData} />
            <SendTypeBar data={sendTypeData} />
        </div>
    )
}
