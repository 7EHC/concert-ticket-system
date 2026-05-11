'use client';

import { useState, useEffect } from 'react';
import ConcertItem, { ConcertData } from '../../../components/ConcertItem';
import { concertApi, bookingApi } from '../../../lib/api';
import toast from 'react-hot-toast';

interface Concert extends ConcertData {}

type Tab = 'overview' | 'create';

export default function AdminHomePage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [stats, setStats] = useState({ totalSeats: 0, reserve: 0, cancel: 0 });
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Concert | null>(null);
  const [form, setForm] = useState({ name: '', totalSeats: '', description: '' });

  const fetchData = async () => {
    try {
      const [concertsData, statsData] = await Promise.all([
        concertApi.getAll(),
        bookingApi.getStats()
      ]);
      setConcerts(concertsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await concertApi.delete(deleteTarget.id);
      setConcerts((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success('Deleted successfully!');
      // Refresh stats
      const newStats = await bookingApi.getStats();
      setStats(newStats);
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete concert');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.totalSeats) return;
    try {
      const newConcert = await concertApi.create({
        name: form.name,
        description: form.description,
        totalSeats: Number(form.totalSeats),
      });
      setConcerts((prev) => [newConcert, ...prev]);
      setForm({ name: '', totalSeats: '', description: '' });
      setTab('overview');
      toast.success('Created successfully!');
      // Refresh stats
      const newStats = await bookingApi.getStats();
      setStats(newStats);
    } catch (error) {
      console.error('Create failed:', error);
      toast.error('Failed to create concert');
    }
  };

  const statCards = [
    { label: 'Total of seats', value: stats.totalSeats, bg: '#1a3a5c', icon: 'total' },
    { label: 'Reserve', value: stats.reserve, bg: '#00897b', icon: 'reserve' },
    { label: 'Cancel', value: stats.cancel, bg: '#e53935', icon: 'cancel' },
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    backgroundColor: '#fff',
    marginTop: 8
  };

  return (
    <div>
      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 900,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: '32px',
              maxWidth: 400,
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#fee2e2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 8 }}>
              Are you sure to delete?
            </h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 32 }}>
              The concert &ldquo;{deleteTarget.name}&rdquo; will be permanently removed.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  border: 'none',
                  borderRadius: 8,
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32 }}>
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              backgroundColor: card.bg,
              borderRadius: 12,
              padding: '24px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              borderRadius: '50%', 
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16 
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {card.icon === 'total' && <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />}
                {card.icon === 'reserve' && <path d="M20 6L9 17l-5-5" />}
                {card.icon === 'cancel' && <path d="M18 6L6 18M6 6l12 12" />}
              </svg>
            </div>
            <span style={{ fontSize: 14, opacity: 0.9, marginBottom: 4 }}>{card.label}</span>
            <span style={{ fontSize: 36, fontWeight: 700 }}>{card.value.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Tab panel */}
      <div style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', padding: '0 32px' }}>
          {(['overview', 'create'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '16px 24px',
                fontSize: 15,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: tab === t ? '#1a3a5c' : '#999',
                borderBottom: tab === t ? '3px solid #1a3a5c' : '3px solid transparent',
                fontWeight: tab === t ? 600 : 500,
                transition: 'all 0.2s',
                marginBottom: -1,
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: 32 }}>
          {/* Overview Tab */}
          {tab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {concerts.map((concert) => (
                <ConcertItem
                  key={concert.id}
                  concert={concert}
                  actionButton={
                    <button
                      onClick={() => setDeleteTarget(concert)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 16px',
                        backgroundColor: '#fee2e2',
                        color: '#ef4444',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                      </svg>
                      Delete
                    </button>
                  }
                />
              ))}
              {concerts.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: 16 }}>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5A2.5 2.5 0 0 1 6.5 2.5H20M20 17V2.5" />
                  </svg>
                  <p>No concerts listed yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Create Tab */}
          {tab === 'create' && (
            <div style={{ width: '100%' }}>
              <form onSubmit={handleCreate}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
                  <div>
                    <label style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                      Concert Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Summer Music Festival"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                      Total Seats
                    </label>
                    <input
                      type="number"
                      value={form.totalSeats}
                      onChange={(e) => setForm({ ...form, totalSeats: e.target.value })}
                      placeholder="500"
                      required
                      min={1}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Tell people about the concert..."
                    rows={6}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '12px 32px',
                      backgroundColor: '#1a3a5c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'opacity 0.2s'
                    }}
                  >
                    Save Concert
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
