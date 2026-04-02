import { format, parseISO, startOfMonth, subMonths, isSameMonth } from 'date-fns';

export const getTotals = (transactions = []) => {
  const totals = transactions.reduce(
    (acc, tx) => {
      const amount = Number(tx.amount) || 0;

      if (tx.type === 'income') {
        acc.totalIncome += amount;
      } else if (tx.type === 'expense') {
        acc.totalExpense += amount;
      }

      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );

  const netBalance = totals.totalIncome - totals.totalExpense;
  const savingsRate =
    totals.totalIncome > 0 ? (netBalance / totals.totalIncome) * 100 : 0;

  return {
    totalIncome: totals.totalIncome,
    totalExpense: totals.totalExpense,
    netBalance,
    savingsRate,
  };
};

export const getMonthlyData = (transactions = []) => {
  const parsedDates = transactions
    .map((tx) => parseISO(tx.date))
    .filter((date) => !Number.isNaN(date.getTime()));

  const anchorDate =
    parsedDates.length > 0
      ? parsedDates.reduce((latest, current) => (current > latest ? current : latest))
      : new Date();

  const months = Array.from({ length: 6 }, (_, idx) =>
    startOfMonth(subMonths(anchorDate, 5 - idx))
  );

  return months.map((monthDate) => {
    const monthTx = transactions.filter((tx) => {
      const txDate = parseISO(tx.date);
      if (Number.isNaN(txDate.getTime())) return false;
      return isSameMonth(txDate, monthDate);
    });

    const income = monthTx
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    const expense = monthTx
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

    return {
      month: format(monthDate, 'MMM'),
      income,
      expense,
      balance: income - expense,
    };
  });
};

export const getCategoryBreakdown = (transactions = []) => {
  const expenseTx = transactions.filter((tx) => tx.type === 'expense');
  const totalExpense = expenseTx.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

  const totalsByCategory = expenseTx.reduce((acc, tx) => {
    const key = tx.category;
    const amount = Number(tx.amount) || 0;

    acc[key] = (acc[key] || 0) + amount;
    return acc;
  }, {});

  return Object.entries(totalsByCategory)
    .map(([category, total]) => ({
      category,
      total,
      percent: totalExpense > 0 ? (total / totalExpense) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);
};

export const getInsights = (transactions = []) => {
  const breakdown = getCategoryBreakdown(transactions);
  const monthlyData = getMonthlyData(transactions);
  const { totalIncome, totalExpense } = getTotals(transactions);

  const topCategory = breakdown[0] || null;

  const previousMonth = monthlyData[monthlyData.length - 2];
  const currentMonth = monthlyData[monthlyData.length - 1];

  const prevBalance = previousMonth?.balance ?? 0;
  const currBalance = currentMonth?.balance ?? 0;

  const momChange = prevBalance !== 0 ? ((currBalance - prevBalance) / Math.abs(prevBalance)) * 100 : 0;

  const incomeExpenseRatio = totalExpense > 0 ? totalIncome / totalExpense : 0;

  const biggestTransaction = transactions.reduce((maxTx, tx) => {
    if (!maxTx) return tx;
    return (Number(tx.amount) || 0) > (Number(maxTx.amount) || 0) ? tx : maxTx;
  }, null);

  return {
    topCategory,
    momChange,
    incomeExpenseRatio,
    biggestTransaction,
  };
};
