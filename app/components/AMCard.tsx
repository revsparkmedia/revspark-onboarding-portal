'use client';
import Image from 'next/image';
import { useState } from 'react';

export function AMCard({ am }: { am: { name: string; title: string; bio: string; photoUrl: string } }) {
  const [bookingClicked, setBookingClicked] = useState(false);

  return (
    <section className="brand-card-elevated p-8 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <Image
            src={am.photoUrl} alt={am.name}
            width={96} height={96} unoptimized
            className="rounded-full ring-2 ring-[var(--color-orange)] ring-offset-4 ring-offset-white"
          />
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-[var(--color-text-muted)]">Available now</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="eyebrow mb-3">YOUR ACCOUNT MANAGER</p>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {am.name} <span className="text-[var(--color-text-muted)] font-medium">. {am.title}</span>
          </h2>
          <p className="mt-3 text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
            {am.bio}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['RESPONDS IN UNDER 2 HOURS', 'WEEKLY 1:1 EVERY THURSDAY', 'DIRECT SLACK ACCESS'].map(badge => (
              <span key={badge} className="text-[10px] font-semibold tracking-[0.1em] px-3 py-1.5 border border-[var(--color-border-hairline)] rounded-full text-[var(--color-text-secondary)]">
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <button
              onClick={() => setBookingClicked(true)}
              className="px-5 py-2.5 bg-[var(--color-orange)] hover:bg-[var(--color-orange-hover)] text-white rounded-full text-sm font-semibold transition"
            >
              {bookingClicked ? 'Calendar opening...' : 'Book a call'}
            </button>
            <button className="px-5 py-2.5 bg-white border border-[var(--color-border-strong)] hover:border-[var(--color-text-primary)] text-[var(--color-text-primary)] rounded-full text-sm font-semibold transition">
              Send a message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
