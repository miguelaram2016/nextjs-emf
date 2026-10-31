import test from 'node:test';
import assert from 'node:assert/strict';
import { getBlogConfig, validateBlogPost, isValidPostSlug } from '../src/lib/blog-supabase.mjs';

const env = {
  SUPABASE_URL: 'https://example.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_fixture',
  SUPABASE_SECRET_KEY: 'sb_secret_fixture'
};
const post = {
  slug: 'safe-training-post',
  title: 'Safe Training',
  excerpt: 'A test description',
  category: 'Education',
  date: '2026-10-25',
  content: 'Synthetic post content'
};

test('public reads use publishable key without an opaque bearer token', () => {
  const config = getBlogConfig('read', env);
  assert.equal(config.url, 'https://example.supabase.co');
  assert.equal(config.headers.apikey, env.SUPABASE_PUBLISHABLE_KEY);
  assert.equal(config.headers.Authorization, undefined);
});

test('writes use only a server key, never the public key', () => {
  assert.equal(getBlogConfig('write', { ...env, SUPABASE_SECRET_KEY: '' }), null);
  assert.equal(getBlogConfig('write', { ...env, SUPABASE_SECRET_KEY: env.SUPABASE_PUBLISHABLE_KEY }), null);
  assert.equal(getBlogConfig('write', { ...env, SUPABASE_SECRET_KEY: 'sb_publishable_wrong' }), null);
  assert.equal(getBlogConfig('write', env).headers.apikey, env.SUPABASE_SECRET_KEY);
});

test('rejects invalid endpoints and incomplete configuration', () => {
  assert.equal(getBlogConfig('read', { ...env, SUPABASE_URL: 'http://example.supabase.co' }), null);
  assert.equal(getBlogConfig('read', { ...env, SUPABASE_URL: 'https://example.supabase.co/path' }), null);
  assert.equal(getBlogConfig('read', { ...env, SUPABASE_PUBLISHABLE_KEY: '' }), null);
});

test('accepts a valid post while removing unrecognized fields', () => {
  assert.deepEqual(validateBlogPost({ ...post, admin: true }), post);
  assert.equal(isValidPostSlug(post.slug), true);
});

test('rejects malformed posts or slugs', () => {
  for (const invalid of [
    { ...post, slug: 'bad/slug' },
    { ...post, title: '' },
    { ...post, content: '' },
    { ...post, date: 'tomorrow' },
    { ...post, excerpt: 99 },
    { ...post, content: 'a'.repeat(50001) }
  ]) assert.equal(validateBlogPost(invalid), null);
  assert.equal(isValidPostSlug('../other'), false);
});
