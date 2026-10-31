import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE = 'elmar_admin_session';
export const ADMIN_SESSION_SECONDS = 12 * 60 * 60;

function isStronglyConfigured() {
  return Boolean(
    process.env.ELMAR_ADMIN_PASSWORD?.length >= 16 &&
    process.env.ELMAR_ADMIN_SESSION_SECRET?.length >= 32
  );
}

export function adminConfigured() {
  return isStronglyConfigured();
}

function sameValue(left, right) {
  const a = createHash('sha256').update(left).digest();
  const b = createHash('sha256').update(right).digest();
  return timingSafeEqual(a, b);
}

export function verifyAdminPassword(candidate) {
  return isStronglyConfigured() &&
    typeof candidate === 'string' &&
    sameValue(candidate, process.env.ELMAR_ADMIN_PASSWORD);
}

function signature(payload) {
  return createHmac('sha256', process.env.ELMAR_ADMIN_SESSION_SECRET)
    .update(payload)
    .digest('hex');
}

export function createAdminSession() {
  if (!isStronglyConfigured()) return null;
  const expiration = String(Date.now() + ADMIN_SESSION_SECONDS * 1000);
  const payload = 'v1.' + expiration;
  return payload + '.' + signature(payload);
}

export function hasAdminSession(request) {
  if (!isStronglyConfigured()) return false;
  const token = request.cookies.get(ADMIN_COOKIE)?.value || '';
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'v1' || !/^\d{13}$/.test(parts[1])) return false;
  if (Number(parts[1]) <= Date.now() || !/^[a-f0-9]{64}$/.test(parts[2])) return false;
  const expected = signature(parts[0] + '.' + parts[1]);
  return timingSafeEqual(Buffer.from(parts[2], 'hex'), Buffer.from(expected, 'hex'));
}
