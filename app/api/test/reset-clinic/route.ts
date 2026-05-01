import { NextResponse } from 'next/server';
import { isTestMode, requireTestToken } from '@/lib/test-mode';
import { deleteClinic, findClinicsByEmail } from '@/lib/clinic';

export async function POST(request: Request) {
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
    const { clinicId, email } = await request.json();
    const deletedIds: string[] = [];

    if (clinicId) {
      const ok = await deleteClinic(clinicId);
      if (ok) deletedIds.push(clinicId);
    }

    if (email) {
      const clinics = await findClinicsByEmail(email);
      for (const c of clinics) {
        const ok = await deleteClinic(c.id);
        if (ok) deletedIds.push(c.id);
      }
    }

    return NextResponse.json({ deleted: deletedIds.length, ids: deletedIds });
  } catch (err: unknown) {
    console.error('reset-clinic error:', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
