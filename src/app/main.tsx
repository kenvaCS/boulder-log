import { BrowserRouter } from 'react-router-dom'
import { ClimbsProvider } from '../context/ClimbsContext'
import { TrainingProvider } from '../context/TrainingContext'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.tsx'

// we wrap ClimbsProvider and TrainingProvider so they are globally accessible to any component that imports TrainingContext. We can tighten the scope later
// as necessary if this gets unwieldy.

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ClimbsProvider>
                <TrainingProvider>
                    <App />
                </TrainingProvider>
            </ClimbsProvider>
        </BrowserRouter>
  </StrictMode>,
)
