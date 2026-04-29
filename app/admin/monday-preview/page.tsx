import { Search, Filter, Plus, ChevronDown } from 'lucide-react';
import { getAllZees, type OnboardingStage, type BuildItemStatus } from '@/app/data/zees';

const STAGE_PILL: Record<OnboardingStage, string> = {
  welcome_aboard: 'bg-gray-500',
  agency_change_submitted: 'bg-blue-500',
  corporate_access_granted: 'bg-purple-500',
  campaigns_built: 'bg-orange-500',
  live: 'bg-green-500',
};

const STAGE_LABEL: Record<OnboardingStage, string> = {
  welcome_aboard: 'Welcome Aboard',
  agency_change_submitted: 'Agency Change',
  corporate_access_granted: 'Access Granted',
  campaigns_built: 'Campaigns Built',
  live: 'Live',
};

const BUILD_PILL: Record<BuildItemStatus, string> = {
  pending: 'bg-gray-400',
  in_review: 'bg-orange-500',
  ready: 'bg-blue-500',
  live: 'bg-green-500',
};

export default function MondayPreviewPage() {
  const zees = getAllZees();

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Monday board view</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)] max-w-2xl">
          This is what Michelle&apos;s onboarding board looks like inside Monday. The portal reads these columns directly. No new tooling for the AM team.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-gray-900">Onboarding {'\u00B7'} Gameday Network</h2>
            <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900">
              Main board <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded">
              <Search className="w-3 h-3" /> Search
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded">
              <Plus className="w-3 h-3" /> New zee
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
          <ChevronDown className="w-3 h-3 text-blue-600" />
          <span className="text-xs font-bold text-blue-600">Active Onboardings</span>
          <span className="text-xs text-gray-500">{zees.length} items</span>
        </div>

        <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_2fr_1.5fr] gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50 text-[10px] font-semibold tracking-wider text-gray-600 uppercase">
          <div>Zee</div>
          <div>Stage</div>
          <div>AM</div>
          <div>Day</div>
          <div>Launch Date</div>
          <div>Build Status</div>
          <div>Tasks</div>
        </div>

        {zees.map((zee, i) => (
          <div key={zee.slug} className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_2fr_1.5fr] gap-2 px-4 py-3 border-b border-gray-100 hover:bg-blue-50/30 ${i === zees.length - 1 ? 'border-b-0' : ''}`}>
            <div className="flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-sm" />
              <span className="text-sm font-semibold text-gray-900">{zee.clinicName} {'\u00B7'} {zee.city}</span>
            </div>
            <div className="flex items-center">
              <span className={`monday-pill ${STAGE_PILL[zee.launch.currentStage]}`}>{STAGE_LABEL[zee.launch.currentStage]}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">M</div>
              <span className="text-sm text-gray-700">{zee.am.name.split(' ')[0]}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700 tabular">{zee.launch.dayOfTen}/10</div>
            <div className="flex items-center text-sm text-gray-700">{zee.launch.targetLaunchDate}</div>
            <div className="flex items-center gap-1 flex-wrap">
              {zee.buildItems.map(b => (
                <span key={b.id} className={`text-white text-[9px] font-semibold px-1.5 py-0.5 rounded ${BUILD_PILL[b.status]}`} title={b.name}>
                  {b.name.charAt(0)}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-xs">{zee.tasks.filter(t => t.initialStatus === 'completed').length}/{zee.tasks.length}</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(zee.tasks.filter(t => t.initialStatus === 'completed').length / zee.tasks.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <button className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900">
            <Plus className="w-3 h-3" /> Add new zee
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="admin-card p-5 bg-blue-50 border-blue-200">
          <p className="text-xs font-semibold tracking-[0.15em] text-blue-900 mb-2">SOURCED FROM MONDAY</p>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>{'\u00B7'} Stage progression</li>
            <li>{'\u00B7'} Day of 10 (computed from start date)</li>
            <li>{'\u00B7'} Launch date</li>
            <li>{'\u00B7'} Tasks (subitems with completion status)</li>
            <li>{'\u00B7'} Build status per channel</li>
          </ul>
        </div>
        <div className="admin-card p-5 bg-orange-50 border-orange-200">
          <p className="text-xs font-semibold tracking-[0.15em] text-orange-900 mb-2">SOURCED FROM PORTAL ADMIN</p>
          <ul className="text-sm text-orange-900 space-y-1">
            <li>{'\u00B7'} Corporate access toggles (Meta, Google, GHL)</li>
            <li>{'\u00B7'} Stage override (emergency use only)</li>
            <li>{'\u00B7'} Future: any toggle that doesn&apos;t fit Monday&apos;s model</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
