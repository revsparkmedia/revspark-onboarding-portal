import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getZeeBySlug } from '@/app/data/zees';
import { AdminCorporateAccessPanel } from '@/app/components/admin/AdminCorporateAccessPanel';
import { AdminStageOverridePanel } from '@/app/components/admin/AdminStageOverridePanel';
import { AdminMondayPanel } from '@/app/components/admin/AdminMondayPanel';

export default async function AdminZeeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zee = getZeeBySlug(slug);
  if (!zee) notFound();

  return (
    <div className="px-8 py-8">
      <Link href="/admin/preview" className="inline-flex items-center gap-1 text-sm text-[var(--color-admin-accent)] hover:underline mb-6">
        <ArrowLeft className="w-3 h-3" /> Back to queue
      </Link>

      <div className="flex items-baseline justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {zee.clinicName} <span className="text-[var(--color-text-muted)] font-medium">. {zee.city}, {zee.state}</span>
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Day {zee.launch.dayOfTen} of 10. Launch target: {zee.launch.targetLaunchDate}.
          </p>
        </div>
        <Link
          href={`/z/${zee.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border-strong)] text-sm font-semibold text-[var(--color-text-primary)] rounded-lg hover:border-[var(--color-text-primary)] transition"
        >
          View zee portal <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <AdminMondayPanel zee={zee} />
        <div className="space-y-6">
          <AdminCorporateAccessPanel checkpoints={zee.adminCheckpoints} />
          <AdminStageOverridePanel currentStage={zee.launch.currentStage} />
        </div>
      </div>
    </div>
  );
}
