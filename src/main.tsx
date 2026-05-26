import { BrowserRouter } from 'react-router-dom'
import { ClimbsProvider } from './context/ClimbsContext'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ClimbsProvider>
                <App />
            </ClimbsProvider>
        </BrowserRouter>
  </StrictMode>,
)
