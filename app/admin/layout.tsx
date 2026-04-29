import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Database } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[var(--color-admin-bg)]">
      <aside className="w-60 bg-[var(--color-admin-sidebar)] text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <Image
            src="https://revsparkmedia.com/wp-content/uploads/2025/11/Logo-1-e1763470654872.jpg"
            alt="RevSpark Media"
            width={120} height={28} unoptimized
            className="h-7 w-auto brightness-0 invert"
          />
          <p className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-white/60">
            INTERNAL TOOLS
          </p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link href="/admin/preview" className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-[var(--color-admin-sidebar-hover)] rounded transition">
            <LayoutDashboard className="w-4 h-4" />
            Onboarding queue
          </Link>
          <Link href="/admin/monday-preview" className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-[var(--color-admin-sidebar-hover)] rounded transition">
            <Database className="w-4 h-4" />
            Monday board view
          </Link>
        </nav>
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-xs text-white/60">Michelle Carlson</p>
          <p className="text-xs text-white/40">Account Manager</p>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="bg-white border-b border-[var(--color-border-hairline)] px-8 py-3">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)]">
            ADMIN PREVIEW {'\u00B7'} NOT WIRED TO LIVE DATA
          </p>
        </div>
        {children}
      </main>
    </div>
  );
}
