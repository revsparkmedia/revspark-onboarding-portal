import { NextResponse } from 'next/server';
import { stripe, getWebhookSecret } from '@/lib/stripe';
import { getClinic, updateClinic } from '@/lib/clinic';
import { generateMagicLink } from '@/lib/magic-link';
import { sendMagicLinkEmail } from '@/lib/email';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, getWebhookSecret());
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Signature verification failed';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const clinicId = session.metadata?.clinicId;

    if (!clinicId) {
      console.error('No clinicId in checkout session metadata');
      return NextResponse.json({ error: 'No clinicId in metadata' }, { status: 400 });
    }

    const clinic = await getClinic(clinicId);
    if (!clinic) {
      console.error('Clinic not found:', clinicId);
      return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });
    }

    const magicLink = await generateMagicLink(clinicId);
    await updateClinic(clinicId, {
      status: 'active',
      stripeSessionId: session.id,
      magicLink,
    });

    await sendMagicLinkEmail(clinic.ownerEmail, magicLink, clinic.legalName);

    console.log(`Clinic ${clinicId} activated via Stripe checkout`);
  }

  return NextResponse.json({ received: true });
}
