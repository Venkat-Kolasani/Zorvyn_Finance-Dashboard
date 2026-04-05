# Zorvyn Finance Dashboard

A frontend-only finance dashboard for viewing, filtering, and managing mock transaction data.

## Tech stack

React with Vite for the UI and build tooling, React Router for routing, Zustand for 
client-side state, Recharts for charts, Tailwind CSS for styling, date-fns for date 
handling, and Lucide React for icons. CSS custom properties handle theming across 
light and dark mode.

## Setup
```bash
npm install
npm run dev
npm run build
```

`npm run dev` starts the local dev server. `npm run build` outputs to `dist`.

## Features

### Overview (`/`)
- Summary cards: net balance, total income, total expenses, savings rate
- Balance trend chart (6 months) and spending breakdown by category
- Recent transactions list
- Skeleton loading state on mount

### Transactions (`/transactions`)
- Sortable table: date, description, category, type, amount
- Search, category filter, type filter, and date range filter
- Paginated at 10 rows per page
- Admin only: add, edit, and delete transactions

### Insights (`/insights`)
- Top spending category, month-over-month change, income/expense ratio, 
  largest transaction
- Monthly income vs expense comparison chart
- Empty state when no transaction data exists

## Role switching

Use the dropdown in the top navbar to switch between Viewer and Admin.

- Viewer: read-only, no transaction controls visible
- Admin: add/edit/delete actions appear in the transactions page

Role is persisted to localStorage and applies immediately on switch.

## Dark mode

Toggle via the sidebar. Preference is persisted to localStorage.

## Assumptions

- All data is mock seed data bundled in the app
- No backend, no auth, no database
- Role switching is a UI state toggle only, not server-enforced
- Transaction edits persist for the session but reset on page refresh

## What's missing

- Real auth and server-side role enforcement
- Backend with persistent storage
- Unit and integration tests for store logic and page interactions