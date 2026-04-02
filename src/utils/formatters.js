import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount, currency = 'USD') => {
  const value = Number(amount) || 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (isoString, pattern = 'MMM d, yyyy') => {
  if (!isoString) return '';

  const date = parseISO(isoString);
  if (Number.isNaN(date.getTime())) return '';

  return format(date, pattern);
};

export const formatPercent = (value, decimals = 1) => {
  const numericValue = Number(value) || 0;

  return `${numericValue.toFixed(decimals)}%`;
};

export const formatShortNumber = (n) => {
  const value = Number(n) || 0;
  const abs = Math.abs(value);

  if (abs >= 1_000_000_000) {
    const short = value / 1_000_000_000;
    return `${Number.isInteger(short) ? short : short.toFixed(1)}B`;
  }

  if (abs >= 1_000_000) {
    const short = value / 1_000_000;
    return `${Number.isInteger(short) ? short : short.toFixed(1)}M`;
  }

  if (abs >= 1_000) {
    const short = value / 1_000;
    return `${Number.isInteger(short) ? short : short.toFixed(1)}k`;
  }

  return `${value}`;
};
