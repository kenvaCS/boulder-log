// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

vi.mock('../pages/ClimbPage', () => ({ default: () => <div>ClimbPage</div> }))
vi.mock('../pages/DetailPage', () => ({ default: () => <div>DetailPage</div> }))
vi.mock('../pages/StatsPage', () => ({ default: () => <div>StatsPage</div> }))
vi.mock('../pages/GoalsPage', () => ({ default: () => <div>GoalsPage</div> }))
vi.mock('../pages/TrainingPage', () => ({ default: () => <div>TrainingPage</div> }))
vi.mock('../pages/PatternPage', () => ({ default: () => <div>PatternPage</div> }))
vi.mock('../features/climbs/components/Modal', () => ({ default: () => <div>Modal</div> }))
vi.mock('../layout/Navbar/NavBar', () => ({ default: () => <nav>NavBar</nav> }))

import App from './App'

function renderAt(initialEntries: NonNullable<Parameters<typeof createMemoryRouter>[1]>['initialEntries']) {
    const router = createMemoryRouter([{ path: '*', element: <App /> }], { initialEntries })
    return render(<RouterProvider router={router} />)
}

describe('App — modal vs. direct navigation to /climb/:id', () => {
    it('renders DetailPage when linked directly to /climb/:id (no state)', () => {
        renderAt(['/climb/1'])
        expect(screen.getByText('DetailPage')).toBeTruthy()
        expect(screen.queryByText('Modal')).toBeNull()
    })

    it('renders Modal overlay (not DetailPage) when coming from another page', () => {
        renderAt([{
            pathname: '/climb/1',
            state: {
                backgroundLocation: { pathname: '/', search: '', hash: '', key: 'default' },
            },
        }])
        expect(screen.getByText('Modal')).toBeTruthy()
        expect(screen.queryByText('DetailPage')).toBeNull()
    })

    it('keeps the background page visible when Modal is shown', () => {
        renderAt([{
            pathname: '/climb/1',
            state: {
                backgroundLocation: { pathname: '/', search: '', hash: '', key: 'default' },
            },
        }])
        expect(screen.getByText('ClimbPage')).toBeTruthy()
        expect(screen.getByText('Modal')).toBeTruthy()
    })
})
