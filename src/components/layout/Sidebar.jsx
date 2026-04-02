import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, TrendingUp, Moon, Sun } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { Badge } from '../ui';
import './Sidebar.css';

export const Sidebar = () => {
  const { role, darkMode, toggleDarkMode, isSidebarOpen, closeSidebar } = useFinanceStore();

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo-text">Finance</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
            end
          >
            <LayoutDashboard size={20} className="sidebar-icon" />
            <span>Overview</span>
          </NavLink>
          
          <NavLink 
            to="/transactions" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <ArrowLeftRight size={20} className="sidebar-icon" />
            <span>Transactions</span>
          </NavLink>
          
          <NavLink 
            to="/insights" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <TrendingUp size={20} className="sidebar-icon" />
            <span>Insights</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-role-badge">
            <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          </div>
          
          <button 
            className="sidebar-theme-toggle" 
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
