import React from 'react';
import { PageWrapper } from '../components/layout';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceTrendChart } from '../components/dashboard/BalanceTrendChart';
import { SpendingChart } from '../components/dashboard/SpendingChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { Card } from '../components/ui';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <PageWrapper title="Overview">
      <div className="dashboard-content">
        <SummaryCards />
        
        <div className="dashboard-charts-grid">
          <Card className="dashboard-card chart-card-left">
            <h3 className="dashboard-card-title">Balance Trend</h3>
            <BalanceTrendChart />
          </Card>
          
          <Card className="dashboard-card chart-card-right">
            <h3 className="dashboard-card-title">Spending Breakdown</h3>
            <SpendingChart />
          </Card>
        </div>

        <div className="dashboard-bottom-section">
          <Card className="dashboard-card">
            <h3 className="dashboard-card-title">Recent Transactions</h3>
            <RecentTransactions />
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
