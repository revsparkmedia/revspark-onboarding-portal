'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LocationInput {
  name: string;
  address: string;
  city: string;
  state: string;
}

const emptyLocation = (): LocationInput => ({
  name: '',
  address: '',
  city: '',
  state: '',
});

const TEST_DATA = {
  legalName: 'Acme Health Group LLC',
  ownerName: 'Sarah Chen',
  ownerTitle: 'CEO',
  ownerEmail: process.env.NEXT_PUBLIC_TEST_MODE === 'true'
    ? (typeof window !== 'undefined' ? 'don+test@revsparkmedia.com' : 'don+test@revsparkmedia.com')
    : '',
  locations: [
    { name: 'Dallas Location', address: '4500 Cedar Springs Rd', city: 'Dallas', state: 'TX' },
    { name: 'Plano Location', address: '8200 Preston Rd', city: 'Plano', state: 'TX' },
  ],
  bookingAddOn: false,
};

export default function SignupPage() {
  const isTest = process.env.NEXT_PUBLIC_TEST_MODE === 'true';

  const [legalName, setLegalName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerTitle, setOwnerTitle] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [locations, setLocations] = useState<LocationInput[]>([emptyLocation()]);
  const [bookingAddOn, setBookingAddOn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ clinicId: string; signLink: string } | null>(null);
  const [error, setError] = useState('');

  function fillTestData() {
    setLegalName(TEST_DATA.legalName);
    setOwnerName(TEST_DATA.ownerName);
    setOwnerTitle(TEST_DATA.ownerTitle);
    setOwnerEmail(TEST_DATA.ownerEmail);
    setLocations(TEST_DATA.locations);
    setBookingAddOn(TEST_DATA.bookingAddOn);
  }

  function updateLocation(idx: number, field: keyof LocationInput, value: string) {
    setLocations((prev) => prev.map((loc, i) => (i === idx ? { ...loc, [field]: value } : loc)));
  }

  function addLocation() {
    setLocations((prev) => [...prev, emptyLocation()]);
  }

  function removeLocation(idx: number) {
    setLocations((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/onboarding/create-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legalName, ownerName, ownerTitle, ownerEmail, locations, bookingAddOn }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create agreement');
      setResult({ clinicId: data.clinicId, signLink: data.signLink });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-[var(--color-border-hairline)] bg-white text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)] focus:border-transparent';
  const labelCls = 'block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1';

  return (
    <main className="min-h-screen bg-[var(--color-bg-base)] flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <Image
          src="https://revsparkmedia.com/wp-content/uploads/2025/11/Logo-1-e1763470654872.jpg"
          alt="RevSpark Media"
          width={140}
          height={32}
          unoptimized
          className="h-8 w-auto mx-auto mb-8"
        />

        <h1 className="text-2xl font-extrabold text-center text-[var(--color-text-primary)] mb-1">
          Start Your Onboarding
        </h1>
        <p className="text-center text-sm text-[var(--color-text-secondary)] mb-8">
          Complete the form below to begin the agreement signing process.
        </p>

        {isTest && (
          <button
            type="button"
            onClick={fillTestData}
            className="mb-6 w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider border-2 border-dashed border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
          >
            [TEST] Fill with test data
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelCls}>Legal Business Name</label>
            <input className={inputCls} value={legalName} onChange={(e) => setLegalName(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Owner Name</label>
              <input className={inputCls} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
            </div>
            <div>
              <label className={labelCls}>Title</label>
              <input className={inputCls} value={ownerTitle} onChange={(e) => setOwnerTitle(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className={labelCls}>Owner Email</label>
            <input className={inputCls} type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} required />
          </div>

          <fieldset className="space-y-3">
            <legend className={labelCls}>Locations</legend>
            {locations.map((loc, i) => (
              <div key={i} className="p-3 rounded-lg border border-[var(--color-border-hairline)] bg-[var(--color-bg-elevated)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">Location {i + 1}</span>
                  {locations.length > 1 && (
                    <button type="button" onClick={() => removeLocation(i)} className="text-xs text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  )}
                </div>
                <input className={inputCls} placeholder="Location name" value={loc.name} onChange={(e) => updateLocation(i, 'name', e.target.value)} required />
                <input className={inputCls} placeholder="Street address" value={loc.address} onChange={(e) => updateLocation(i, 'address', e.target.value)} required />
                <div className="grid grid-cols-2 gap-2">
                  <input className={inputCls} placeholder="City" value={loc.city} onChange={(e) => updateLocation(i, 'city', e.target.value)} required />
                  <input className={inputCls} placeholder="State" value={loc.state} onChange={(e) => updateLocation(i, 'state', e.target.value)} required />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addLocation}
              className="text-sm font-semibold text-[var(--color-orange)] hover:text-[var(--color-orange-hover)]"
            >
              + Add another location
            </button>
          </fieldset>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={bookingAddOn}
              onChange={(e) => setBookingAddOn(e.target.checked)}
              className="w-4 h-4 accent-[var(--color-orange)]"
            />
            <span className="text-sm text-[var(--color-text-secondary)]">Add online booking integration</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full bg-[var(--color-orange)] hover:bg-[var(--color-orange-hover)] text-white font-semibold text-sm transition disabled:opacity-50"
          >
            {submitting ? 'Creating agreement...' : 'Submit & Generate Agreement'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 space-y-2">
            <p className="text-sm font-semibold text-green-800">Agreement created!</p>
            <p className="text-xs text-green-700">Clinic ID: <code className="bg-green-100 px-1 rounded">{result.clinicId}</code></p>
            <a
              href={result.signLink}
              className="inline-block mt-2 px-4 py-2 rounded-full bg-[var(--color-orange)] text-white text-sm font-semibold hover:bg-[var(--color-orange-hover)] transition"
            >
              Open Signing Page
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
