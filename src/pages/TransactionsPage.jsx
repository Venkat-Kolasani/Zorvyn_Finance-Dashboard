import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Navbar } from '../components/layout';
import { 
  FilterBar, 
  TransactionsTable, 
  AddTransactionModal 
} from '../components/transactions';
import { Button } from '../components/ui';
import useFinanceStore from '../store/useFinanceStore';
import '../components/layout/PageWrapper.css';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const role = useFinanceStore((state) => state.role);
  const filteredTransactions = useFinanceStore((state) => state.filteredTransactions);
  const isAdmin = role === 'admin';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleOpenAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Merchant', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(tx => [
      tx.date, 
      `"${(tx.description || '').replace(/"/g, '""')}"`, 
      `"${(tx.merchant || '').replace(/"/g, '""')}"`, 
      tx.category, 
      tx.type, 
      tx.amount
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-wrapper">
      <Navbar title="Transactions" />
      <main className="page-content">
        <div className="transactions-page-content">
          <div className="transactions-page-header">
            <h2 className="transactions-page-title">Transactions</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="ghost" onClick={exportCSV}>
                <Download size={16} className="mr-2" />
                Export CSV
              </Button>
              {isAdmin && (
                <Button onClick={handleOpenAdd} className="add-transaction-btn">
                  <Plus size={16} className="mr-2" />
                  Add Transaction
                </Button>
              )}
            </div>
          </div>

          <FilterBar />

          <TransactionsTable onEdit={handleOpenEdit} />
        </div>

        <AddTransactionModal
          key={`${isModalOpen}-${editingTransaction?.id ?? 'new'}`}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editTransaction={editingTransaction}
        />
      </main>
    </div>
  );
};

export default TransactionsPage;
