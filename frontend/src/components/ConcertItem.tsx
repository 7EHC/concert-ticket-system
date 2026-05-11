import React from 'react';

export interface ConcertData {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats?: number;
}

interface ConcertItemProps {
  concert: ConcertData;
  actionButton: React.ReactNode;
}

export default function ConcertItem({ concert, actionButton }: ConcertItemProps) {
  const reserved = concert.reservedSeats || 0;
  const total = concert.totalSeats;
  const percentage = Math.min((reserved / total) * 100, 100);

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 4,
        padding: '32px',
        backgroundColor: '#fff',
        boxShadow: 'none',
        marginBottom: 24
      }}
    >
      <h3 style={{ fontSize: 24, fontWeight: 700, color: '#2196f3', marginBottom: 20 }}>
        {concert.name}
      </h3>
      
      <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: 20 }} />

      <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6, marginBottom: 24 }}>
        {concert.description}
      </p>

      {/* Progress Bar UX */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', marginBottom: 8 }}>
          <span>Seats Reserved</span>
          <span style={{ fontWeight: 600, color: '#333' }}>{reserved.toLocaleString()} / {total.toLocaleString()}</span>
        </div>
        <div style={{ width: '100%', height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${percentage}%`, 
              height: '100%', 
              backgroundColor: percentage > 90 ? '#ff5252' : '#2196f3',
              transition: 'width 0.5s ease-out'
            }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#333' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span style={{ fontWeight: 500 }}>Available: {(total - reserved).toLocaleString()}</span>
        </div>
        {actionButton}
      </div>
    </div>
  );
}
