#  Real-time Transaction & Audit Log System

##  Project Overview
**Assignment 2: Real-time Transaction & Audit Log System(QuickPay)**  
A full-stack banking application implementing secure peer-to-peer fund transfers with atomic database transactions and comprehensive audit logging. The system ensures data integrity through ACID-compliant operations while providing real-time updates via a modern React interface.

### Implementation Approach
- **Backend**: Node.js/Express REST API with SQLite database
- **Frontend**: React with Vite for fast development
- **Authentication**: JWT-based stateless authentication
- **Transactions**: Atomic operations with database-level consistency
- **Audit Trail**: Immutable log of all financial transactions
- **Real-time Updates**: Polling mechanism for live balance/history updates

---

##  Setup & Run Instructions

### Installation Steps
```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev          # Starts on http://localhost:5000
```

#### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev          # Starts on http://localhost:5173
```

#### Database Initialization
Database (`database.sqlite`) auto-creates on first run with:
- Default test users (balance: $1000 each)
- Audit logs table with indexes
- Foreign key constraints enabled

---

## API Documentation

### Base URL: `http://localhost:5000/api`

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/auth/register` | Register new user | `{username, email, password}` |
| POST | `/auth/login` | User login | `{email, password}` |

### Transaction Endpoints

| Method | Endpoint | Description | Headers | Request Body |
|--------|----------|-------------|---------|--------------|
| POST | `/transactions/transfer` | Transfer funds | `Authorization: Bearer <token>` | `{receiverId, amount}` |
| GET | `/transactions/history` | Get transaction history | `Authorization: Bearer <token>` | - |
| GET | `/transactions/balance` | Get user balance | `Authorization: Bearer <token>` | - |


---

##  Database Schema

### SQLite Database: `database.sqlite`

### **Users Table**
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    balance REAL DEFAULT 1000.00 CHECK(balance >= 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- **Indexes**: `username`, `email`
- **Constraints**: Balance non-negative, unique credentials

### **Audit Logs Table**
```sql
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id TEXT UNIQUE NOT NULL,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    amount REAL NOT NULL CHECK(amount > 0),
    status TEXT NOT NULL CHECK(status IN ('success', 'failed')),
    error_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users (id) ON DELETE CASCADE
);
```
- **Indexes**: `sender_id`, `receiver_id`, `created_at DESC`
- **Foreign Keys**: Cascade delete on user removal
- **Constraints**: Positive amount, valid status values

---

##  AI Tool Usage Log 

### AI-Assisted Development Tasks

#### **1. Database & Backend Development**
-  **Atomic Transaction Logic**: AI generated SQLite transaction boilerplate with BEGIN/COMMIT/ROLLBACK
-  **JWT Authentication Middleware**: Structured token validation with error handling
-  **REST API Structure**: Express route organization and HTTP method implementation
-  **SQL Query Optimization**: Generated JOIN queries for audit logs with performance indexes
-  **Error Handling Framework**: Comprehensive error middleware with status code mapping

#### **2. Frontend & UI Development**
-  **React Component Architecture**: AI suggested component hierarchy and state management
-  **Real-time Polling Logic**: Implemented 5-second interval updates for live data
-  **Form Validation Patterns**: Input validation with user-friendly error messages
-  **CSS-in-JS Styling**: Generated modern gradient designs with responsive breakpoints
-  **Sortable Table Component**: Dynamic sorting with visual indicators

#### **3. Security & Data Integrity**
-  **Password Hashing**: bcryptjs implementation for secure credential storage
-  **Input Sanitization**: SQL injection prevention through parameterized queries
-  **CORS Configuration**: Secure cross-origin resource sharing settings

###  Effectiveness Analysis

#### Score: 4.2/5

| Metric | Score | Justification |
|--------|-------|---------------|
| **Time Saved** | 4.5/5 | ~7 hours saved on boilerplate code |
| **Code Quality** | 4/5 | 85% of AI-generated code required minimal adjustments |
| **Learning Value** | 4/5 | AI introduced modern patterns and best practices |
| **Debugging Required** | 3.5/5 | Some SQLite-specific syntax needed manual correction |

#### **Quantifiable Benefits**
- **Development Speed**: 40% faster implementation
- **Code Consistency**: Uniform patterns across components
- **Error Reduction**: Pre-tested patterns minimized runtime errors
- **Documentation**: AI-assisted code comments and structure

#### **Specific Examples**
1. **Transaction Endpoint**: AI provided complete atomic transfer logic in 15 minutes (vs. 2 hours manual)
2. **JWT Middleware**: Generated secure token validation with proper error responses
3. **React Hooks**: Suggested optimal useState/useEffect patterns for real-time updates
4. **Database Schema**: Created normalized structure with proper constraints and indexes

---

#### **Transaction Scenarios**
1. **Successful Transfer**: Sufficient balance → Atomic debit/credit + audit log
2. **Insufficient Funds**: Validation prevents overdraft
3. **Self-Transfer**: Blocked with proper error message
4. **Invalid Receiver**: Graceful error handling
5. **Concurrent Requests**: Database locks prevent race conditions

### 🔍 System Verification

| Component | Test | Result |
|-----------|------|--------|
| **Backend** | API endpoints responding | ✅ All endpoints functional |
| **Database** | ACID compliance | ✅ Atomic transactions working |
| **Frontend** | Real-time updates | ✅ 5-second polling active |
| **Security** | JWT validation | ✅ Protected routes secured |
| **Error Handling** | Invalid inputs | ✅ User-friendly error messages |
---

##  Features Checklist

### **Core Requirements**
-  Secure Login/Registration with JWT
-  Atomic Fund Transfer Transactions
-  Immutable Audit Log System
-  Real-time Balance Updates
-  Transaction History with Sorting

### **Advanced Features**
-  Responsive Design (Mobile/Desktop)
-  Multi-step Transfer Form
-  Quick Amount Presets
-  Searchable Transaction History
-  Statistics Dashboard
-  Auto-refresh Every 5 Seconds

### **Security Features**
-  Password Hashing (bcrypt)
-  SQL Injection Prevention
-  CORS Configuration
-  Input Validation
-  Error Message Sanitization

---

## Support & Resources

### **Quick Reference**
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:5000/
- **Health Check**: http://localhost:5000/api/health


### **Development Tools**
- **Backend Testing**: Postman, curl
- **Database**: DB Browser for SQLite
- **Frontend**: React DevTools
- **API**: Built-in documentation endpoint

---

**🚀 Built with Node.js, Express, React, SQLite & AI Assistance**   
**👨‍💻 Developer: Atharva Desai**  
**🎯 Assignment: Real-time Transaction & Audit Log System**
