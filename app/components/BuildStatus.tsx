import type { ZeeData, BuildItemStatus } from '@/app/data/zees';

const STYLES: Record<BuildItemStatus, string> = {
  pending: 'border-[var(--color-border-strong)] text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)]',
  in_review: 'border-[var(--color-orange)] text-[var(--color-orange)] bg-[var(--color-orange-tint)]',
  ready: 'border-[var(--color-graphite)] text-[var(--color-graphite)] bg-[var(--color-cloud)]',
  live: 'border-green-600 text-green-700 bg-green-50',
};

const LABEL: Record<BuildItemStatus, string> = {
  pending: 'PENDING',
  in_review: 'IN REVIEW',
  ready: 'READY',
  live: 'LIVE',
};

export function BuildStatus({ items }: { items: ZeeData['buildItems'] }) {
  return (
    <section id="build-status">
      <p className="eyebrow mb-6">BEING BUILT THIS WEEK <span className="source-label-monday">FROM MONDAY</span></p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="brand-card p-5">
            <div className="flex justify-end mb-4">
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] px-2.5 py-1 rounded-full border ${STYLES[item.status]}`}>
                {item.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-green-600 dot-pulse" />}
                {LABEL[item.status]}
              </span>
            </div>
            <h3 className="font-semibold text-base text-[var(--color-text-primary)]">{item.name}</h3>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
