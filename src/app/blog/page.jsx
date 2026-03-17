'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarIcon, TagIcon } from '../components/Icons';
import { blogPosts } from './data';
import './styles/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
        // Fallback: use local blogPosts data
        setPosts(blogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <main className="blog-container">
        <div className="blog-hero">
          <div className="blog-hero-bg">
            <div className="blog-orb-1"></div>
            <div className="blog-orb-2"></div>
          </div>
          <div className="blog-hero-content">
            <h1 className="blog-title">
              <span className="text-gradient">Fitness</span> Blog
            </h1>
            <p className="blog-subtitle">
              Loading articles...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && posts.length === 0) {
    return (
      <main className="blog-container">
        <div className="blog-hero">
          <div className="blog-hero-bg">
            <div className="blog-orb-1"></div>
            <div className="blog-orb-2"></div>
          </div>
          <div className="blog-hero-content">
            <h1 className="blog-title">
              <span className="text-gradient">Fitness</span> Blog
            </h1>
            <p className="blog-subtitle">
              Unable to load posts. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-container">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-bg">
          <div className="blog-orb-1"></div>
          <div className="blog-orb-2"></div>
        </div>
        <div className="blog-hero-content">
          <h1 className="blog-title">
            <span className="text-gradient">Fitness</span> Blog
          </h1>
          <p className="blog-subtitle">
            Evidence-based insights, training tips, and Kinesiology wisdom
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="blog-posts-section">
        <div className="section-container">
          {posts.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="text-xl">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post, index) => (
                <article 
                  key={post.slug} 
                  className="blog-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-category">
                        <TagIcon />
                        {post.category}
                      </span>
                      <span className="blog-date">
                        <CalendarIcon />
                        {post.date}
                      </span>
                    </div>
                    
                    <h2 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="blog-card-excerpt">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="blog-read-more"
                    >
                      Read Article
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="blog-read-arrow">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter">
        <div className="section-container">
          <div className="newsletter-card">
            <h2 className="newsletter-title">Get Fitness Tips in Your Inbox</h2>
            <p className="newsletter-text">
              Subscribe to get notified when I post new articles.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button 
                type="submit"
                className="newsletter-button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
