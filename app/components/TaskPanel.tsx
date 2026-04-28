'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import type { ZeeData } from '@/app/data/zees';

type LocalStatus = 'pending' | 'completed' | 'snoozed';

export function TaskPanel({ tasks }: { tasks: ZeeData['tasks'] }) {
  const [statuses, setStatuses] = useState<Record<string, LocalStatus>>(
    Object.fromEntries(tasks.map(t => [t.id, t.initialStatus]))
  );

  const setStatus = (id: string, status: LocalStatus) => {
    setStatuses(prev => ({ ...prev, [id]: status }));
  };

  return (
    <section>
      <p className="eyebrow mb-6">WHAT YOU CAN DO NOW</p>
      <div className="space-y-3">
        {tasks.map(task => {
          const status = statuses[task.id];
          const isAction = task.urgency === 'action_required';
          const isCompleted = status === 'completed';
          const isSnoozed = status === 'snoozed';
          return (
            <div key={task.id} className={`brand-card p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 transition-all
              ${isCompleted ? 'opacity-50' : ''}
              ${isSnoozed ? 'opacity-40' : ''}
            `}>
              <div className="flex items-start gap-4 flex-1">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0
                  ${isCompleted ? 'bg-green-600' : ''}
                  ${!isCompleted && isAction ? 'bg-[var(--color-orange)] shadow-[0_0_0_4px_var(--color-orange-glow)]' : ''}
                  ${!isCompleted && !isAction ? 'bg-[var(--color-graphite)]' : ''}
                `} />
                <div className="flex-1">
                  <h3 className={`font-semibold text-base text-[var(--color-text-primary)]
                    ${isCompleted ? 'line-through' : ''}
                  `}>{task.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)] max-w-xl">{task.description}</p>
                  {!isCompleted && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setStatus(task.id, 'completed')}
                        className="text-xs px-3 py-1 border border-[var(--color-border-hairline)] rounded-full hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark complete
                      </button>
                      <button
                        onClick={() => setStatus(task.id, 'snoozed')}
                        className="text-xs px-3 py-1 border border-[var(--color-border-hairline)] rounded-full hover:border-[var(--color-text-primary)] transition"
                      >
                        Snooze
                      </button>
                      <button className="text-xs px-3 py-1 border border-[var(--color-border-hairline)] rounded-full hover:border-[var(--color-text-primary)] transition">
                        Question?
                      </button>
                    </div>
                  )}
                  {isCompleted && (
                    <button onClick={() => setStatus(task.id, 'pending')} className="mt-3 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline">
                      Undo
                    </button>
                  )}
                </div>
              </div>
              <span className={`text-[10px] font-semibold tracking-[0.15em] whitespace-nowrap
                ${isCompleted ? 'text-green-700' : isAction ? 'text-[var(--color-orange)]' : 'text-[var(--color-text-muted)]'}
              `}>
                {isCompleted ? 'COMPLETED' : task.dueLabel}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
