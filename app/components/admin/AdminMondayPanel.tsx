import { ExternalLink } from 'lucide-react';
import type { ZeeData, OnboardingStage, BuildItemStatus } from '@/app/data/zees';

const STAGE_LABELS: Record<OnboardingStage, string> = {
  kickoff_call_complete: 'Kickoff Call Complete',
  agency_change_submitted: 'Agency Change Submitted',
  corporate_access_granted: 'Corporate Access Granted',
  revspark_setup_and_builds: 'RevSpark Setup & Builds',
  live: 'Live',
};

const BUILD_LABEL: Record<BuildItemStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  awaiting_launch: 'Awaiting Launch',
  launched: 'Launched',
};

const BUILD_COLOR: Record<BuildItemStatus, string> = {
  pending: 'text-gray-600',
  in_progress: 'text-orange-600',
  awaiting_launch: 'text-blue-600',
  launched: 'text-green-600',
};

export function AdminMondayPanel({ zee }: { zee: ZeeData }) {
  return (
    <div className="admin-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-hairline)]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Synced from Monday</h2>
          <span className="admin-pill-mondaySource">READ ONLY</span>
        </div>
        <a
          href="#monday-board-placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-admin-accent)] hover:underline"
        >
          Edit in Monday <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="p-5 space-y-5 text-sm">
        <Field label="Stage" value={STAGE_LABELS[zee.launch.currentStage]} />
        <Field label="Day count" value={`${zee.launch.dayOfTotal} of ${zee.launch.totalDays}`} />
        <Field label="Target launch date" value={zee.launch.targetLaunchDate} />

        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)] mb-2">TASKS</p>
          <ul className="space-y-1.5">
            {zee.tasks.map(task => (
              <li key={task.id} className="flex items-center gap-2 text-sm">
                <span className={`w-1.5 h-1.5 rounded-full ${task.initialStatus === 'completed' ? 'bg-green-500' : task.urgency === 'action_required' ? 'bg-orange-500' : 'bg-gray-300'}`} />
                <span className={task.initialStatus === 'completed' ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-secondary)]'}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)] mb-2">BUILD STATUS</p>
          <div className="grid grid-cols-2 gap-2">
            {zee.buildItems.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <span className="text-[var(--color-text-secondary)]">{item.name}</span>
                <span className={`font-semibold ${BUILD_COLOR[item.status]}`}>{BUILD_LABEL[item.status]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--color-text-muted)]">{label.toUpperCase()}</span>
      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{value}</span>
    </div>
  );
}
