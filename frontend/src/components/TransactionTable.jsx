import React, { useState } from 'react';

const TransactionTable = ({ transactions, currentUserId }) => {
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      tx.transaction_id.toLowerCase().includes(searchLower) ||
      tx.sender_username?.toLowerCase().includes(searchLower) ||
      tx.receiver_username?.toLowerCase().includes(searchLower) ||
      tx.amount.toString().includes(searchTerm) ||
      tx.status.toLowerCase().includes(searchLower)
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aVal, bVal;
    
    switch (sortBy) {
      case 'amount':
        aVal = parseFloat(a.amount);
        bVal = parseFloat(b.amount);
        break;
      case 'created_at':
        aVal = new Date(a.created_at).getTime();
        bVal = new Date(b.created_at).getTime();
        break;
      case 'status':
        aVal = a.status;
        bVal = b.status;
        break;
      default:
        aVal = a[sortBy];
        bVal = b[sortBy];
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionType = (transaction) => {
    return transaction.sender_id === currentUserId ? 'Sent' : 'Received';
  };

  const getTransactionParty = (transaction) => {
    return transaction.sender_id === currentUserId
      ? transaction.receiver_username
      : transaction.sender_username;
  };

  const getTransactionIcon = (transaction) => {
    if (transaction.sender_id === currentUserId) {
      return transaction.status === 'success' ? '📤' : '❌';
    } else {
      return transaction.status === 'success' ? '📥' : '⚠️';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0'
    }}>
      {/* Header - Smaller */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.125rem' }}>📋</span>
            Transaction History
          </h2>
          <p style={{ color: '#718096', fontSize: '0.75rem' }}>
            All your transactions in one place
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem 0.5rem 2rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                width: '180px',
                transition: 'all 0.3s ease',
                outline: 'none',
                backgroundColor: '#f8fafc'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.backgroundColor = '#f8fafc';
              }}
            />
            <span style={{
              position: 'absolute',
              left: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#a0aec0',
              fontSize: '0.875rem'
            }}>
              🔍
            </span>
          </div>

          <div style={{
            backgroundColor: '#f7fafc',
            padding: '0.375rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            color: '#718096',
            fontWeight: '500'
          }}>
            {sortedTransactions.length} transactions
          </div>
        </div>
      </div>

      {sortedTransactions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem 1rem',
          color: '#718096'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📭</span>
          </div>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#4a5568',
            marginBottom: '0.25rem'
          }}>
            No transactions found
          </h3>
          <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
            {searchTerm ? 'Try a different search term' : 'Your transaction history will appear here'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table - Smaller */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem'
            }}>
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: '#f8fafc',
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#718096',
                      borderBottom: '2px solid #e2e8f0',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#edf2f7'
                      }
                    }}
                    onClick={() => handleSort('created_at')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>Date</span>
                      {sortBy === 'created_at' && (
                        <span style={{ fontSize: '0.875rem' }}>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  
                  <th style={{
                    backgroundColor: '#f8fafc',
                    padding: '0.75rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#718096',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Transaction ID
                  </th>
                  
                  <th style={{
                    backgroundColor: '#f8fafc',
                    padding: '0.75rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#718096',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Type / Party
                  </th>
                  
                  <th
                    style={{
                      backgroundColor: '#f8fafc',
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#718096',
                      borderBottom: '2px solid #e2e8f0',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#edf2f7'
                      }
                    }}
                    onClick={() => handleSort('amount')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>Amount</span>
                      {sortBy === 'amount' && (
                        <span style={{ fontSize: '0.875rem' }}>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  
                  <th
                    style={{
                      backgroundColor: '#f8fafc',
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#718096',
                      borderBottom: '2px solid #e2e8f0',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#edf2f7'
                      }
                    }}
                    onClick={() => handleSort('status')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>Status</span>
                      {sortBy === 'status' && (
                        <span style={{ fontSize: '0.875rem' }}>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              
              <tbody>
                {sortedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    style={{
                      transition: 'all 0.2s ease',
                      borderBottom: '1px solid #f1f1f1',
                      '&:hover': {
                        backgroundColor: '#f8fafc'
                      },
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <td style={{
                      padding: '0.75rem',
                      color: '#718096',
                      fontSize: '0.875rem',
                      borderBottom: '1px solid #f1f1f1'
                    }}>
                      <div style={{ fontWeight: '500', color: '#4a5568' }}>
                        {formatDate(tx.created_at)}
                      </div>
                    </td>
                    
                    <td style={{
                      padding: '0.75rem',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      color: '#718096',
                      borderBottom: '1px solid #f1f1f1'
                    }}>
                      <div style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tx.transaction_id}
                      </div>
                    </td>
                    
                    <td style={{
                      padding: '0.75rem',
                      borderBottom: '1px solid #f1f1f1'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: tx.sender_id === currentUserId
                            ? '#fed7d7'
                            : '#c6f6d5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          flexShrink: 0
                        }}>
                          {getTransactionIcon(tx)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontWeight: '600',
                            color: '#2d3748',
                            marginBottom: '0.125rem',
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {getTransactionType(tx)}
                          </div>
                          <div style={{
                            color: '#718096',
                            fontSize: '0.75rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            to/from {getTransactionParty(tx)}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td style={{
                      padding: '0.75rem',
                      borderBottom: '1px solid #f1f1f1',
                      fontWeight: '700',
                      color: tx.sender_id === currentUserId ? '#c53030' : '#38a169',
                      fontSize: '0.875rem'
                    }}>
                      {tx.sender_id === currentUserId ? '-' : '+'}${parseFloat(tx.amount).toFixed(2)}
                    </td>
                    
                    <td style={{
                      padding: '0.75rem',
                      borderBottom: '1px solid #f1f1f1'
                    }}>
                      <span style={{
                        backgroundColor: tx.status === 'success' ? '#c6f6d5' : '#fed7d7',
                        color: tx.status === 'success' ? '#22543d' : '#c53030',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.125rem'
                      }}>
                        {tx.status === 'success' ? '✅' : '❌'}
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {sortedTransactions.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{ color: '#718096', fontSize: '0.75rem' }}>
            Showing {sortedTransactions.length} of {transactions.length} transactions
          </div>
          
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              style={{
                padding: '0.375rem 0.75rem',
                backgroundColor: '#f7fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                color: '#4a5568'
              }}
            >
              ← Previous
            </button>
            <button
              style={{
                padding: '0.375rem 0.75rem',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;