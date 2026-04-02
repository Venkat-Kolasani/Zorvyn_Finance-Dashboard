import React from 'react';
import { Navbar } from './Navbar';
import './PageWrapper.css';

export const PageWrapper = ({ title, children }) => {
  return (
    <div className="page-wrapper">
      <Navbar title={title} />
      <main className="page-content">
        {children}
      </main>
    </div>
  );
};
