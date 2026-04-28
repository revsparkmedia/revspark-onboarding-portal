'use client';
import { useState } from 'react';
import { Settings, X } from 'lucide-react';

export function DemoControls() {
  const [open, setOpen] = useState(false);

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
        This is a clickable prototype. Real data will flow from Monday.com once Michelle confirms the board structure.
      </p>
      <div className="space-y-2">
        <button onClick={() => window.location.reload()} className="w-full text-xs px-3 py-2 border border-[var(--color-border-hairline)] rounded-lg hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition text-left">
          Reset all task completions
        </button>
        <a href="/" className="block w-full text-xs px-3 py-2 border border-[var(--color-border-hairline)] rounded-lg hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition text-left">
          Back to portal landing
        </a>
      </div>
    </div>
  );
}
