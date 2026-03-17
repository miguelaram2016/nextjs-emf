'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarIcon, TagIcon, ArrowLeftIcon } from '../../components/Icons';
import '../styles/Blog.css';

const BlogPost = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // First try to fetch all posts and find the one we need
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        const found = posts.find((p) => p.slug === params.slug);
        
        if (found) {
          setPost(found);
        } else {
          // Fallback to localStorage
          if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('elmar_blog_posts');
            if (stored) {
              const localPosts = JSON.parse(stored);
              const localFound = localPosts.find((p) => p.slug === params.slug);
              if (localFound) {
                setPost(localFound);
                return;
              }
            }
          }
          setPost(null);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message);
        
        // Final fallback to localStorage
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('elmar_blog_posts');
          if (stored) {
            try {
              const localPosts = JSON.parse(stored);
              const localFound = localPosts.find((p) => p.slug === params.slug);
              if (localFound) {
                setPost(localFound);
                setError(null);
              }
            } catch (e) {
              console.error('Error parsing localStorage:', e);
            }
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <main className="blog-container">
        <div className="post-loading">
          <div className="loading-spinner"></div>
          <p>Loading article...</p>
        </div>
      </main>
    );
  }

  if (error && !post) {
    return (
      <main className="blog-container">
        <div className="post-not-found">
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog" className="back-link">
            <ArrowLeftIcon />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="blog-container">
        <div className="post-not-found">
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog" className="back-link">
            <ArrowLeftIcon />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  // Convert markdown-style content to simple paragraphs
  const contentSections = post.content.split('\n\n').map((section, index) => {
    const trimmed = section.trim();
    if (!trimmed) return null;
    
    if (trimmed.startsWith('## ')) {
      return <h2 key={index} className="post-h2">{trimmed.replace('## ', '')}</h2>;
    }
    if (trimmed.startsWith('### ')) {
      return <h3 key={index} className="post-h3">{trimmed.replace('### ', '')}</h3>;
    }
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter(line => line.startsWith('- '));
      return (
        <ul key={index} className="post-list">
          {items.map((item, i) => (
            <li key={i}>{item.replace('- ', '')}</li>
          ))}
        </ul>
      );
    }
    if (trimmed.startsWith('1. ')) {
      const items = trimmed.split('\n').filter(line => line.match(/^\d+\. /));
      return (
        <ol key={index} className="post-list post-list-ordered">
          {items.map((item, i) => (
            <li key={i}>{item.replace(/^\d+\. /, '')}</li>
          ))}
        </ol>
      );
    }
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return <p key={index} className="post-bold">{trimmed.replace(/\*\*/g, '')}</p>;
    }
    if (trimmed.startsWith('❌') || trimmed.startsWith('✅')) {
      return <p key={index} className="post-check">{trimmed}</p>;
    }
    
    // Handle links
    const withLinks = trimmed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="post-link">$1</a>');
    
    return (
      <p 
        key={index} 
        className="post-paragraph"
        dangerouslySetInnerHTML={{ __html: withLinks }}
      />
    );
  });

  return (
    <main className="blog-container">
      <article className="post-container">
        {/* Back Link */}
        <div className="section-container">
          <Link href="/blog" className="back-link">
            <ArrowLeftIcon />
            Back to Blog
          </Link>
        </div>

        {/* Post Header */}
        <header className="post-header">
          <div className="section-container">
            <div className="post-meta">
              <span className="post-category">
                <TagIcon />
                {post.category}
              </span>
              <span className="post-date">
                <CalendarIcon />
                {post.date}
              </span>
            </div>
            <h1 className="post-title">
              {post.title}
            </h1>
            <p className="post-excerpt">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Post Content */}
        <div className="section-container">
          <div className="post-content">
            {contentSections}
          </div>
        </div>

        {/* CTA */}
        <div className="section-container">
          <div className="post-cta">
            <h3>Want Personalized Guidance?</h3>
            <p>I help people who need direction get pointed in the right way.</p>
            <Link href="/services" className="post-cta-button">
              View My Programs
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
