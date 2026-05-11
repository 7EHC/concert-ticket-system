'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/auth/login?role=user');
      } else if (user.role !== 'user') {
        toast.error('Access Denied: User portal only');
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
    <>
      <style>{`
        .layout-container {
          min-height: 100vh;
          background-color: #f9fafb;
          display: flex;
          flex-direction: row;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 40px;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .layout-container {
            flex-direction: column;
          }
          .main-content {
            padding: 24px 16px;
          }
        }
      `}</style>
      <div className="layout-container">
        <Sidebar role="user" />
        <div className="main-content">
          {children}
        </div>
      </div>
    </>
  );
}
