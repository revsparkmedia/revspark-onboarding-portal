import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllZees, type OnboardingStage } from '@/app/data/zees';

const STAGE_LABELS: Record<OnboardingStage, string> = {
  welcome_aboard: 'Welcome Aboard',
  agency_change_submitted: 'Agency Change Submitted',
  corporate_access_granted: 'Corporate Access Granted',
  campaigns_built: 'Campaigns Built',
  live: 'Live',
};

const STAGE_BADGE: Record<OnboardingStage, string> = {
  welcome_aboard: 'bg-gray-100 text-gray-700',
  agency_change_submitted: 'bg-blue-50 text-blue-700',
  corporate_access_granted: 'bg-blue-50 text-blue-700',
  campaigns_built: 'bg-orange-50 text-orange-700',
  live: 'bg-green-50 text-green-700',
};

export default function AdminPreviewPage() {
  const zees = getAllZees();

  return (
    <div className="px-8 py-8">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Onboarding queue</h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {zees.length} active onboardings. Stage and tasks come from Monday. Corporate access toggles managed here.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="admin-pill-mondaySource">FROM MONDAY</span>
          <span className="admin-pill-portalSource">FROM PORTAL ADMIN</span>
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-admin-bg)]">
              <th className="text-left px-5 py-3 text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">CLINIC</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">LOCATION</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">STAGE <span className="admin-pill-mondaySource ml-2">MONDAY</span></th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">DAY</th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">CORP ACCESS <span className="admin-pill-portalSource ml-2">PORTAL</span></th>
              <th className="text-left px-5 py-3 text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">PORTAL URL</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {zees.map(zee => {
              const grantedCount = zee.adminCheckpoints.filter(c => c.granted).length;
              const totalCount = zee.adminCheckpoints.length;
              return (
                <tr key={zee.slug} className="border-b border-[var(--color-border-hairline)] last:border-0 hover:bg-[var(--color-admin-bg)] transition">
                  <td className="px-5 py-4 text-sm font-semibold text-[var(--color-text-primary)]">{zee.clinicName}</td>
                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">{zee.city}, {zee.state}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex text-[10px] font-semibold tracking-[0.1em] px-2 py-1 rounded ${STAGE_BADGE[zee.launch.currentStage]}`}>
                      {STAGE_LABELS[zee.launch.currentStage].toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm tabular text-[var(--color-text-secondary)]">
                    {zee.launch.dayOfTen} of 10
                  </td>
                  <td className="px-5 py-4 text-sm tabular text-[var(--color-text-secondary)]">
                    <span className={grantedCount === totalCount ? 'text-green-700 font-semibold' : 'text-[var(--color-text-secondary)]'}>
                      {grantedCount} of {totalCount}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs">
                    <Link href={`/z/${zee.slug}`} target="_blank" className="text-[var(--color-admin-accent)] hover:underline">
                      /z/{zee.slug}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/preview/${zee.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-admin-accent)] hover:text-[var(--color-admin-accent-hover)]">
                      Manage <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 admin-card p-5 bg-blue-50 border-blue-200">
        <p className="text-xs font-semibold text-blue-900 mb-1">PROTOTYPE NOTE</p>
        <p className="text-sm text-blue-800">
          This is a visual mockup. Real onboarding state will be read from Michelle&apos;s existing Monday board.
          Corporate access toggles will write to portal-internal state. Both feed the zee&apos;s view automatically.
        </p>
      </div>
    </div>
  );
}
