'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import toast from 'react-hot-toast';

interface ReservationHistoryItem {
  id: string;
  status: 'reserved' | 'cancelled';
  createdAt: string;
  user: {
    name: string;
  };
  concert: {
    name: string;
  };
}

export default function AdminHistoryPage() {
  const [history, setHistory] = useState<ReservationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.get('/reservations/history');
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
        toast.error('Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
  };

  if (loading) return <div style={{ padding: 40 }}>Loading history...</div>;

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'auto', border: '1px solid #e0e0e0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#fcfcfc', borderBottom: '1px solid #e0e0e0' }}>
            <th style={thStyle}>Date time</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Concert name</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item: any) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={tdStyle}>{formatDateTime(item.createdAt)}</td>
              <td style={tdStyle}>{item.user.name}</td>
              <td style={tdStyle}>{item.concert.name}</td>
              <td style={{ ...tdStyle, color: item.action === 'reserve' ? '#1a3a5c' : '#ef4444' }}>
                {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
              </td>
            </tr>
          ))}
          {history.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: 40, textAlign: 'center', color: '#999' }}>
                No reservation history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontSize: 14,
  fontWeight: 600,
  color: '#333',
  borderRight: '1px solid #e0e0e0'
};

const tdStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontSize: 14,
  color: '#555',
  borderRight: '1px solid #f0f0f0'
};
