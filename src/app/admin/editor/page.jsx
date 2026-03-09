'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const CATEGORIES = ['Fitness Basics', 'Training Tips', 'Education', 'Nutrition'];

export default function EditorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editSlug = searchParams.get('edit');

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Fitness Basics',
    date: new Date().toISOString().split('T')[0],
    content: ''
  });
  const [isPreview, setIsPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [existingPosts, setExistingPosts] = useState([]);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('elmar_admin_auth');
    if (auth !== 'true') {
      router.push('/admin');
      return;
    }

    // Load existing posts to check for duplicates
    const stored = localStorage.getItem('elmar_blog_posts');
    if (stored) {
      setExistingPosts(JSON.parse(stored));
    }

    // If editing, load the post
    if (editSlug) {
      const allPosts = stored ? JSON.parse(stored) : [];
      // Also check default posts
      const defaultPosts = [
        { slug: 'why-cardio-isnt-enough', title: "Why Cardio Isn't Enough", date: '2026-03-09', category: 'Fitness Basics', excerpt: "Running on a treadmill won't give you the results you want. Here's what actually works.", content: '' },
        { slug: 'kinesiology-myths', title: '5 Kinesiology Myths Debunked', date: '2026-03-09', category: 'Education', excerpt: 'What I learned in school that most trainers don\'t know.', content: '' },
        { slug: 'how-to-warm-up', title: 'How to Warm Up Properly', date: '2026-03-09', category: 'Training Tips', excerpt: 'Stop wasting time on the elliptical. Here\'s what a real warm-up looks like.', content: '' }
      ];
      
      const post = [...allPosts, ...defaultPosts].find(p => p.slug === editSlug);
      if (post) {
        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          category: post.category || 'Fitness Basics',
          date: post.date || new Date().toISOString().split('T')[0],
          content: post.content || ''
        });
      }
    }
  }, [editSlug, router]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const slug = editSlug || generateSlug(formData.title);
    
    const postData = {
      slug,
      title: formData.title,
      excerpt: formData.excerpt,
      category: formData.category,
      date: formData.date,
      content: formData.content
    };

    // Get existing posts
    const stored = localStorage.getItem('elmar_blog_posts');
    let posts = stored ? JSON.parse(stored) : [];

    // Update or add
    const existingIndex = posts.findIndex(p => p.slug === slug);
    if (existingIndex >= 0) {
      posts[existingIndex] = postData;
    } else {
      posts.push(postData);
    }

    localStorage.setItem('elmar_blog_posts', JSON.stringify(posts));
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleDelete = () => {
    if (editSlug && confirm('Are you sure you want to delete this post?')) {
      const stored = localStorage.getItem('elmar_blog_posts');
      if (stored) {
        const posts = JSON.parse(stored).filter(p => p.slug !== editSlug);
        localStorage.setItem('elmar_blog_posts', JSON.stringify(posts));
      }
      router.push('/admin');
    }
  };

  // Simple markdown preview
  const renderPreview = () => {
    const content = formData.content.split('\n\n').map((section, index) => {
      const trimmed = section.trim();
      if (!trimmed) return null;
      
      if (trimmed.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{trimmed.replace('## ', '')}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-blue-400 mt-6 mb-3">{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside text-gray-300 space-y-2 my-4">
            {items.map((item, i) => (
              <li key={i}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return <p key={index} className="font-bold text-white my-4">{trimmed.replace(/\*\*/g, '')}</p>;
      }
      
      return (
        <p key={index} className="text-gray-300 my-4 leading-relaxed">
          {trimmed}
        </p>
      );
    });

    return (
      <div className="prose prose-invert max-w-none">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-blue-400 font-medium">{formData.category}</span>
            <span className="text-sm text-gray-400">{formData.date}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{formData.title}</h1>
          <p className="text-xl text-gray-300">{formData.excerpt}</p>
        </header>
        {content}
      </div>
    );
  };

  return (
    <main className="py-16 bg-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {editSlug ? 'Edit Post' : 'New Post'}
            </h1>
            <Link href="/admin" className="text-blue-400 hover:underline">
              ← Back to Admin
            </Link>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isPreview ? 'Edit' : 'Preview'}
            </button>
            {editSlug && (
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {isPreview ? (
          <div className="bg-gray-700 rounded-xl p-8">
            {renderPreview()}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-700 rounded-xl p-8">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-semibold">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-semibold">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="Brief summary of the post"
                rows={2}
                required
              />
            </div>

            {/* Category & Date */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-semibold">
                Content (Markdown supported)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none font-mono text-sm"
                placeholder="Write your post content here... Use ## for headings, - for lists, **bold** for bold text"
                rows={15}
                required
              />
              <p className="text-gray-400 text-sm mt-2">
                Tip: Use ## for headings, ### for subheadings, - for bullet points, **text** for bold
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                {saved ? '✓ Saved!' : 'Save Post'}
              </button>
              <Link
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}

      </div>
    </main>
  );
}
