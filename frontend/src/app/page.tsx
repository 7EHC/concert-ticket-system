'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function SelectAccessLevel() {
  const { setMockUser } = useAuth();
  const router = useRouter();

  const handleEnterUser = () => {
    router.push('/auth/login?role=user');
  };

  const handleEnterAdmin = () => {
    router.push('/auth/login?role=admin');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {/* Brand Logo - Fixed Position */}
      <div
        style={{
          position: 'fixed',
          top: 32,
          left: 40,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: '#006699',
            borderRadius: '50%',
          }}
        />
        <span style={{ fontWeight: 700, fontSize: 16, color: '#006699', letterSpacing: '0.5px' }}>BRAND</span>
      </div>

      {/* Main Title - Overlay */}
      <div style={{ 
        position: 'absolute', 
        top: '15%', 
        left: '50%', 
        transform: 'translateX(-50%)',
        textAlign: 'center',
        width: '100%',
        pointerEvents: 'none'
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#111', marginBottom: 8 }}>Select Access Level</h1>
        <p style={{ color: '#666', fontSize: 14 }}>Explore upcoming concerts and reserve your seat.</p>
      </div>

      {/* Left Side: User */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#fff', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 40px'
      }}>
        <div style={{ maxWidth: 320, textAlign: 'center' }}>
          <div style={{ 
            width: 80, 
            height: 80, 
            backgroundColor: '#fff', 
            border: '1px solid #e0e0e0',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006699" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 12 }}>User</h2>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 32 }}>
            Reserve your favorite seats for the most exciting concerts. View your booking history and manage your tickets.
          </p>
          <button
            onClick={handleEnterUser}
            style={{
              width: '100%',
              padding: '12px 0',
              backgroundColor: '#006699',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background-color 0.2s'
            }}
          >
            Enter Workspace <span style={{ fontSize: 18 }}>→</span>
          </button>
        </div>
      </div>

      {/* Right Side: Admin */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#006699', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 40px'
      }}>
        <div style={{ maxWidth: 320, textAlign: 'center', color: '#fff' }}>
          <div style={{ 
            width: 80, 
            height: 80, 
            backgroundColor: 'transparent', 
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Administrator</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 32 }}>
            Full control over concert management, ticket inventory, and administrative insights.
          </p>
          <button
            onClick={handleEnterAdmin}
            style={{
              width: '100%',
              padding: '12px 0',
              backgroundColor: '#fff',
              color: '#006699',
              border: 'none',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'opacity 0.2s'
            }}
          >
            Enter Portal <span style={{ fontSize: 18 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
