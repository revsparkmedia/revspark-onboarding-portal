import Image from 'next/image';

export function TopBar({ amName }: { amName: string }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--color-border-hairline)]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Image
          src="https://revsparkmedia.com/wp-content/uploads/2025/11/Logo-1-e1763470654872.jpg"
          alt="RevSpark Media"
          width={140} height={32} unoptimized
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--color-border-hairline)]">
          <div className="relative">
            <Image
              src="/michelle.png"
              alt={amName}
              width={28} height={28}
              className="rounded-full object-cover"
              style={{ width: 28, height: 28 }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">{amName.split(' ')[0]}</span>
        </div>
      </div>
    </header>
  );
}
