'use client';
import { useState } from 'react';
import { Check, Clock } from 'lucide-react';
import type { ZeeData } from '@/app/data/zees';

export function AdminCorporateAccessPanel({ checkpoints }: { checkpoints: ZeeData['adminCheckpoints'] }) {
  const [state, setState] = useState(checkpoints);

  const toggle = (id: string) => {
    setState(prev => prev.map(c =>
      c.id === id
        ? { ...c, granted: !c.granted, grantedAtLabel: !c.granted ? `Day ${Math.floor(Math.random() * 5) + 1}` : undefined }
        : c
    ));
  };

  const grantedCount = state.filter(c => c.granted).length;

  return (
    <div className="admin-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-hairline)]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Corporate access</h2>
          <span className="admin-pill-portalSource">EDITABLE HERE</span>
        </div>
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
          {grantedCount} of {state.length}
        </span>
      </div>

      <div className="divide-y divide-[var(--color-border-hairline)]">
        {state.map(cp => (
          <div key={cp.id} className="px-5 py-4 flex items-start gap-4">
            <button
              onClick={() => toggle(cp.id)}
              className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition
                ${cp.granted ? 'bg-green-600 hover:bg-green-700' : 'bg-white border-2 border-[var(--color-border-strong)] hover:border-[var(--color-admin-accent)]'}
              `}
              aria-label={cp.granted ? 'Mark as not granted' : 'Mark as granted'}
            >
              {cp.granted ? (
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              ) : (
                <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              )}
            </button>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">{cp.label}</h3>
                {cp.granted && cp.grantedAtLabel && (
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-green-700 whitespace-nowrap">
                    GRANTED {cp.grantedAtLabel.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{cp.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 bg-[var(--color-admin-bg)] text-xs text-[var(--color-text-muted)]">
        Click a checkmark to toggle. The zee&apos;s portal updates automatically.
      </div>
    </div>
  );
}
