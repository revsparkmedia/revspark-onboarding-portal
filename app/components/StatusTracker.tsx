'use client';
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { OnboardingStage } from '@/app/data/zees';

const STAGES: Array<{ id: number; key: OnboardingStage; label: string }> = [
  { id: 1, key: 'welcome_aboard', label: 'WELCOME ABOARD' },
  { id: 2, key: 'agency_change_submitted', label: 'AGENCY CHANGE SUBMITTED' },
  { id: 3, key: 'corporate_access_granted', label: 'CORPORATE ACCESS GRANTED' },
  { id: 4, key: 'campaigns_built', label: 'CAMPAIGNS BUILT' },
  { id: 5, key: 'live', label: 'LIVE' },
];

function getStageState(stageKey: OnboardingStage, current: OnboardingStage): 'complete' | 'current' | 'future' {
  const order = STAGES.map(s => s.key);
  const stageIdx = order.indexOf(stageKey);
  const currentIdx = order.indexOf(current);
  if (stageIdx < currentIdx) return 'complete';
  if (stageIdx === currentIdx) return 'current';
  return 'future';
}

export function StatusTracker({ currentStage, dayOfTen }: { currentStage: OnboardingStage; dayOfTen: number }) {
  const [expanded, setExpanded] = useState(false);
  const completedCount = STAGES.filter(s => getStageState(s.key, currentStage) === 'complete').length;
  const progressPct = ((completedCount + 0.5) / STAGES.length) * 100;
  const currentLabel = STAGES.find(s => s.key === currentStage)?.label || '';

  return (
    <section className="mb-12">
      <div className="hidden md:block brand-card-elevated p-8">
        <div className="flex items-center justify-between mb-6">
          {STAGES.map((stage, i) => {
            const state = getStageState(stage.key, currentStage);
            return (
              <div key={stage.id} className="flex items-center flex-1 last:flex-initial">
                <div className="flex flex-col items-center gap-3">
                  <div className={`relative flex items-center justify-center rounded-full
                    ${state === 'complete' ? 'w-3 h-3 bg-[var(--color-orange)]' : ''}
                    ${state === 'current' ? 'w-3.5 h-3.5 bg-[var(--color-orange)] dot-pulse' : ''}
                    ${state === 'future' ? 'w-3 h-3 border-2 border-[var(--color-border-strong)] bg-white' : ''}
                  `}>
                    {state === 'complete' && <Check className="w-2 h-2 text-white" strokeWidth={4} />}
                  </div>
                  <span className={`text-[10px] font-semibold tracking-[0.15em] whitespace-nowrap
                    ${state === 'current' ? 'text-[var(--color-orange)]' : ''}
                    ${state === 'complete' ? 'text-[var(--color-text-secondary)]' : ''}
                    ${state === 'future' ? 'text-[var(--color-text-muted)]' : ''}
                  `}>{stage.label}</span>
                </div>
                {i < STAGES.length - 1 && (
                  <div className={`h-px flex-1 mx-3 -mt-6
                    ${getStageState(STAGES[i + 1].key, currentStage) !== 'future' || state === 'current' ? 'bg-[var(--color-orange)]' : 'bg-[var(--color-border-hairline)]'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-base text-[var(--color-text-secondary)] text-center">
          Day {dayOfTen} of 10. Your campaigns are being built. Final review opens in {Math.max(0, 8 - dayOfTen)} days.
        </p>
      </div>

      <div className="md:hidden brand-card-elevated p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-orange)] dot-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--color-orange)]">{currentLabel}</span>
        </div>
        <div className="h-1 bg-[var(--color-cloud)] rounded-full overflow-hidden mb-3">
          <div className="h-full bg-[var(--color-orange)] rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <span>Day {dayOfTen} of 10</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        {expanded && (
          <div className="mt-4 space-y-2">
            {STAGES.map(s => {
              const state = getStageState(s.key, currentStage);
              return (
                <div key={s.id} className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full
                    ${state === 'complete' ? 'bg-[var(--color-orange)]' : ''}
                    ${state === 'current' ? 'bg-[var(--color-orange)]' : ''}
                    ${state === 'future' ? 'border border-[var(--color-border-strong)]' : ''}
                  `} />
                  <span className="font-semibold tracking-[0.1em] text-[10px] text-[var(--color-text-secondary)]">{s.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
