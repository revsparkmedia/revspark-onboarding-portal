'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

export function CountdownCard({ bigNumber, bigNumberLabel, bodyText, dayOfTen, amName }: {
  bigNumber: string; bigNumberLabel: string; bodyText: string; dayOfTen: number; amName: string;
}) {
  const [showMessageModal, setShowMessageModal] = useState(false);

  return (
    <>
      <section className="brand-card-elevated p-10 md:p-12 text-center">
        <div className="flex items-center justify-between mb-8">
          <p className="eyebrow">LAUNCH STATUS</p>
          <span className="text-xs font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">
            DAY {dayOfTen} OF 10
          </span>
        </div>
        <div className="tabular text-[100px] md:text-[140px] font-extrabold leading-none text-[var(--color-orange)]">
          {bigNumber}
        </div>
        <p className="mt-4 text-sm font-semibold tracking-[0.25em] text-[var(--color-text-secondary)]">
          {bigNumberLabel}
        </p>
        <p className="mt-8 max-w-xl mx-auto text-base text-[var(--color-text-secondary)] leading-relaxed">
          {bodyText}
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
          <a href="#build-status" className="px-6 py-3 bg-[var(--color-orange)] hover:bg-[var(--color-orange-hover)] text-white rounded-full font-semibold text-sm transition">
            See what&apos;s being built
          </a>
          <button onClick={() => setShowMessageModal(true)} className="px-6 py-3 bg-white border border-[var(--color-border-strong)] hover:border-[var(--color-text-primary)] text-[var(--color-text-primary)] rounded-full font-semibold text-sm transition">
            Email {amName.split(' ')[0]}
          </button>
        </div>
      </section>

      {showMessageModal && <MessageModal amName={amName} onClose={() => setShowMessageModal(false)} />}
    </>
  );
}

function MessageModal({ amName, onClose }: { amName: string; onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="eyebrow mb-2">MESSAGE YOUR LAUNCH LEAD</p>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Send {amName.split(' ')[0]} a note</h2>
          </div>
          <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        {sent ? (
          <div className="py-8 text-center">
            <p className="text-[var(--color-orange)] font-semibold text-lg">Message sent.</p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{amName.split(' ')[0]} will reply within 2 hours.</p>
          </div>
        ) : (
          <>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
              className="w-full px-4 py-3 bg-white border border-[var(--color-border-strong)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-orange)] focus:ring-2 focus:ring-[var(--color-orange-glow)] outline-none transition resize-none"
            />
            <button
              onClick={() => message.trim() && setSent(true)}
              disabled={!message.trim()}
              className="mt-4 w-full px-4 py-3 bg-[var(--color-orange)] hover:bg-[var(--color-orange-hover)] disabled:bg-[var(--color-border-strong)] disabled:cursor-not-allowed text-white rounded-full font-semibold transition"
            >
              Send message
            </button>
          </>
        )}
      </div>
    </div>
  );
}
