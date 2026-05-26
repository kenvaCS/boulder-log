import { useState } from 'react'
import { useGoals } from '../hooks/useGoals'
import { useClimbsContext } from '../context/ClimbsContext'


const GRADES = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17']

const EMPTY_GOAL = {
    targetGrade: 'V0',
    description: '',
    deadline: '',
}

export default function GoalsPage() {
    const { goals, addGoal, achieveGoal, deleteGoal } = useGoals()
    const { climbs } = useClimbsContext()
    const [form, setForm] = useState(EMPTY_GOAL)

    const activeGoals = goals.filter(g => !g.achieved)
    const achievedGoals = goals.filter(g => g.achieved)
    const projects = climbs.filter(c => c.isProject)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!form.description.trim()) return
        addGoal({
            targetGrade: form.targetGrade,
            description: form.description,
            deadline: form.deadline || undefined,
        })
        setForm(EMPTY_GOAL)
    }
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-lg font-medium">Goals & projects</h1>

            {/* Add goal form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3">
                <h2 className="text-sm font-medium">New goal</h2>
                <input
                    value={form.description}
                    onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Goal description"
                    className="border rounded-lg px-3 py-2 text-sm"
                />
                <div className="flex gap-3">
                    <select
                        value={form.targetGrade}
                        onChange={e => setForm(prev => ({ ...prev, targetGrade: e.target.value }))}
                        className="border rounded-lg px-3 py-2 text-sm flex-1"
                    >
                        {GRADES.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={form.deadline}
                        onChange={e => setForm(prev => ({ ...prev, deadline: e.target.value }))}
                        className="border rounded-lg px-3 py-2 text-sm flex-1"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium"
                >
                    Add goal
                </button>
            </form>

            {/* Active goals */}
            {activeGoals.length > 0 && (
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm font-medium text-gray-500">Active goals</h2>
                    {activeGoals.map(goal => (
                        <div key={goal.id} className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{goal.description}</span>
                                    <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                                        {goal.targetGrade}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteGoal(goal.id)}
                                    className="text-gray-400 hover:text-red-500 text-sm"
                                >
                                    delete
                                </button>
                            </div>
                            {goal.deadline && (
                                <span className="text-xs text-gray-400">By {goal.deadline}</span>
                            )}
                            <button
                                onClick={() => achieveGoal(goal.id)}
                                className="text-xs text-green-600 hover:text-green-700 self-start"
                            >
                                Mark as achieved
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm font-medium text-gray-500">Projects</h2>
                    {projects.map(climb => (
                        <div key={climb.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{climb.routeName}</span>
                                <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                                    {climb.grade}
                                </span>
                            </div>
                            {climb.location && (
                                <span className="text-xs text-gray-400">{climb.location}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Achieved goals */}
            {achievedGoals.length > 0 && (
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm font-medium text-gray-500">Achieved</h2>
                    {achievedGoals.map(goal => (
                        <div key={goal.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between opacity-60">
                            <div className="flex items-center gap-2">
                                <span className="font-medium line-through">{goal.description}</span>
                                <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                                    {goal.targetGrade}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteGoal(goal.id)}
                                className="text-gray-400 hover:text-red-500 text-sm"
                            >
                                delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {activeGoals.length === 0 && projects.length === 0 && achievedGoals.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No goals or projects yet.</p>
            )}
        </div>
    )
}
