import Link from 'next/link';
import { blogPosts } from '../blog/data';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Post Not Found | El Mar Fitness' };
  }
  return {
    title: `${post.title} | El Mar Fitness Blog`,
    description: post.excerpt,
  };
}

const BlogPost = ({ params }) => {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="py-16 bg-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Post Not Found</h1>
          <Link href="/blog" className="text-blue-400 hover:underline mt-4 inline-block">
            ← Back to Blog
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
    if (trimmed.startsWith('1. ')) {
      const items = trimmed.split('\n').filter(line => line.match(/^\d+\. /));
      return (
        <ol key={index} className="list-decimal list-inside text-gray-300 space-y-2 my-4">
          {items.map((item, i) => (
            <li key={i}>{item.replace(/^\d+\. /, '')}</li>
          ))}
        </ol>
      );
    }
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return <p key={index} className="font-bold text-white my-4">{trimmed.replace(/\*\*/g, '')}</p>;
    }
    if (trimmed.startsWith('❌') || trimmed.startsWith('✅')) {
      return <p key={index} className="text-gray-300 my-2">{trimmed}</p>;
    }
    
    // Regular paragraph
    return (
      <p key={index} className="text-gray-300 my-4 leading-relaxed">
        {trimmed}
      </p>
    );
  });

  return (
    <main className="py-16 bg-gray-800 min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-block text-blue-400 hover:underline mb-8">
          ← Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-blue-400 font-medium">
              {post.category}
            </span>
            <span className="text-sm text-gray-400">
              {post.date}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-300">
            {post.excerpt}
          </p>
        </header>

        {/* Post Content */}
        <div className="prose prose-invert max-w-none">
          {contentSections}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="bg-gradient-to-r from-blue-900 to-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Want Personalized Guidance?
            </h3>
            <p className="text-gray-300 mb-6">
              I help people who need direction get pointed in the right way.
            </p>
            <Link 
              href="/services"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              View My Programs
            </Link>
          </div>
        </div>

      </article>
    </main>
  );
};

export default BlogPost;
