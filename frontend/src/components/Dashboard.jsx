import React, { useState, useEffect } from 'react';
import TransferForm from './TransferForm';
import TransactionTable from './TransactionTable';
import { transactionAPI } from '../services/api';

/* =======================
   COMMON STYLES
======================= */
const pageContainer = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
  padding: '2rem'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '1.75rem',
  boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
  border: '1px solid #e2e8f0'
};

const Dashboard = ({ user, onLogout }) => {
  const [balance, setBalance] = useState(user.balance || 0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchData = async () => {
    try {
      const [historyRes, balanceRes] = await Promise.all([
        transactionAPI.getHistory(),
        transactionAPI.getBalance()
      ]);

      setTransactions(historyRes.data);
      setBalance(balanceRes.data.balance);
      setError('');
    } catch {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTransfer = async (receiverId, amount) => {
    try {
      setError('');
      setSuccessMessage('');

      const res = await transactionAPI.transfer({ receiverId, amount });
      setBalance(res.data.newBalance);

      setSuccessMessage(
        `Transfer successful! Transaction ID: ${res.data.transactionId}`
      );

      setTimeout(fetchData, 1000);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.error || 'Transfer failed.');
      throw err;
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        Loading Dashboard...
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div style={pageContainer}>

      {/* ================= HEADER ================= */}
      <header style={{
        ...cardStyle,
        padding: '1.1rem 1.5rem',   // ⬅ reduced padding
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem'    // ⬅ reduced margin
      }}>
        {/* LEFT */}
        <div>
          <h1 style={{
            fontSize: '1.9rem',
            fontWeight: '800',
            margin: 0,
            color: '#2d3748'
          }}>
            QuickPay
          </h1>

          <div style={{ marginTop: '0.25rem' }}>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: '700',   // ⬅ bold username
              color: '#4a5568'
            }}>
              {user.username}
            </div>

            <div style={{
              fontSize: '0.95rem',
              fontWeight: '700',   // ⬅ bold email
              color: '#718096'
            }}>
              {user.email}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: '700',   // ⬅ bold label
            color: '#718096',
            marginBottom: '0.1rem'
          }}>
            Available Balance
          </div>

          <div style={{
            fontSize: '2.3rem',  // ⬅ slightly smaller
            fontWeight: '900',
            color: '#4c51bf'
          }}>
            ${balance.toFixed(2)}
          </div>

          <button
            onClick={onLogout}
            style={{
              marginTop: '0.6rem',   // ⬅ reduced space
              padding: '0.55rem 1.3rem',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ================= MESSAGES ================= */}
      {error && (
        <div style={{ ...cardStyle, color: '#c53030', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div style={{ ...cardStyle, color: '#22543d', marginBottom: '1rem' }}>
          {successMessage}
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        <div style={cardStyle}>
          <h3 style={{ marginBottom: '1rem' }}>Recent Transactions</h3>
          <TransactionTable
            transactions={recentTransactions}
            currentUserId={user.id}
          />
        </div>

        <div style={cardStyle}>
          <h3 style={{ marginBottom: '1rem' }}>Transfer Funds</h3>
          <TransferForm
            onTransfer={handleTransfer}
            balance={balance}
          />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
