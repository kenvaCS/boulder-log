/* Conventional name for a file that handles things like:

- fetching climbs from a new server
- creating a new climb
- updating a climb
- deleting a climb

Instead of putting fetch into React components, centralize them. 

NOT:

- UI code
- state management
- business UI logic

Even right now, we can make it act as the data layer for our hooks

*/

import type { Climb } from "./types";

const STORAGE_KEY = "boulder-log-climbs";

export function loadClimbs(): Climb[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw): []
    } catch {
        return []
    }
}

export function saveClimbs(climbs: Climb[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(climbs));
}

