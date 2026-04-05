import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import useFinanceStore from '../../store/useFinanceStore';
import { getMonthlyData } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import './BalanceTrendChart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="balance-chart-tooltip">
        <p className="balance-chart-tooltip-label">{label}</p>
        <div className="balance-chart-tooltip-items">
          {payload.map((entry, index) => (
            <div key={index} className="balance-chart-tooltip-item">
              <div 
                className="balance-chart-tooltip-indicator" 
                style={{ backgroundColor: entry.stroke }}
              />
              <span className="balance-chart-tooltip-name">
                {entry.name === 'income' ? 'Income' : 'Expense'}
              </span>
              <span className="balance-chart-tooltip-value">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const BalanceTrendChart = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const data = getMonthlyData(transactions);

  return (
    <div className="balance-trend-chart-container">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 13, fontFamily: 'inherit' }}
            dy={10}
          />
          <YAxis hide={true} />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#94a3b8', strokeDasharray: '3 3', opacity: 0.5 }} 
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            stroke="#4ade80"
            fill="#4ade80"
            fillOpacity={0.2}
            strokeWidth={2}
            activeDot={{ r: 4, strokeWidth: 0, fill: '#4ade80' }}
          />
          <Area 
            type="monotone" 
            dataKey="expense" 
            stroke="#f87171"
            fill="#f87171"
            fillOpacity={0.2}
            strokeWidth={2}
            activeDot={{ r: 4, strokeWidth: 0, fill: '#f87171' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
