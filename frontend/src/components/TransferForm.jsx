import React, { useState } from 'react';

const TransferForm = ({ onTransfer, balance }) => {
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const quickAmounts = [10, 25, 50, 100, 250];

  const validateInput = () => {
    setError('');
    
    if (!receiverId || !amount) {
      setError('Please fill all fields');
      return false;
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    
    if (numAmount > balance) {
      setError(`Amount exceeds your balance of $${balance.toFixed(2)}`);
      return false;
    }
    
    if (numAmount < 0.01) {
      setError('Minimum transfer amount is $0.01');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInput()) return;
    
    setLoading(true);
    try {
      await onTransfer(receiverId, parseFloat(amount));
      setReceiverId('');
      setAmount('');
      setStep(1);
    } catch (err) {
      // Error is handled in parent component
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
    setStep(2);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)'
        }}>
          <span style={{ fontSize: '1.25rem', color: 'white' }}>💸</span>
        </div>
        <div>
          <h2 style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '0.125rem'
          }}>
            Transfer Funds
          </h2>
          <p style={{ color: '#718096', fontSize: '0.75rem' }}>
            Send money securely to anyone
          </p>
        </div>
      </div>

      {/* Balance Card */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '1rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '0.75rem',
            opacity: 0.9,
            marginBottom: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>💰</span>
            Available Balance
          </div>
          <div style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            marginBottom: '0.25rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            ${balance.toFixed(2)}
          </div>
          <div style={{
            fontSize: '0.75rem',
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#48bb78'
            }} />
            Ready to transfer
          </div>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fff5f5',
          color: '#c53030',
          padding: '0.75rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          borderLeft: '3px solid #c53030',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem'
        }}>
          <span>⚠️</span>
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Quick Amounts */}
        {step === 1 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#4a5568',
                fontSize: '0.75rem'
              }}>
                 Enter Amount
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#a0aec0',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  $
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setStep(e.target.value ? 2 : 1);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  step="0.01"
                  min="0.01"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => amount && setStep(2)}
              disabled={!amount}
              style={{
                width: '100%',
                background: amount
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#e2e8f0',
                color: amount ? 'white' : '#a0aec0',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: amount ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <span>👉</span>
              Continue to Receiver
            </button>
          </div>
        )}

        {/* Receiver Details */}
        {(step === 2 || step === 3) && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#4a5568'
              }}>
                Receiver Details
              </h3>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  background: 'transparent',
                  color: '#667eea',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                ← Back
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#4a5568',
                fontSize: '0.75rem'
              }}>
                Receiver ID
              </label>
              <input
                type="number"
                placeholder="Enter receiver's user ID"
                value={receiverId}
                onChange={(e) => {
                  setReceiverId(e.target.value);
                  setStep(e.target.value && amount ? 3 : 2);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                min="1"
                step="1"
              />
            </div>

            {step === 3 && (
              <div style={{
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Transfer Summary
                </h4>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#718096', fontSize: '0.75rem' }}>
                      Amount
                    </span>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#2d3748'
                    }}>
                      ${parseFloat(amount).toFixed(2)}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#718096', fontSize: '0.75rem' }}>
                      Receiver ID
                    </span>
                    <span style={{
                      fontWeight: '600',
                      color: '#2d3748',
                      fontSize: '0.875rem'
                    }}>
                      {receiverId}
                    </span>
                  </div>
                  
                  <div style={{
                    height: '1px',
                    backgroundColor: '#e2e8f0',
                    margin: '0.25rem 0'
                  }} />
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#4a5568', fontWeight: '600', fontSize: '0.875rem' }}>
                      Total
                    </span>
                    <span style={{
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      color: '#2d3748'
                    }}>
                      ${parseFloat(amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              type={step === 3 ? 'submit' : 'button'}
              onClick={step === 2 ? () => setStep(3) : undefined}
              disabled={loading || !receiverId || !amount}
              style={{
                width: '100%',
                background: loading
                  ? '#e2e8f0'
                  : 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {step === 3 ? '🚀' : '👉'}
                  </span>
                  <span>{step === 3 ? 'Confirm & Transfer' : 'Continue'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>

      {/* Security Info */}
      <div style={{
        marginTop: '1.5rem',
        padding: '0.75rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#c6f6d5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <span style={{ fontSize: '1rem', color: '#22543d' }}>🔒</span>
          </div>
          <div>
            <div style={{
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '0.125rem',
              fontSize: '0.875rem'
            }}>
              Secure & Protected
            </div>
            <div style={{
              color: '#718096',
              fontSize: '0.75rem',
              lineHeight: 1.4
            }}>
              All transactions are encrypted and processed with atomic operations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;