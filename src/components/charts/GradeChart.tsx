import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface GradeData {
    grade: string
    sends: number
}

interface Props {
    data: GradeData[]
}

export default function GradeChart({ data }: Props) {
    if (data.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-4 text-sm text-gray-400 text-center py-8">
                No sends logged yet.
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3">
            <span className="text-sm font-medium">Sends by grade</span>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                    <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="sends" fill="#111827" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
