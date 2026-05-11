'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import AuthSplitLayout from '../../../components/AuthSplitLayout';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'user';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(form.name, form.email, form.password, role.toLowerCase());
      router.push(`/${role}/home`);
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  const EyeIcon = ({ visible }: { visible: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
      {visible ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 36px 9px 12px',
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    fontSize: 14,
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: '#333',
    marginBottom: 6,
  };

  return (
    <AuthSplitLayout>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 28 }}>Sign Up</h2>

      <form onSubmit={handleSubmit}>
            {/* Full name */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Full name</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  style={{ ...inputStyle, paddingLeft: 34 }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Email</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  style={{ ...inputStyle, paddingLeft: 34 }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  style={{ ...inputStyle, paddingLeft: 34 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  style={{ ...inputStyle, paddingLeft: 34 }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <EyeIcon visible={showConfirm} />
                </button>
              </div>
            </div>

            {error && (
              <p style={{ color: '#e53935', fontSize: 13, marginBottom: 16, textAlign: 'center' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '10px 0',
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Creating...' : 'Create an account'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#666', marginTop: 20 }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none' }}>
                Login
              </Link>
            </p>
      </form>
    </AuthSplitLayout>
  );
}