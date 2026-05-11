'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'admin') {
        toast.error('Access Denied: Admin only');
        router.push('/');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !isAuthorized) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Verifying Access...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', display: 'flex' }}>
      <Sidebar role="admin" />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Main content */}
        <div style={{ flex: 1, padding: '40px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}