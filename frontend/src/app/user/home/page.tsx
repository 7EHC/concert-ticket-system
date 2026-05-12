'use client';

import { useState, useEffect } from 'react';
import ConcertItem, { ConcertData } from '../../../components/ConcertItem';
import { concertApi, reservationApi } from '../../../lib/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Concert extends ConcertData {
  reserved: boolean;
  reservationId?: string;
}

export default function UserHomePage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user) return;
    try {
      const [allConcerts, myReservations] = await Promise.all([
        concertApi.getAll(),
        reservationApi.getUserReservations(user.id),
      ]);

      const mapped = allConcerts.map((c: any) => {
        const reservation = myReservations.find((r: any) => r.concertId === c.id && r.status === 'reserved');
        return {
          ...c,
          reserved: !!reservation,
          reservationId: reservation?.id,
        };
      });
      setConcerts(mapped);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load concerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const toggleReservation = async (concert: Concert) => {
    if (!user) return;
    const promise = async () => {
      if (concert.reserved && concert.reservationId) {
        await reservationApi.cancel(concert.reservationId, user.id);
        return 'Reservation cancelled';
      } else {
        await reservationApi.create({ userId: user.id, concertId: concert.id });
        return 'Seat reserved successfully!';
      }
    };

    toast.promise(promise(), {
      loading: concert.reserved ? 'Cancelling...' : 'Reserving...',
      success: (msg) => {
        fetchData();
        return msg;
      },
      error: (err: any) => {
        const message = err?.message || 'Operation failed';
        return message.includes('HTTP error') ? 'Reservation failed' : message;
      },
    });
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 40 }}>Loading concerts...</div>;

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 8 }}>Discovery</h2>
      <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>Explore upcoming concerts and reserve your seat.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {concerts.map((concert) => (
          <ConcertItem
            key={concert.id}
            concert={concert}
            actionButton={
              <button
                onClick={() => toggleReservation(concert)}
                style={{
                  padding: '10px 24px',
                  backgroundColor: concert.reserved ? '#fee2e2' : '#1a3a5c',
                  color: concert.reserved ? '#ef4444' : '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: concert.reserved ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {concert.reserved ? 'Cancel Reservation' : 'Reserve Seat'}
              </button>
            }
          />
        ))}
        {concerts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
            <p>No concerts available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
