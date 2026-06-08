import { Routes, Route } from 'react-router-dom'
import NavBar from '../layout/Navbar/NavBar'
import ClimbPage from '../pages/ClimbPage'
import StatsPage from '../pages/StatsPage'
import GoalsPage from '../pages/GoalsPage'
import DetailPage from '../pages/DetailPage'
import TrainingPage from '../pages/TrainingPage'
import PatternPage from '../pages/PatternPage'


export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<ClimbPage />} />
                    <Route path="/climb/:id" element={<DetailPage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/goals" element={<GoalsPage />} />
                    <Route path="/training" element={<TrainingPage />} />
                    <Route path="/patterns" element={<PatternPage />} />
                </Routes>
            </main>
        </div>
    )
}
