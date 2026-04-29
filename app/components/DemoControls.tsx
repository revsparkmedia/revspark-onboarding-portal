'use client';
import { useState, useEffect } from 'react';
import { Settings, X, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export function DemoControls() {
  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    if (overlay) document.body.classList.add('show-source-overlay');
    else document.body.classList.remove('show-source-overlay');
  }, [overlay]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[var(--color-phantom)] hover:bg-[var(--color-arsenic)] text-white flex items-center justify-center shadow-lg transition"
        aria-label="Demo controls"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 brand-card-elevated p-5 max-w-xs">
      <div className="flex items-start justify-between mb-4">
        <p className="eyebrow text-xs">DEMO CONTROLS</p>
        <button onClick={() => setOpen(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-[var(--color-text-secondary)] mb-4">
        Clickable prototype. Real data flows from Monday + portal admin once wired.
      </p>
      <div className="space-y-2">
        <button
          onClick={() => setOverlay(!overlay)}
          className="w-full text-xs px-3 py-2 border border-[var(--color-border-hairline)] rounded-lg hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition text-left flex items-center gap-2"
        >
          {overlay ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {overlay ? 'Hide' : 'Show'} data source overlay
        </button>
        <Link href="/admin/preview" className="block w-full text-xs px-3 py-2 border border-[var(--color-border-hairline)] rounded-lg hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition text-left">
          Open AM admin view
        </Link>
        <button onClick={() => window.location.reload()} className="w-full text-xs px-3 py-2 border border-[var(--color-border-hairline)] rounded-lg hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition text-left">
          Reset task completions
        </button>
        <Link href="/" className="block w-full text-xs px-3 py-2 border border-[var(--color-border-hairline)] rounded-lg hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition text-left">
          Back to portal landing
        </Link>
      </div>
    </div>
  );
}
