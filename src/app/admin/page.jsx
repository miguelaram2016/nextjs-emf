'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Password from env var - MUST be set in Vercel project settings
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const router = useRouter();

  // Check auth on mount
  useEffect(() => {
    const auth = localStorage.getItem('elmar_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        // Show ALL posts from Supabase
        setPosts(data);
        
        // Also sync to localStorage as backup
        if (typeof window !== 'undefined') {
          localStorage.setItem('elmar_blog_posts', JSON.stringify(data));
        }
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      // Fallback to localStorage
      const stored = localStorage.getItem('elmar_blog_posts');
      if (stored) {
        try {
          setPosts(JSON.parse(stored));
        } catch (e) {
          console.error('Error parsing localStorage:', e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!ADMIN_PASSWORD) {
      setError('Admin password not configured');
    } else if (password === ADMIN_PASSWORD) {
      localStorage.setItem('elmar_admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
      fetchPosts();
    } else {
      setError('Invalid password');
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm(`Are you sure you want to delete "${slug}"?`)) {
      return;
    }

    setDeleting(slug);
    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove from local state
        setPosts(posts.filter(p => p.slug !== slug));
        
        // Also remove from localStorage
        const stored = localStorage.getItem('elmar_blog_posts');
        if (stored) {
          const localPosts = JSON.parse(stored).filter(p => p.slug !== slug);
          localStorage.setItem('elmar_blog_posts', JSON.stringify(localPosts));
        }
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('elmar_admin_auth');
    setIsAuthenticated(false);
    setPassword('');
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Admin</h1>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white"
          >
            Logout
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <Link 
            href="/admin/editor" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
          >
            + New Post
          </Link>
          <button 
            onClick={fetchPosts}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh Posts'}
          </button>
        </div>

        {/* Posts List */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your Posts</h2>
          
          {loading ? (
            <p className="text-gray-400">Loading posts...</p>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No custom posts yet.</p>
              <p className="text-gray-500 text-sm">
                Click "+ New Post" to create your first post. Default posts are not shown here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div 
                  key={post.slug}
                  className="flex items-center justify-between bg-gray-600 p-4 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{post.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {post.category} • {post.date} • /blog/{post.slug}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/editor?edit=${post.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded disabled:opacity-50"
                    >
                      {deleting === post.slug ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <p className="text-gray-300">
            Manage your blog posts here. Posts are saved to Vercel KV (Redis) when available, 
            with localStorage as fallback for local development.
          </p>
        </div>

        <Link href="/" className="block text-gray-400 mt-8 hover:text-white">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
