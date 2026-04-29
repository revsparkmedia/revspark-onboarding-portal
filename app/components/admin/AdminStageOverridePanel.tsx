'use client';
import { useState } from 'react';
import type { OnboardingStage } from '@/app/data/zees';

const STAGES: Array<{ key: OnboardingStage; label: string }> = [
  { key: 'welcome_aboard', label: 'Welcome Aboard' },
  { key: 'agency_change_submitted', label: 'Agency Change Submitted' },
  { key: 'corporate_access_granted', label: 'Corporate Access Granted' },
  { key: 'campaigns_built', label: 'Campaigns Built' },
  { key: 'live', label: 'Live' },
];

export function AdminStageOverridePanel({ currentStage }: { currentStage: OnboardingStage }) {
  const [stage, setStage] = useState<OnboardingStage>(currentStage);
  const [overridden, setOverridden] = useState(false);

  return (
    <div className="admin-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-hairline)]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Stage override</h2>
          <span className="admin-pill-portalSource">EMERGENCY USE</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          Stage syncs from Monday automatically. Use this only if Monday is out of sync and you need to push a change immediately to the zee&apos;s view.
        </p>

        <div className="space-y-2">
          {STAGES.map(s => (
            <label key={s.key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="stage"
                checked={stage === s.key}
                onChange={() => { setStage(s.key); setOverridden(s.key !== currentStage); }}
                className="accent-[var(--color-admin-accent)]"
              />
              <span className={`text-sm ${stage === s.key ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                {s.label}
              </span>
              {s.key === currentStage && (
                <span className="text-[9px] font-semibold tracking-[0.15em] text-[var(--color-admin-accent)]">CURRENT</span>
              )}
            </label>
          ))}
        </div>

        {overridden && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded text-xs text-orange-900">
            Override staged. Click below to push to zee view. (Demo only, no real persistence.)
          </div>
        )}

        <button
          disabled={!overridden}
          onClick={() => alert('Override pushed (demo only).')}
          className="mt-4 w-full px-4 py-2 bg-[var(--color-admin-accent)] hover:bg-[var(--color-admin-accent-hover)] disabled:bg-[var(--color-border-strong)] disabled:cursor-not-allowed text-white rounded font-semibold text-sm transition"
        >
          Push override
        </button>
      </div>
    </div>
  );
}
