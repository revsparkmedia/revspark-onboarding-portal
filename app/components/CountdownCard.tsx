export function CountdownCard({
  bigNumber, bigNumberLabel, bodyText, dayOfTotal, totalDays, amName, amEmail, clinicName, city
}: {
  bigNumber: string; bigNumberLabel: string; bodyText: string;
  dayOfTotal: number; totalDays: number;
  amName: string; amEmail: string; clinicName: string; city: string;
}) {
  return (
    <section className="brand-card-elevated p-10 md:p-12 text-center">
      <div className="flex items-center justify-between mb-8">
        <p className="eyebrow">LAUNCH STATUS <span className="source-label-monday">FROM MONDAY</span></p>
        <span className="text-xs font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">
          DAY {dayOfTotal} OF {totalDays}
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
        <a
          href={`mailto:${amEmail}?subject=${encodeURIComponent(`${clinicName} ${city} . Onboarding question for ${amName.split(' ')[0]}`)}&body=${encodeURIComponent(`Hi ${amName.split(' ')[0]},\n\n`)}`}
          className="px-6 py-3 bg-white border border-[var(--color-border-strong)] hover:border-[var(--color-text-primary)] text-[var(--color-text-primary)] rounded-full font-semibold text-sm transition"
        >
          Email {amName.split(' ')[0]}
        </a>
      </div>
    </section>
  );
}
