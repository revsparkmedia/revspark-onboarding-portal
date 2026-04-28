import { Check, Clock } from 'lucide-react';
import type { ZeeData } from '@/app/data/zees';

export function AdminCheckpoints({ checkpoints }: { checkpoints: ZeeData['adminCheckpoints'] }) {
  const grantedCount = checkpoints.filter(c => c.granted).length;
  return (
    <section>
      <div className="flex items-baseline justify-between mb-6">
        <p className="eyebrow">CORPORATE ACCESS CHECKLIST</p>
        <span className="text-xs font-semibold text-[var(--color-text-muted)]">
          {grantedCount} of {checkpoints.length} complete
        </span>
      </div>
      <div className="brand-card-elevated p-6 md:p-8">
        <div className="space-y-4">
          {checkpoints.map(cp => (
            <div key={cp.id} className="flex items-start gap-4 pb-4 last:pb-0 last:border-0 border-b border-[var(--color-border-hairline)]">
              <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                ${cp.granted ? 'bg-green-600' : 'bg-[var(--color-cloud)] border border-[var(--color-border-strong)]'}
              `}>
                {cp.granted ? (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">{cp.label}</h3>
                  {cp.granted && cp.grantedAtLabel && (
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-green-700 whitespace-nowrap">
                      GRANTED {cp.grantedAtLabel.toUpperCase()}
                    </span>
                  )}
                  {!cp.granted && (
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--color-orange)] whitespace-nowrap">
                      AWAITING
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{cp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
