import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import LogPage from './pages/LogPage'
import StatsPage from './pages/StatsPage'
import GoalsPage from './pages/GoalsPage'
import DetailPage from './pages/DetailPage'


export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <main className="max-w-2xl mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<LogPage />} />
                    <Route path="/climb/:id" element={<DetailPage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/goals" element={<GoalsPage />} />
                </Routes>
            </main>
        </div>
    )
}
