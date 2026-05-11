import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  role: 'admin' | 'user';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const title = role === 'admin' ? 'Admin' : 'User';

  const handleSwitch = () => {
    logout();
    const targetRole = role === 'admin' ? 'user' : 'admin';
    window.location.href = `/auth/login?role=${targetRole}`;
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 24px',
    fontSize: 15,
    color: isActive ? '#1a3a5c' : '#444',
    backgroundColor: isActive ? '#e8f0fe' : 'transparent',
    textDecoration: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontWeight: isActive ? 600 : 500,
    transition: 'all 0.2s',
  });

  return (
    <>
      <style>{`
        .sidebar {
          width: 240px;
          background-color: #ffffff;
          padding: 40px 0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          flex-shrink: 0;
          border-right: 1px solid #e5e7eb;
        }
        .sidebar-header {
          padding: 0 32px 48px;
        }
        .sidebar-title {
          font-size: 28px;
          font-weight: 800;
          color: #111;
          margin: 0;
        }
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 32px;
          font-size: 15px;
          text-decoration: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #4b5563;
          font-weight: 500;
        }
        .nav-item:hover {
          background-color: #f3f4f6;
        }
        .nav-item.active {
          color: #0074a6;
          background-color: #e0f2fe;
          font-weight: 600;
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          font-size: 15px;
          color: #4b5563;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-weight: 600;
          margin-top: auto;
          transition: background-color 0.2s;
        }
        .logout-btn:hover {
          background-color: #f3f4f6;
          color: #111;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            padding: 16px 20px;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            flex-direction: column;
          }
          .sidebar-header {
            padding: 0 0 16px 0;
          }
          .sidebar-nav {
            flex-direction: row;
            overflow-x: auto;
            gap: 8px;
            padding-bottom: 8px;
          }
          .nav-item {
            width: auto;
            padding: 8px 16px;
            border-radius: 20px;
            white-space: nowrap;
          }
          .logout-btn {
            display: none; /* In real app, put logout in a dropdown or top corner. We'll add a simplified logout next to the title on mobile */
          }
          .mobile-top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .logout-icon-btn {
            background: none;
            border: none;
            color: #ef4444;
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
          }
        }
        @media (min-width: 769px) {
          .mobile-top-bar {
            display: block; /* Normal header on desktop */
          }
          .logout-icon-btn {
            display: none;
          }
        }
      `}</style>
      <div className="sidebar">
        <div className="sidebar-header mobile-top-bar">
          <h2 className="sidebar-title">{title}</h2>
          <button className="logout-icon-btn" onClick={handleLogout} title="Logout">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => router.push(`/${role}/home`)}
            className={`nav-item ${pathname.includes('/home') ? 'active' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </button>

          {role === 'admin' && (
            <button
              onClick={() => router.push('/admin/history')}
              className={`nav-item ${pathname.includes('/history') ? 'active' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 8v13H3V8" />
                <path d="M1 3h22v5H1z" />
                <path d="M10 12h4" />
              </svg>
              History
            </button>
          )}

          <button onClick={handleSwitch} className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L21 10M3 14l2.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Switch to {role === 'admin' ? 'User' : 'Admin'}
          </button>
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
}
