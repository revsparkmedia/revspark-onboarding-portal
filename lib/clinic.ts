import { getRedis } from './redis';
import { v4 as uuidv4 } from 'uuid';

export interface ClinicLocation {
  name: string;
  address: string;
  city: string;
  state: string;
}

export interface Clinic {
  id: string;
  legalName: string;
  ownerName: string;
  ownerTitle: string;
  ownerEmail: string;
  locations: ClinicLocation[];
  bookingAddOn: boolean;
  status: 'pending_signature' | 'pending_payment' | 'active';
  signLink?: string;
  boldsignDocumentId?: string;
  stripeSessionId?: string;
  magicLink?: string;
  createdAt: string;
  updatedAt: string;
}

const CLINIC_PREFIX = 'clinic:';

function clinicKey(id: string) {
  return `${CLINIC_PREFIX}${id}`;
}

export async function createClinic(
  data: Omit<Clinic, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<Clinic> {
  const redis = getRedis();
  const id = uuidv4();
  const now = new Date().toISOString();
  const clinic: Clinic = {
    ...data,
    id,
    status: 'pending_signature',
    createdAt: now,
    updatedAt: now,
  };
  await redis.set(clinicKey(id), JSON.stringify(clinic));
  return clinic;
}

export async function getClinic(id: string): Promise<Clinic | null> {
  const redis = getRedis();
  const raw = await redis.get(clinicKey(id));
  if (!raw) return null;
  return JSON.parse(raw) as Clinic;
}

export async function updateClinic(
  id: string,
  updates: Partial<Clinic>
): Promise<Clinic | null> {
  const existing = await getClinic(id);
  if (!existing) return null;
  const redis = getRedis();
  const updated: Clinic = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await redis.set(clinicKey(id), JSON.stringify(updated));
  return updated;
}

export async function deleteClinic(id: string): Promise<boolean> {
  const redis = getRedis();
  const clinic = await getClinic(id);
  if (!clinic) return false;
  await redis.del(clinicKey(id));
  // Also clean up BoldSign reverse lookup if present
  if (clinic.boldsignDocumentId) {
    await redis.del(`boldsign:doc:${clinic.boldsignDocumentId}`);
  }
  return true;
}

export async function listAllClinics(): Promise<Clinic[]> {
  const redis = getRedis();
  const clinics: Clinic[] = [];
  let cursor = '0';
  do {
    const [nextCursor, keys] = await redis.scan(
      cursor,
      'MATCH',
      `${CLINIC_PREFIX}*`,
      'COUNT',
      100
    );
    cursor = nextCursor;
    if (keys.length > 0) {
      const values = await redis.mget(...keys);
      for (const val of values) {
        if (val) clinics.push(JSON.parse(val) as Clinic);
      }
    }
  } while (cursor !== '0');
  return clinics;
}

export async function findClinicsByEmail(email: string): Promise<Clinic[]> {
  const all = await listAllClinics();
  return all.filter((c) => c.ownerEmail === email);
}
