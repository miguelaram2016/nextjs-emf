'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!ADMIN_PASSWORD) {
      setError('Admin password not configured');
    } else if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
        <div className="bg-gray-700 p-8 rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded bg-gray-600 text-white border border-gray-500 mb-4"
            />
            {error && <p className="text-red-400 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
            >
              Login
            </button>
          </form>
          <Link href="/" className="block text-center text-gray-400 mt-4 hover:text-white">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Blog Admin</h1>
        <Link 
          href="/admin/editor" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded mb-8"
        >
          + New Post
        </Link>
        <div className="bg-gray-700 p-6 rounded-lg">
          <p className="text-gray-300">
            Manage your blog posts here. Posts are saved to your browser's localStorage.
          </p>
        </div>
        <Link href="/" className="block text-gray-400 mt-8 hover:text-white">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
