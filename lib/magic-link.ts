import { v4 as uuidv4 } from 'uuid';
import { getRedis } from './redis';

const MAGIC_PREFIX = 'magic:';
const TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function generateMagicLink(clinicId: string): Promise<string> {
  const redis = getRedis();
  const token = uuidv4();
  await redis.set(`${MAGIC_PREFIX}${token}`, clinicId, 'EX', TTL_SECONDS);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}/onboarding/${clinicId}?token=${token}`;
}

export async function validateMagicLink(token: string): Promise<string | null> {
  const redis = getRedis();
  return redis.get(`${MAGIC_PREFIX}${token}`);
}
