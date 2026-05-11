import React from 'react';

interface AuthSplitLayoutProps {
  children: React.ReactNode;
}

export default function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="auth-layout">
      <style>{`
        .auth-layout {
          min-height: 100vh;
          display: flex;
        }
        .auth-left {
          flex: 0 0 42%;
          background-color: #1a3a5c;
          display: flex;
          flex-direction: column;
          padding: 32px 40px;
        }
        .auth-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          padding: 40px 24px;
        }
        .auth-right-content {
          width: 100%;
          max-width: 360px;
        }
        @media (max-width: 800px) {
          .auth-left {
            display: none;
          }
        }
      `}</style>
      
      {/* Left blue panel */}
      <div className="auth-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'auto' }}>
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: 'rgba(255,255,255,0.25)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>BRAND</span>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 60 }}>
          <p style={{ color: '#fff', fontSize: 20, fontWeight: 700, lineHeight: 1.4, marginBottom: 16 }}>
            "Your Gateway to Unforgettable Live Experiences."
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.7 }}>
            Join our platform to discover exclusive concerts, secure the best seats, and manage your tickets with ease. Whether you're a passionate fan or an event organizer, our system provides the tools you need for a seamless ticketing experience.
          </p>
        </div>
      </div>

      {/* Right white panel */}
      <div className="auth-right">
        <div className="auth-right-content">
          {children}
        </div>
      </div>
    </div>
  );
}
