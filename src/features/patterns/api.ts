import type { Pattern } from "./types";

const STORAGE_KEY = "boulder-log-patterns";

export function loadPatterns(): Pattern[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw): []
    } catch {
        return []
    }
}

export function savePatterns(patterns: Pattern[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patterns));
}


