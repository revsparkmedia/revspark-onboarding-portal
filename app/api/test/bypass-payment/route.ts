import { NextResponse } from 'next/server';
import { isTestMode, requireTestToken } from '@/lib/test-mode';
import { getClinic, updateClinic } from '@/lib/clinic';
import { generateMagicLink } from '@/lib/magic-link';
import { sendMagicLinkEmail } from '@/lib/email';
import { getTestClinicEmail } from '@/lib/test-mode';

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
    const { clinicId } = await request.json();
    if (!clinicId) {
      return NextResponse.json({ error: 'clinicId is required' }, { status: 400 });
    }

    const clinic = await getClinic(clinicId);
    if (!clinic) {
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });
    }

    const magicLink = await generateMagicLink(clinicId);
    const emailTo = getTestClinicEmail();

    await updateClinic(clinicId, {
      status: 'active',
      magicLink,
    });

    await sendMagicLinkEmail(emailTo, magicLink, clinic.legalName);

    return NextResponse.json({
      success: true,
      magicLink,
      clinicId,
      status: 'active',
    });
  } catch (err: unknown) {
    console.error('bypass-payment error:', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
