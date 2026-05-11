'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">ConcertTicket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/concerts" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Concerts
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                My Tickets
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Sign In
                </Link>
                <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/concerts" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Concerts
              </Link>
              {user && (
                <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                  My Tickets
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link href="/admin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                  Admin Panel
                </Link>
              )}
              <div className="border-t border-gray-200 pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <span className="block px-3 py-2 text-sm text-gray-700">Welcome, {user.name}</span>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                      Sign In
                    </Link>
                    <Link href="/auth/register" className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}