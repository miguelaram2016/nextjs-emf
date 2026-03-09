import Link from 'next/link';
import { blogPosts } from '../data';

// For static export
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPost = ({ params }) => {
  // Handle both static generation and dynamic routing
  const slug = params?.slug;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="py-16 bg-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
          <Link href="/blog" className="text-blue-400 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  // Convert markdown-like content to simple HTML
  const content = post.content
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-white mt-8 mb-4">${line.replace('## ', '')}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold text-white mt-6 mb-3">${line.replace('### ', '')}</h3>`;
      }
      if (line.startsWith('- ')) {
        return `<li class="text-gray-300 ml-4 mb-2">${line.replace('- ', '')}</li>`;
      }
      if (line.match(/^\d+\./)) {
        return `<li class="text-gray-300 ml-4 mb-2">${line.replace(/^\d+\.\s*/, '')}</li>`;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return `<p class="text-white font-bold my-4">${line.replace(/\*\*/g, '')}</p>`;
      }
      if (line.trim() === '') {
        return '<br />';
      }
      // Handle bold text
      const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
      // Handle links
      const linkedLine = processedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>');
      return `<p class="text-gray-300 my-3 leading-relaxed">${linkedLine}</p>`;
    })
    .join('');

  return (
    <main className="py-8 px-4 bg-gray-800 min-h-screen">
      <article className="max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          ← Back to Blog
        </Link>
        
        <header className="mb-8">
          <span className="text-sm text-blue-400 font-medium">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-400">
            {post.date}
          </p>
        </header>

        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-300 mb-4">Want personalized help with your fitness journey?</p>
          <Link 
            href="/services" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Get Direction
          </Link>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
