import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

// Uses synthetic, in-memory credentials and deliberately no database secrets.
// Run only against a locally built Next.js server, never the production domain.
async function freePort() {
  const socket = createServer();
  await new Promise((resolve) => socket.listen(0, '127.0.0.1', resolve));
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  return port;
}

const port = await freePort();
const base = `http://127.0.0.1:${port}`;
const password = randomBytes(32).toString('hex');
const signingSecret = randomBytes(48).toString('hex');
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
  env: {
    ...process.env,
    ELMAR_ADMIN_PASSWORD: password,
    ELMAR_ADMIN_SESSION_SECRET: signingSecret,
    SUPABASE_URL: '',
    SUPABASE_PUBLISHABLE_KEY: '',
    SUPABASE_SECRET_KEY: '',
    SUPABASE_SERVICE_ROLE_KEY: '',
    NEXT_PUBLIC_SUPABASE_URL: '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: ''
  },
  stdio: 'ignore'
});

async function request(path, expectedStatus, options = {}) {
  const response = await fetch(base + path, {
    cache: 'no-store',
    signal: AbortSignal.timeout(4000),
    ...options
  });
  assert.equal(response.status, expectedStatus, `${options.method || 'GET'} ${path} should return ${expectedStatus}`);
  return response;
}
async function session(cookie, expected) {
  const res = await request('/api/admin/session', 200, cookie ? { headers: { Cookie: cookie } } : {});
  const json = await res.json();
  assert.equal(json.authenticated, expected);
  assert.equal(res.headers.get('cache-control'), 'no-store');
}
async function start() {
  for (let i = 0; i < 100; i++) {
    if (child.exitCode !== null) throw new Error('Next.js server exited before becoming ready');
    try {
      const res = await fetch(base + '/api/admin/session', { signal: AbortSignal.timeout(1000) });
      if (res.status === 200) return;
    } catch {}
    await delay(300);
  }
  throw new Error('Next.js test server did not start');
}

try {
  await start();
  await session(null, false);
  const wrong = await request('/api/admin/login', 401, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'incorrect' })
  });
  assert.equal(wrong.headers.get('set-cookie'), null);

  await request('/api/admin/login', 400, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{'
  });

  await request('/api/posts', 503);
  await request('/api/posts', 401, { method: 'POST', body: '{}' });
  await request('/api/posts/synthetic-test', 401, { method: 'DELETE' });
  await request('/api/posts/synthetic-test', 401, { method: 'PUT', body: '{}' });

  const loggedIn = await request('/api/admin/login', 200, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  assert.deepEqual(await loggedIn.json(), { authenticated: true });
  const setCookie = loggedIn.headers.get('set-cookie') || '';
  assert.match(setCookie, /httponly/i);
  assert.match(setCookie, /secure/i);
  assert.match(setCookie, /samesite=strict/i);
  const cookie = setCookie.split(';')[0];
  assert.match(cookie, /^elmar_admin_session=/);
  await session(cookie, true);
  await session(cookie.slice(0, -1) + (cookie.endsWith('a') ? 'b' : 'a'), false);

  await request('/api/posts', 503, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/json' }, body: '{}' });
  await request('/api/posts/synthetic-test', 503, { method: 'DELETE', headers: { Cookie: cookie } });
  await request('/api/posts/synthetic-test', 503, { method: 'PUT', headers: { Cookie: cookie, 'Content-Type': 'application/json' }, body: '{}' });

  const logout = await request('/api/admin/logout', 200, { method: 'POST', headers: { Cookie: cookie } });
  assert.equal((await logout.json()).authenticated, false);
  assert.match(logout.headers.get('set-cookie') || '', /max-age=0/i);
  await session(null, false);
  console.log('PASS: synthetic admin/API smoke tests (no external database writes)');
} finally {
  child.kill('SIGTERM');
}
