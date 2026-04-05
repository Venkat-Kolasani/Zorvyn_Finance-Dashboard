import React, { useMemo } from 'react';
import { PieChart as RechartsPie, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Label } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { getCategoryBreakdown } from '../../utils/calculations';
import { getCategoryById } from '../../data/categories';
import { formatChartAmount, formatCurrency, formatPercent } from '../../utils/formatters';
import { EmptyState } from '../ui';
import './SpendingChart.css';

const COLOR_MAP = {
  green: 'var(--color-chart-green)',
  slate: 'var(--color-chart-slate)',
  blue: 'var(--color-chart-blue)',
  orange: 'var(--color-chart-orange)',
  yellow: 'var(--color-chart-yellow)',
  purple: 'var(--color-chart-purple)',
  gray: 'var(--color-chart-gray)',
  teal: 'var(--color-chart-teal)',
  other: 'var(--color-chart-other)'
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="spending-tooltip">
        <span className="spending-tooltip-label">{data.label}</span>
        <span className="spending-tooltip-value">{formatCurrency(data.total)}</span>
      </div>
    );
  }
  return null;
};

export const SpendingChart = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  
  const { chartData, totalExpenses } = useMemo(() => {
    const breakdown = getCategoryBreakdown(transactions);
    
    const totalExp = breakdown.reduce((sum, item) => sum + item.total, 0);

    let processedData = [];
    if (breakdown.length > 5) {
      processedData = breakdown.slice(0, 5);
      const otherTotal = breakdown.slice(5).reduce((sum, item) => sum + item.total, 0);
      processedData.push({
        category: 'other',
        total: otherTotal,
        percent: totalExp > 0 ? (otherTotal / totalExp) * 100 : 0
      });
    } else {
      processedData = breakdown;
    }

    const chartData = processedData.map((item) => {
      if (item.category === 'other') {
        return {
          ...item,
          label: 'Other',
          color: COLOR_MAP.other
        };
      }
      
      const categoryMeta = getCategoryById(item.category);
      return {
        ...item,
        label: categoryMeta ? categoryMeta.label : item.category.charAt(0).toUpperCase() + item.category.slice(1),
        color: categoryMeta && COLOR_MAP[categoryMeta.color] ? COLOR_MAP[categoryMeta.color] : COLOR_MAP.gray
      };
    });

    return { chartData, totalExpenses: totalExp };
  }, [transactions]);

  if (chartData.length === 0 || totalExpenses === 0) {
    return (
      <div className="spending-chart-empty">
        <EmptyState
          icon={PieChartIcon}
          title="No expenses found"
          message="There are no expenses in this period to display."
        />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', boxSizing: 'border-box', paddingRight: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%', paddingRight: '16px' }}>
        
        <div style={{ flexShrink: 0, width: '180px', height: '180px' }}>
          <RechartsPie width={180} height={180}>
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="label"
              cx={90}
              cy={90}
              innerRadius={55}
              outerRadius={80}
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label 
                value={formatCurrency(totalExpenses)} 
                position="center" 
                className="donut-center-label"
              />
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} />
          </RechartsPie>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          {chartData.map((entry, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: entry.color, flexShrink: 0 }} />
              <span className="legend-label" style={{ flex: 1 }}>{entry.label}</span>
              <span className="legend-amount" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {formatChartAmount(entry.total)}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SpendingChart;
