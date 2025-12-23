const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { db } = require('../database');

// Test route
router.get('/test', authenticate, (req, res) => {
  res.json({ 
    message: 'Transactions route is working',
    userId: req.userId 
  });
});

// Get balance
router.get('/balance', authenticate, (req, res) => {
  db.get(
    'SELECT balance FROM users WHERE id = ?',
    [req.userId],
    (err, user) => {
      if (err || !user) {
        return res.status(500).json({ error: 'Failed to fetch balance' });
      }
      res.json({ balance: user.balance });
    }
  );
});

// Get transaction history
router.get('/history', authenticate, (req, res) => {
  const userId = req.userId;

  db.all(
    `SELECT 
      al.*,
      s.username as sender_username,
      r.username as receiver_username
     FROM audit_logs al
     LEFT JOIN users s ON al.sender_id = s.id
     LEFT JOIN users r ON al.receiver_id = r.id
     WHERE al.sender_id = ? OR al.receiver_id = ?
     ORDER BY al.created_at DESC`,
    [userId, userId],
    (err, transactions) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch history' });
      }
      res.json(transactions);
    }
  );
});

// Transfer funds (simplified for testing)
router.post('/transfer', authenticate, (req, res) => {
  const { receiverId, amount } = req.body;
  const senderId = req.userId;

  // Input validation
  if (!receiverId || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid receiver ID or amount' });
  }

  if (senderId === parseInt(receiverId)) {
    return res.status(400).json({ error: 'Cannot transfer to yourself' });
  }

  // Start transaction
  db.run('BEGIN TRANSACTION', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to start transaction' });
    }

    // Check sender balance
    db.get('SELECT balance FROM users WHERE id = ?', [senderId], (err, sender) => {
      if (err) {
        db.run('ROLLBACK');
        return res.status(500).json({ error: 'Database error' });
      }

      if (!sender) {
        db.run('ROLLBACK');
        return res.status(404).json({ error: 'Sender not found' });
      }

      if (sender.balance < amount) {
        db.run('ROLLBACK');
        const failedTxId = `TXN${Date.now()}_FAILED`;
        db.run(
          'INSERT INTO audit_logs (transaction_id, sender_id, receiver_id, amount, status, error_message) VALUES (?, ?, ?, ?, ?, ?)',
          [failedTxId, senderId, receiverId, amount, 'failed', 'Insufficient funds']
        );
        return res.status(400).json({ error: 'Insufficient funds' });
      }

      // Debit from sender
      db.run(
        'UPDATE users SET balance = balance - ? WHERE id = ?',
        [amount, senderId],
        (err) => {
          if (err) {
            db.run('ROLLBACK');
            return res.status(500).json({ error: 'Failed to debit sender' });
          }

          // Credit to receiver
          db.run(
            'UPDATE users SET balance = balance + ? WHERE id = ?',
            [amount, receiverId],
            (err) => {
              if (err) {
                db.run('ROLLBACK');
                return res.status(500).json({ error: 'Failed to credit receiver' });
              }

              // Create audit log
              const txId = `TXN${Date.now()}`;
              db.run(
                'INSERT INTO audit_logs (transaction_id, sender_id, receiver_id, amount, status) VALUES (?, ?, ?, ?, ?)',
                [txId, senderId, receiverId, amount, 'success'],
                (err) => {
                  if (err) {
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: 'Failed to create audit log' });
                  }

                  // Commit transaction
                  db.run('COMMIT', (err) => {
                    if (err) {
                      console.error(err);
                      return res.status(500).json({ error: 'Failed to commit transaction' });
                    }

                    // Get updated balance
                    db.get(
                      'SELECT balance FROM users WHERE id = ?',
                      [senderId],
                      (err, updatedUser) => {
                        if (err) {
                          return res.status(500).json({ error: 'Failed to fetch updated balance' });
                        }

                        res.json({
                          message: 'Transfer successful',
                          transactionId: txId,
                          newBalance: updatedUser.balance
                        });
                      }
                    );
                  });
                }
              );
            }
          );
        }
      );
    });
  });
});

module.exports = router;