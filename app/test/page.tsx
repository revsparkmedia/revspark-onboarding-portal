'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';

const isTest = process.env.NEXT_PUBLIC_TEST_MODE === 'true';
const TEST_TOKEN = process.env.NEXT_PUBLIC_TEST_TOKEN || '';
const TEST_EMAIL = 'don+test@revsparkmedia.com';

interface ClinicRecord {
  id: string;
  legalName: string;
  ownerEmail: string;
  status: string;
  createdAt: string;
}

function headers() {
  return {
    'Content-Type': 'application/json',
    'X-Test-Token': TEST_TOKEN,
  };
}

export default function TestConsolePage() {
  if (!isTest) {
    notFound();
  }

  // Section 1: Quick test flow
  const [creating, setCreating] = useState(false);
  const [createResult, setCreateResult] = useState<{ clinicId: string; signLink: string } | null>(null);
  const [createError, setCreateError] = useState('');

  // Section 2: Bypass payment
  const [bypassClinicId, setBypassClinicId] = useState('');
  const [bypassLoading, setBypassLoading] = useState(false);
  const [bypassResult, setBypassResult] = useState<{ magicLink: string; clinicId: string; status: string } | null>(null);
  const [bypassError, setBypassError] = useState('');

  // Section 3: Reset
  const [resetClinicId, setResetClinicId] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetResult, setResetResult] = useState<{ deleted: number; ids: string[] } | null>(null);
  const [resetError, setResetError] = useState('');

  // Section 4: List clinics
  const [clinics, setClinics] = useState<ClinicRecord[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState('');

  async function handleCreateTestClinic() {
    setCreating(true);
    setCreateError('');
    setCreateResult(null);
    try {
      const res = await fetch('/api/onboarding/create-agreement', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          legalName: 'Test Clinic LLC',
          ownerName: 'Test Owner',
          ownerTitle: 'Owner',
          ownerEmail: TEST_EMAIL,
          locations: [{ name: 'Test Location 1', address: '123 Test St', city: 'Dallas', state: 'TX' }],
          bookingAddOn: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCreateResult({ clinicId: data.clinicId, signLink: data.signLink });
      setBypassClinicId(data.clinicId);
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setCreating(false);
    }
  }

  async function handleBypass() {
    setBypassLoading(true);
    setBypassError('');
    setBypassResult(null);
    try {
      const res = await fetch('/api/test/bypass-payment', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ clinicId: bypassClinicId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBypassResult(data);
    } catch (err: unknown) {
      setBypassError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setBypassLoading(false);
    }
  }

  async function handleReset() {
    setResetLoading(true);
    setResetError('');
    setResetResult(null);
    try {
      const body: Record<string, string> = {};
      if (resetClinicId) body.clinicId = resetClinicId;
      if (resetEmail) body.email = resetEmail;
      const res = await fetch('/api/test/reset-clinic', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResetResult(data);
    } catch (err: unknown) {
      setResetError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setResetLoading(false);
    }
  }

  async function handleListClinics() {
    setListLoading(true);
    setListError('');
    try {
      const res = await fetch('/api/test/list-clinics', {
        headers: { 'X-Test-Token': TEST_TOKEN },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClinics(data.clinics);
    } catch (err: unknown) {
      setListError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setListLoading(false);
    }
  }

  const sectionCls = 'p-5 rounded-xl border border-[var(--color-border-hairline)] bg-[var(--color-bg-elevated)]';
  const btnCls = 'px-4 py-2 rounded-full text-sm font-semibold transition disabled:opacity-50';
  const btnPrimary = `${btnCls} bg-[var(--color-orange)] hover:bg-[var(--color-orange-hover)] text-white`;
  const btnAmber = `${btnCls} bg-amber-500 hover:bg-amber-600 text-white`;
  const btnRed = `${btnCls} bg-red-500 hover:bg-red-600 text-white`;
  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-[var(--color-border-hairline)] bg-white text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]';
  const codeCls = 'mt-3 p-3 rounded-lg bg-[var(--color-phantom)] text-green-400 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all';

  return (
    <main className="min-h-screen bg-[var(--color-bg-base)] px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <p className="eyebrow mb-2">INTERNAL</p>
          <h1 className="text-2xl font-extrabold text-[var(--color-text-primary)]">Onboarding Test Console</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Test the full onboarding pipeline without real payments.
          </p>
        </div>

        {/* Section 1: Quick test flow */}
        <section className={sectionCls}>
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3">1. Quick test flow</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Create a test clinic with hardcoded data and get a signing link.
          </p>
          <button onClick={handleCreateTestClinic} disabled={creating} className={btnPrimary}>
            {creating ? 'Creating...' : 'Generate test clinic + agreement'}
          </button>
          {createError && <p className="mt-3 text-sm text-red-600">{createError}</p>}
          {createResult && (
            <div className={codeCls}>
              {JSON.stringify(createResult, null, 2)}
            </div>
          )}
          {createResult && (
            <a href={createResult.signLink} target="_blank" rel="noopener noreferrer" className={`${btnAmber} inline-block mt-3`}>
              Open signing page
            </a>
          )}
        </section>

        {/* Section 2: Bypass payment */}
        <section className={sectionCls}>
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3">2. Bypass payment</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Activate a clinic (skip Stripe) and get a magic link.
          </p>
          <div className="flex gap-2">
            <input
              className={inputCls}
              placeholder="Clinic ID"
              value={bypassClinicId}
              onChange={(e) => setBypassClinicId(e.target.value)}
            />
            <button onClick={handleBypass} disabled={bypassLoading || !bypassClinicId} className={btnAmber}>
              {bypassLoading ? 'Activating...' : 'Activate (skip Stripe)'}
            </button>
          </div>
          {bypassError && <p className="mt-3 text-sm text-red-600">{bypassError}</p>}
          {bypassResult && (
            <div className={codeCls}>
              {JSON.stringify(bypassResult, null, 2)}
            </div>
          )}
        </section>

        {/* Section 3: Reset */}
        <section className={sectionCls}>
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3">3. Reset</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Wipe test clinics from Redis so you can re-run the flow.
          </p>
          <div className="space-y-2">
            <input
              className={inputCls}
              placeholder="Clinic ID (optional)"
              value={resetClinicId}
              onChange={(e) => setResetClinicId(e.target.value)}
            />
            <input
              className={inputCls}
              placeholder="Owner email (optional)"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </div>
          <button onClick={handleReset} disabled={resetLoading || (!resetClinicId && !resetEmail)} className={`${btnRed} mt-3`}>
            {resetLoading ? 'Wiping...' : 'Wipe this test clinic'}
          </button>
          {resetError && <p className="mt-3 text-sm text-red-600">{resetError}</p>}
          {resetResult && (
            <div className={codeCls}>
              {JSON.stringify(resetResult, null, 2)}
            </div>
          )}
        </section>

        {/* Section 4: List all clinics */}
        <section className={sectionCls}>
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3">4. List all clinics</h2>
          <button onClick={handleListClinics} disabled={listLoading} className={btnPrimary}>
            {listLoading ? 'Loading...' : 'Refresh clinic list'}
          </button>
          {listError && <p className="mt-3 text-sm text-red-600">{listError}</p>}
          {clinics.length > 0 && (
            <div className="mt-4 space-y-2">
              {clinics.map((c) => (
                <div key={c.id} className="p-3 rounded-lg border border-[var(--color-border-hairline)] bg-white text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--color-text-primary)]">{c.legalName}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        c.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : c.status === 'pending_payment'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">{c.id}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{c.ownerEmail}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
