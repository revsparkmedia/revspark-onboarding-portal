'use client';

import { useState } from 'react';

interface Props {
  clinicId: string;
}

export default function OnboardingClient({ clinicId }: Props) {
  const isTest = process.env.NEXT_PUBLIC_TEST_MODE === 'true';
  const testToken = process.env.NEXT_PUBLIC_TEST_TOKEN || '';

  const [bypassing, setBypassing] = useState(false);
  const [bypassResult, setBypassResult] = useState<{ magicLink: string } | null>(null);
  const [bypassError, setBypassError] = useState('');

  async function handleBypassPayment() {
    setBypassing(true);
    setBypassError('');
    try {
      const res = await fetch('/api/test/bypass-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Test-Token': testToken,
        },
        body: JSON.stringify({ clinicId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Bypass failed');
      setBypassResult(data);
    } catch (err: unknown) {
      setBypassError(err instanceof Error ? err.message : 'Bypass failed');
    } finally {
      setBypassing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-base)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <p className="eyebrow mb-4 justify-center text-center">AGREEMENT SIGNING</p>
        <h1 className="text-2xl font-extrabold text-center text-[var(--color-text-primary)] mb-2">
          Sign Your Agreement
        </h1>
        <p className="text-center text-sm text-[var(--color-text-secondary)] mb-8">
          Review and sign the agreement below to proceed with payment.
        </p>

        {/* BoldSign embedded iframe placeholder */}
        <div className="w-full rounded-xl border border-[var(--color-border-hairline)] bg-[var(--color-bg-elevated)] flex items-center justify-center" style={{ minHeight: 500 }}>
          <div className="text-center p-8">
            <p className="text-[var(--color-text-muted)] text-sm">
              BoldSign embedded signing will load here.
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              Clinic ID: <code className="bg-[var(--color-bg-surface)] px-1.5 py-0.5 rounded">{clinicId}</code>
            </p>
          </div>
        </div>

        {/* Test mode bypass button */}
        {isTest && (
          <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
              <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider">
                [TEST] Skip signing &amp; activate
              </span>
            </div>
            <p className="text-xs text-amber-700 mb-3">
              Bypass BoldSign signing and Stripe payment. Activates this clinic immediately and generates a magic link.
            </p>
            <button
              onClick={handleBypassPayment}
              disabled={bypassing}
              className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition disabled:opacity-50"
            >
              {bypassing ? 'Activating...' : '[TEST] Skip signing & activate'}
            </button>

            {bypassError && (
              <p className="mt-3 text-sm text-red-600">{bypassError}</p>
            )}

            {bypassResult && (
              <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm font-semibold text-green-800">Clinic activated!</p>
                <p className="text-xs text-green-700 mt-1 break-all">
                  Magic link: <a href={bypassResult.magicLink} className="underline">{bypassResult.magicLink}</a>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
