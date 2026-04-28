const KPIS = [
  { label: 'CAC', value: '$216', trend: 'DOWN 18%', trendType: 'positive' },
  { label: 'BOOKED CONSULTS', value: '47', trend: 'UP 12%', trendType: 'positive' },
  { label: 'PAYING CUSTOMERS', value: '29', trend: 'UP 8%', trendType: 'positive' },
  { label: 'MONTH SPEND', value: '$8,420', trend: 'ON PACE', trendType: 'neutral' },
] as const;

export function KPIStrip() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <p className="eyebrow">ONCE YOU&apos;RE LIVE</p>
        <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)] px-2.5 py-1 border border-[var(--color-border-hairline)] rounded-full">
          PREVIEW
        </span>
      </div>
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-2">
        This is where you&apos;ll see your weekly performance.
      </h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)] max-w-xl">
        Sample view from a comparable Gameday location. Yours starts populating on Day 11.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 opacity-60">
        {KPIS.map(kpi => (
          <div key={kpi.label} className="brand-card p-5 relative">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">{kpi.label}</span>
              <span className={`text-[10px] font-semibold tracking-[0.1em] px-2 py-0.5 border rounded-full
                ${kpi.trendType === 'positive' ? 'border-[var(--color-orange)] text-[var(--color-orange)]' : 'border-[var(--color-border-hairline)] text-[var(--color-text-muted)]'}
              `}>
                {kpi.trend}
              </span>
            </div>
            <div className="tabular text-[36px] font-bold text-[var(--color-text-primary)] mt-3">{kpi.value}</div>
            <div className="mt-3 h-0.5 bg-[var(--color-orange)] rounded-full w-12" />
          </div>
        ))}
      </div>
    </section>
  );
}
