# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server
npm run build        # tsc + vite build
npm run lint         # eslint
npm run test         # vitest run (single pass)
npm run test:watch   # vitest watch mode
npm run preview      # preview production build
```

## Architecture

React 19 + TypeScript SPA, no backend — all data persists in `localStorage`.

**Feature structure** under `src/features/<feature>/`:
- `api.ts` — localStorage read/write (load*/save* functions), no React
- `types.ts` — TypeScript interfaces
- `hooks/` — custom hooks that call api.ts and manage state via `useState` + `useEffect`
- `components/` — UI components for that feature
- `index.ts` — public re-exports

**Context layer** (`src/context/`) wraps feature hooks in React context so any page can access data without prop drilling. Always consume via the context hook (`useClimbsContext`, `useTrainingContext`), not the raw feature hooks.

**Pages** (`src/pages/`) are thin route-level components that compose feature components. **Routes** are declared in `src/app/App.tsx`.

### Features

**Climbs** (`src/features/climbs/`) — core logging. `Climb` has `id`, `routeName`, `grade` (V-scale), `date`, `location`, `attempts`, `notes`, `photos`, `isProject`, `sentAt?`.

**Training** (`src/features/training/`) — structured training. The data model has three layers:
- `Exercise` — a library entry describing a movement (no sets/reps/weight)
- `TrainingRoutine` + `RoutineExercise` — the planned template (sets, reps, RPE per exercise)
- `TrainingSession` + `SessionExercise` — the logged actuality (weight is session-specific)

### Form pattern

Use a single `EMPTY_FORM` constant + one `useState(EMPTY_FORM)` for all scalar fields. Handle all `<input>`, `<textarea>`, and `<select>` changes through a shared `handleChange` that spreads into the form state. See `LogForm.tsx` for the canonical example.

### Styling

Tailwind CSS v4 (via `@tailwindcss/vite` plugin). No separate config file — Tailwind is configured through the Vite plugin.
