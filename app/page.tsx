import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-bg-base)]">
      <div className="max-w-md text-center">
        <Image
          src="https://revsparkmedia.com/wp-content/uploads/2025/11/Logo-1-e1763470654872.jpg"
          alt="RevSpark Media"
          width={160} height={36} unoptimized
          className="h-9 w-auto mx-auto mb-10"
        />
        <p className="eyebrow mb-4 justify-center">ONBOARDING PORTAL</p>
        <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)]">
          Your portal lives at a unique URL.
        </h1>
        <p className="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
          Your account manager has sent you the link. If you can&apos;t find it, reply to your most recent email from us
          or reach out at <a href="mailto:hello@revsparkmedia.com" className="text-[var(--color-orange)] font-semibold">hello@revsparkmedia.com</a>.
        </p>
        <div className="mt-10 pt-8 border-t border-[var(--color-border-hairline)]">
          <p className="text-xs text-[var(--color-text-muted)] mb-3">DEMO ACCESS</p>
          <Link href="/z/gameday-plano-demo" className="inline-block px-6 py-3 bg-[var(--color-orange)] hover:bg-[var(--color-orange-hover)] text-white rounded-full font-semibold text-sm transition">
            View sample portal
          </Link>
        </div>
      </div>
    </main>
  );
}
