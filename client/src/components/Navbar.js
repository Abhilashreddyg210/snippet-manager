import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav style={{ padding: '1rem', background: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
      <h2 style={{ color: 'var(--text-primary)' }}>Code Snippet Manager</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={toggleTheme} 
          style={{ 
            padding: '0.5rem', 
            background: 'transparent', 
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        {user ? (
          <>
            <span style={{ color: 'var(--text-primary)' }}>Welcome, {user.username}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <a href="/login" style={{ marginRight: '1rem', color: 'var(--text-primary)' }}>Login</a>
            <a href="/register" style={{ color: 'var(--text-primary)' }}>Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;