import { NextResponse } from 'next/server';
import { createClinic } from '@/lib/clinic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { legalName, ownerName, ownerTitle, ownerEmail, locations, bookingAddOn } = body;

    if (!legalName || !ownerName || !ownerTitle || !ownerEmail || !locations?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const clinic = await createClinic({
      legalName,
      ownerName,
      ownerTitle,
      ownerEmail,
      locations,
      bookingAddOn: bookingAddOn ?? false,
    });

    // TODO: Call BoldSign API to create embedded signing session
    // For now, generate a placeholder sign link
    const signLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/onboarding/${clinic.id}`;

    const updated = await import('@/lib/clinic').then((m) =>
      m.updateClinic(clinic.id, { signLink })
    );

    return NextResponse.json({
      success: true,
      clinicId: clinic.id,
      signLink,
      clinic: updated,
    });
  } catch (err: unknown) {
    console.error('create-agreement error:', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
