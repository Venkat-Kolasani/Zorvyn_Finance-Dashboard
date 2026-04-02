import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFinanceStore from './store/useFinanceStore';
import { Sidebar } from './components/layout';
import './App.css';

// Lazy load pages
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const TransactionsPage = React.lazy(() => import('./pages/TransactionsPage'));
const InsightsPage = React.lazy(() => import('./pages/InsightsPage'));

function App() {
  const { darkMode } = useFinanceStore();

  return (
    <div className={`app-root ${darkMode ? 'dark' : ''}`}>
      <BrowserRouter>
        <Sidebar />
        
        <Suspense fallback={
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
