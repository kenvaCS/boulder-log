import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from '../layout/Navbar/NavBar'
import ClimbPage from '../pages/ClimbPage'
import StatsPage from '../pages/StatsPage'
import GoalsPage from '../pages/GoalsPage'
import DetailPage from '../pages/DetailPage'
import TrainingPage from '../pages/TrainingPage'
import PatternPage from '../pages/PatternPage'
import Modal from '../features/climbs/components/Modal'


export default function App() {
    let location = useLocation();

    let state = location.state as {backgroundLocation?: Location };
    // as typecasts/asserts location anonymous/in-line object 

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <Routes location={state?.backgroundLocation || location}>
                    <Route path="/" element={<ClimbPage />} />
                    <Route path="/climb/:id" element={<DetailPage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/goals" element={<GoalsPage />} />
                    <Route path="/training" element={<TrainingPage />} />
                    <Route path="/patterns" element={<PatternPage />} />
                </Routes>

                {state?.backgroundLocation && (
                    <Routes>
                       <Route path="/climb/:id" element={<Modal />} />
                    </Routes>
                )}
            </main>
        </div>
    )
}
