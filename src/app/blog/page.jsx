'use client';

import Link from 'next/link';
import { blogPosts } from './data';

const Blog = () => {
  return (
    <main className="py-16 bg-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-xl text-gray-300">
            Fitness tips, Kinesiology insights, and training advice
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.slug} 
              className="bg-gray-700 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-400 font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {post.date}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-300 mb-6">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Get Fitness Tips in Your Inbox
          </h2>
          <p className="text-gray-300 mb-6">
            Subscribe to get notified when I post new articles.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </main>
  );
};

export default Blog;
