// ====================
// STYLES.JS
// Complete styling system for Transaction System
// ====================

export const styles = {
  // ============ LAYOUT & CONTAINERS ============
  container: {
    minHeight: '100vh',
    padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    flexDirection: 'column',
  },

  mainContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    flex: 1,
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
    gap: { xs: '1rem', md: '2rem' },
    marginTop: '2rem',
  },

  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

  // ============ CARDS & SURFACES ============
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: { xs: '1.5rem', md: '2rem' },
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
      transform: 'translateY(-5px)',
    },
  },

  glassCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)',
    padding: '2rem',
  },

  // ============ TYPOGRAPHY ============
  h1: {
    fontSize: { xs: '2rem', md: '2.5rem' },
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
  },

  h2: {
    fontSize: { xs: '1.5rem', md: '1.75rem' },
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1rem',
  },

  h3: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '0.75rem',
  },

  bodyText: {
    fontSize: '1rem',
    color: '#718096',
    lineHeight: 1.6,
  },

  smallText: {
    fontSize: '0.875rem',
    color: '#a0aec0',
  },

  // ============ BUTTONS ============
  primaryButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '0.875rem 1.75rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },

  secondaryButton: {
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: '#667eea',
      color: 'white',
      transform: 'translateY(-2px)',
    },
  },

  dangerButton: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(255, 107, 107, 0.4)',
    },
  },

  successButton: {
    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(72, 187, 120, 0.4)',
    },
  },

  iconButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7fafc',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#edf2f7',
      transform: 'scale(1.1)',
    },
  },

  // ============ INPUTS & FORMS ============
  input: {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    '&:focus': {
      outline: 'none',
      borderColor: '#667eea',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)',
    },
    '&::placeholder': {
      color: '#a0aec0',
    },
    '&:disabled': {
      backgroundColor: '#f7fafc',
      cursor: 'not-allowed',
    },
  },

  inputGroup: {
    position: 'relative',
    width: '100%',
  },

  inputIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
  },

  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#4a5568',
    fontSize: '0.875rem',
  },

  formGroup: {
    marginBottom: '1.5rem',
  },

  // ============ ALERTS & MESSAGES ============
  successAlert: {
    backgroundColor: '#f0fff4',
    color: '#22543d',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    borderLeft: '5px solid #38a169',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    animation: 'slideIn 0.3s ease',
  },

  errorAlert: {
    backgroundColor: '#fff5f5',
    color: '#c53030',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    borderLeft: '5px solid #c53030',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    animation: 'slideIn 0.3s ease',
  },

  warningAlert: {
    backgroundColor: '#fffbeb',
    color: '#b45309',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    borderLeft: '5px solid #ed8936',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  infoAlert: {
    backgroundColor: '#ebf8ff',
    color: '#2c5282',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    borderLeft: '5px solid #4299e1',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  // ============ TABLES ============
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },

  tableHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1rem 1.25rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    },
  },

  tableCell: {
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#4a5568',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },

  tableRow: {
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f8fafc',
      transform: 'scale(1.002)',
    },
    '&:last-child td': {
      borderBottom: 'none',
    },
  },

  // ============ BADGES & TAGS ============
  successBadge: {
    backgroundColor: '#c6f6d5',
    color: '#22543d',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  },

  errorBadge: {
    backgroundColor: '#fed7d7',
    color: '#c53030',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  },

  warningBadge: {
    backgroundColor: '#feebc8',
    color: '#b45309',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  },

  infoBadge: {
    backgroundColor: '#bee3f8',
    color: '#2c5282',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  },

  // ============ LOADERS & SKELETONS ============
  spinner: {
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #667eea',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },

  skeleton: {
    backgroundColor: '#e2e8f0',
    backgroundImage: 'linear-gradient(90deg, #e2e8f0 0%, #f7fafc 50%, #e2e8f0 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '8px',
  },

  // ============ AVATARS & ICONS ============
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '1.25rem',
    color: 'white',
  },

  avatarSmall: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '0.875rem',
    color: 'white',
  },

  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '1.5rem',
  },

  // ============ MODALS & OVERLAYS ============
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
  },

  modal: {
    background: 'white',
    borderRadius: '20px',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
    animation: 'modalSlideIn 0.3s ease',
  },

  // ============ STATS & METRICS ============
  statCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#667eea',
      transform: 'translateY(-5px)',
    },
  },

  statValue: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '0.25rem',
  },

  statLabel: {
    fontSize: '0.875rem',
    color: '#718096',
    fontWeight: '500',
  },

  // ============ NAVIGATION ============
  navBar: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  navItem: {
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    color: '#4a5568',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
      color: '#667eea',
    },
    '&.active': {
      backgroundColor: '#667eea',
      color: 'white',
    },
  },

  // ============ UTILITY CLASSES ============
  textCenter: {
    textAlign: 'center',
  },

  textRight: {
    textAlign: 'right',
  },

  textLeft: {
    textAlign: 'left',
  },

  fullWidth: {
    width: '100%',
  },

  fullHeight: {
    height: '100%',
  },

  hidden: {
    display: 'none',
  },

  visible: {
    display: 'block',
  },

  // ============ MARGINS & PADDINGS ============
  m0: { margin: 0 },
  m1: { margin: '0.25rem' },
  m2: { margin: '0.5rem' },
  m3: { margin: '1rem' },
  m4: { margin: '1.5rem' },
  m5: { margin: '2rem' },

  mt0: { marginTop: 0 },
  mt1: { marginTop: '0.25rem' },
  mt2: { marginTop: '0.5rem' },
  mt3: { marginTop: '1rem' },
  mt4: { marginTop: '1.5rem' },
  mt5: { marginTop: '2rem' },

  mb0: { marginBottom: 0 },
  mb1: { marginBottom: '0.25rem' },
  mb2: { marginBottom: '0.5rem' },
  mb3: { marginBottom: '1rem' },
  mb4: { marginBottom: '1.5rem' },
  mb5: { marginBottom: '2rem' },

  p0: { padding: 0 },
  p1: { padding: '0.25rem' },
  p2: { padding: '0.5rem' },
  p3: { padding: '1rem' },
  p4: { padding: '1.5rem' },
  p5: { padding: '2rem' },

  // ============ ANIMATIONS ============
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },

  '@keyframes slideIn': {
    '0%': { transform: 'translateY(-10px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },

  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },

  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },

  '@keyframes modalSlideIn': {
    '0%': { transform: 'translateY(-20px) scale(0.95)', opacity: 0 },
    '100%': { transform: 'translateY(0) scale(1)', opacity: 1 },
  },

  '@keyframes pulse': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.5 },
    '100%': { opacity: 1 },
  },

  // ============ RESPONSIVE BREAKPOINTS ============
  breakpoints: {
    xs: '@media (max-width: 600px)',
    sm: '@media (min-width: 601px) and (max-width: 960px)',
    md: '@media (min-width: 961px) and (max-width: 1280px)',
    lg: '@media (min-width: 1281px)',
  },

  // ============ COLOR PALETTE ============
  colors: {
    primary: '#667eea',
    primaryDark: '#5a67d8',
    secondary: '#764ba2',
    success: '#48bb78',
    error: '#f56565',
    warning: '#ed8936',
    info: '#4299e1',
    light: '#f7fafc',
    dark: '#2d3748',
    gray: {
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },
  },

  // ============ SHADOWS ============
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 25px rgba(0,0,0,0.1)',
    xl: '0 20px 50px rgba(0,0,0,0.15)',
    inner: 'inset 0 2px 4px rgba(0,0,0,0.06)',
  },

  // ============ BORDER RADIUS ============
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    full: '9999px',
  },

  // ============ TRANSITIONS ============
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// ============ HELPER FUNCTIONS ============
export const styleUtils = {
  // Merge multiple style objects
  mergeStyles: (...styleObjects) => {
    return Object.assign({}, ...styleObjects);
  },

  // Create responsive styles
  responsive: (breakpoint, style) => {
    return {
      [styles.breakpoints[breakpoint]]: style,
    };
  },

  // Generate random gradient
  randomGradient: () => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  },

  // Format currency
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  },

  // Format date
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Truncate text
  truncateText: (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
};

// ============ COMPONENT-SPECIFIC STYLES ============
export const componentStyles = {
  // Login Component
  loginContainer: {
    ...styles.container,
    ...styles.flexCenter,
  },

  loginCard: {
    ...styles.card,
    width: '100%',
    maxWidth: '420px',
    animation: 'fadeIn 0.5s ease',
  },

  loginHeader: {
    ...styles.textCenter,
    marginBottom: '2rem',
  },

  // Dashboard Component
  dashboardHeader: {
    ...styles.flexBetween,
    marginBottom: '2rem',
    padding: '1.5rem',
    ...styles.glassCard,
  },

  balanceDisplay: {
    ...styles.textCenter,
    padding: '2rem',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    marginBottom: '2rem',
  },

  // Transfer Form
  transferForm: {
    ...styles.card,
    position: 'relative',
    overflow: 'hidden',
  },

  quickAmounts: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },

  // Transaction Table
  transactionRow: {
    ...styles.tableRow,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },

  transactionTypeIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
  },
};

// Default export
export default styles;