import React from 'react';

interface AuthSplitLayoutProps {
  children: React.ReactNode;
}

export default function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left blue panel */}
      <div
        style={{
          flex: '0 0 42%',
          backgroundColor: '#1a3a5c',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 40px',
        }}
      >
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
            &ldquo;Powering the tools that power the team.&rdquo;
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.7 }}>
            Lorem ipsum dolor sit amet consectetur. Elit porua nam gravida portitor nibh urns sit
            ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci
            sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.
          </p>
        </div>
      </div>

      {/* Right white panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: '40px 56px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 360 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
