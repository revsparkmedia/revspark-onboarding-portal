import { NextResponse } from 'next/server';
import { isTestMode, requireTestToken } from '@/lib/test-mode';
import { listAllClinics } from '@/lib/clinic';

export async function GET(request: Request) {
  if (!isTestMode()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    requireTestToken(request);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unauthorized';
    return NextResponse.json({ error: message }, { status: 401 });
  }

  try {
    const clinics = await listAllClinics();
    return NextResponse.json({ clinics, count: clinics.length });
  } catch (err: unknown) {
    console.error('list-clinics error:', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
