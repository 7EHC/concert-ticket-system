'use client';

import { useRouter } from 'next/navigation';

export default function SelectAccessLevel() {
  const router = useRouter();

  const handleEnterUser = () => {
    router.push('/auth/login?role=user');
  };

  const handleEnterAdmin = () => {
    router.push('/auth/login?role=admin');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <style>{`
        .header {
          position: absolute;
          top: 0;
          left: 0;
          padding: 32px 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10;
          width: 100%;
        }
        .logo-circle {
          width: 20px;
          height: 20px;
          background-color: #0074a6;
          border-radius: 50%;
        }
        .logo-text {
          font-weight: 700;
          font-size: 16px;
          color: #0074a6;
          letter-spacing: 0.5px;
        }
        
        .main-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 100px 20px 40px;
        }

        .title-section {
          text-align: center;
          margin-bottom: 56px;
        }
        .main-title {
          font-size: 36px;
          font-weight: 800;
          color: #000;
          margin-bottom: 12px;
        }
        .subtitle {
          color: #111;
          font-size: 15px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 900px;
          width: 100%;
        }

        .card {
          border-radius: 8px;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .user-card {
          background-color: #ffffff;
        }

        .admin-card {
          background-color: #0074a6;
        }

        .icon-wrapper {
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .user-card .card-title {
          color: #0074a6;
        }

        .admin-card .card-title {
          color: #ffffff;
        }

        .card-desc {
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 40px;
          flex: 1;
        }

        .user-card .card-desc {
          color: #0074a6;
        }

        .admin-card .card-desc {
          color: #e0f2fe;
        }

        .action-btn {
          width: 100%;
          padding: 14px 0;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          transition: opacity 0.2s;
        }

        .action-btn:hover {
          opacity: 0.9;
        }

        .user-btn {
          background-color: #0074a6;
          color: #ffffff;
        }

        .admin-btn {
          background-color: #ffffff;
          color: #0074a6;
        }

        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .main-title {
            font-size: 28px;
          }
          .card {
            padding: 32px 24px;
          }
          .header {
            padding: 24px 20px;
          }
        }
      `}</style>

      {/* Brand Logo */}
      <header className="header">
        <div className="logo-circle" />
        <span className="logo-text">BRAND</span>
      </header>

      <main className="main-container">
        <div className="title-section">
          <h1 className="main-title">Select Access Level</h1>
          <p className="subtitle">Choose your workspace to get started with the Concert Ticketing System.</p>
        </div>

        <div className="cards-grid">
          {/* User Card */}
          <div className="card user-card">
            <div className="icon-wrapper">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0074a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M16 16c0-2-2-3-4-3s-4 1-4 3" />
              </svg>
            </div>
            <h2 className="card-title">User</h2>
            <p className="card-desc">
              Browse upcoming events, reserve your favorite seats, and effortlessly manage your reservations all in one place.
            </p>
            <button className="action-btn user-btn" onClick={handleEnterUser}>
              Enter Workspace <span>→</span>
            </button>
          </div>

          {/* Admin Card */}
          <div className="card admin-card">
            <div className="icon-wrapper">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
                <circle cx="19" cy="11" r="3" />
              </svg>
            </div>
            <h2 className="card-title">Administrator</h2>
            <p className="card-desc">
              Access the management dashboard to oversee concert schedules, monitor ticket sales, and control system settings.
            </p>
            <button className="action-btn admin-btn" onClick={handleEnterAdmin}>
              Enter Portal <span>→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
