'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Default posts (fallback when localStorage is empty)
const defaultPosts = [
  {
    slug: 'why-cardio-isnt-enough',
    title: 'Why Cardio Isn\'t Enough',
    excerpt: 'Running on a treadmill won\'t give you the results you want. Here\'s what actually works.',
    date: '2026-03-09',
    category: 'Fitness Basics',
    content: `
## Why Cardio Isn't Enough

If you think doing 30 minutes on the elliptical is going to transform your body, I've got some bad news for you.

### The Problem with Pure Cardio

Cardio burns calories while you're doing it, but that's only half the battle. Here's what most people miss:

1. **It doesn't build muscle** - Muscle is metabolically active tissue. The more you have, the more calories you burn at rest.

2. **Your body adapts** - After a few weeks, your body becomes efficient at the same cardio routine. You burn fewer calories doing the same workout.

3. **It doesn't create the mechanical capacity** - Being "in shape" from cardio doesn't mean you're strong, mobile, or capable.

### What Actually Works

The research is clear: **strength training + conditioning** beats pure cardio every time for:
- Fat loss
- Metabolic health  
- Long-term functionality
- Bone density
- Injury prevention

### The Bottom Line

Don't skip cardio entirely - it's great for your heart and mental health. But if your goal is a transformed physique and real functional fitness, you need to lift heavy things too.

### Next Steps

If you're ready to build a program that actually works, check out my [Fitness Direction](/services) service - I'll assess where you are and build you a roadmap that combines strength and conditioning the right way.
    `
  },
  {
    slug: 'kinesiology-myths',
    title: '5 Kinesiology Myths Debunked',
    excerpt: 'What I learned in school that most trainers don\'t know.',
    date: '2026-03-09',
    category: 'Education',
    content: `
## 5 Kinesiology Myths Debunked

As a Kinesiology graduate, I learned things in school that most personal trainers never learn. Here are some myths I see all the time:

### Myth 1: "More Is Better"

More sets, more reps, more workouts per week. Wrong. **Volume has diminishing returns**, and too much destroys your CNS and joints. Quality > quantity.

### Myth 2: "Abs Are Made in the Kitchen"

True, but incomplete. Your abs show when body fat is low, but they're built in the gym. You need both: **strength training builds the muscle, proper nutrition reveals it.**

### Myth 3: "You Need Equipment to Build Muscle"

Not even close. **Bodyweight training can build incredible strength and muscle** if you progress correctly. Pull-ups, push-ups, dips, pistol squats - these are gold.

### Myth 4: "Stretch Before Working Out"

Static stretching before lifting **actually decreases performance**. Save stretching for after your workout, or do dynamic warm-ups that prepare you for movement.

### Myth 5: "The Keto/Carnivore/Vegan Diet Is Best"

The best diet is the one you can **sustainably follow**. Every "best" diet works when in a calorie deficit. Find what fits your lifestyle.

### The Real Lesson

Kinesiology taught me to **think critically** about fitness claims. Always ask: "What does the research actually say?" and "Does this make biomechanical sense?"

### Work With Me

Want personalized, evidence-based guidance? Let's talk about your goals.
    `
  },
  {
    slug: 'how-to-warm-up',
    title: 'How to Warm Up Properly',
    excerpt: 'Stop wasting time on the elliptical. Here\'s what a real warm-up looks like.',
    date: '2026-03-09',
    category: 'Training Tips',
    content: `
## How to Warm Up Properly

Most people waste 10 minutes on a treadmill and call it a warm-up. That's not a warm-up - that's cardio with extra steps.

### What a Warm-Up Should Actually Do

1. **Increase body temperature** - Get the blood flowing
2. **Prime the nervous system** - Get your CNS ready to fire
3. **Mobilize relevant joints** - For today's movement
4. **Activate key muscles** - "Turn on" what you'll use

### The Perfect 10-Minute Warm-Up

**Minutes 1-3: General (everyone does this)**
- Light cardio: rowing, cycling, or walking
- Goal: break a light sweat

**Minutes 4-7: Dynamic Movement**
- Leg swings (front/back, side-to-side)
- Arm circles
- Hip circles
- Bodyweight squats (warm up the pattern)

**Minutes 8-10: Specific Activation**
- For upper body day: band pull-aparts, push-up variations
- For lower body day: glute bridges, step-ups, lunges
- For bench: light db presses, rotator cuff work

### What NOT To Do

- ❌ Static stretching (save for after)
- ❌ 20 minutes of steady-state cardio
- ❌ Nothing (going cold is a recipe for injury)

### The Bottom Line

A proper warm-up primes your body for performance and prevents injury. It's not optional - it's essential.

### Need Help?

I can build you a warm-up routine that's specific to your training. Check out my [Fitness Direction](/services) service.
    `
  }
];

// Get posts - reads from localStorage first, then falls back to defaults
const getPosts = () => {
  if (typeof window === 'undefined') return defaultPosts;
  
  const stored = localStorage.getItem('elmar_blog_posts');
  if (stored) {
    try {
      const customPosts = JSON.parse(stored);
      // Combine custom posts with defaults (custom posts take precedence if same slug)
      const customSlugs = customPosts.map(p => p.slug);
      const defaultOnly = defaultPosts.filter(p => !customSlugs.includes(p.slug));
      return [...customPosts, ...defaultOnly];
    } catch (e) {
      console.error('Error parsing localStorage posts:', e);
      return defaultPosts;
    }
  }
  return defaultPosts;
};

const BlogPost = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const posts = getPosts();
    const found = posts.find((p) => p.slug === params.slug);
    setPost(found || null);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <main className="py-16 bg-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

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
