# Zorvyn Finance Dashboard

This is a frontend-only finance dashboard app for viewing, filtering, and managing mock transaction data.

## Tech stack

The project uses React with Vite for the UI runtime and build tooling, React Router for page routing, Zustand for client-side state, Recharts for charts, date-fns for date handling, and Lucide React for icons. Styling is done with plain CSS modules/files in the component folders.

## Setup

From the project root, run:

```bash
npm install
npm run dev
npm run build
```

`npm run dev` starts the local development server. `npm run build` creates the production build in `dist`.

## Feature walkthrough

### Overview page (`/`)

- Shows summary cards for key totals.
- Shows a balance trend chart and spending breakdown chart.
- Shows recent transactions.
- Uses a short skeleton/loading state before rendering the cards.

### Transactions page (`/transactions`)

- Shows a transaction table with sorting by date, description, category, type, and amount.
- Includes search, category/type filters, and date-range filtering.
- Includes pagination (10 rows per page).
- Admin-only actions: add transaction, edit transaction, and delete transaction.

### Insights page (`/insights`)

- Shows calculated insight cards (top category, month-over-month change, income/expense ratio, largest transaction).
- Shows a monthly comparison chart.
- If no transactions exist, shows an empty state instead of charts/cards.

## Role switching (Admin / Viewer)

Use the role dropdown in the top navbar (right side) to switch between `Viewer` and `Admin`.

- `Viewer`: read-only access (no add/edit/delete transaction actions).
- `Admin`: can add new transactions and edit/delete existing ones.

This toggle updates client-side state only and applies immediately.

## Assumptions made

- Data is mock seed data bundled in the frontend.
- There is no backend API, no auth service, and no database.
- Role switching is static and local (a UI/state toggle, not permissioned by a server).
- Role and dark mode are persisted in local storage; transaction edits are in-memory for the current session.

## With more time

- Add real authentication and server-side role enforcement.
- Connect transactions to a backend with persistent storage.
- Add tests (unit + integration) for store logic and page flows.
- Add input-level validation/error states that mirror backend constraints.
