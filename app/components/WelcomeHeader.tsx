export function WelcomeHeader({ clinicName, city, state, daysUntilLive }: {
  clinicName: string; city: string; state: string; daysUntilLive: number;
}) {
  return (
    <section className="pt-16 md:pt-20 pb-10 md:pb-12">
      <p className="eyebrow mb-6">YOUR LAUNCH</p>
      <h1 className="text-[44px] md:text-[64px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-text-primary)]">
        Welcome aboard,{' '}
        <span className="text-[var(--color-orange)]">{clinicName}</span>
      </h1>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
        {city}, {state}. {daysUntilLive} days until your ads go live.
      </p>
    </section>
  );
}
