import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <span className="font-medium text-gray-900">Boulder Log</span>
                <div className="flex gap-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'text-sm font-medium text-gray-900' : 'text-sm text-gray-400 hover:text-gray-600'
                        }
                    >
                        Climbs
                    </NavLink>
                    <NavLink
                        to="/stats"
                        className={({ isActive }) =>
                            isActive ? 'text-sm font-medium text-gray-900' : 'text-sm text-gray-400 hover:text-gray-600'
                        }
                    >
                        Stats
                    </NavLink>
                    <NavLink
                        to="/goals"
                        className={({ isActive }) => 
                            isActive ? 'text-sm font-medium text-gray-900' : 'text-sm text-gray-400 hover:text-gray-600'
                        }
                    >
                        Goals
                    </NavLink>
                    <NavLink
                        to="/training"
                        className={({ isActive }) =>
                            isActive ? 'text-sm font-medium text-gray-900' : 'text-sm text-gray-400 hover:text-gray-600'
                        }
                    >
                        Training
                    </NavLink>
                    <NavLink
                        to="/patterns"
                        className={({ isActive }) =>
                            isActive ? 'text-sm font-medium text-gray-900' : 'text-sm text-gray-400 hover:text-gray-600'
                        }
                    >
                        Patterns
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
