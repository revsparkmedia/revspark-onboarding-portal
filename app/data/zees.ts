export type TaskUrgency = 'action_required' | 'optional';
export type TaskStatus = 'pending' | 'completed' | 'snoozed';
export type BuildItemStatus = 'pending' | 'in_review' | 'ready' | 'live';
export type OnboardingStage = 'welcome_aboard' | 'brand_intake' | 'building_campaigns' | 'final_review' | 'go_live';

export interface ZeeData {
  slug: string;
  contactName: string;
  clinicName: string;
  city: string;
  state: string;
  am: {
    name: string;
    title: string;
    bio: string;
    photoUrl: string;
  };
  launch: {
    currentStage: OnboardingStage;
    dayOfTen: number;
    daysUntilLive: number;
    targetLaunchDate: string;
  };
  tasks: Array<{
    id: string;
    urgency: TaskUrgency;
    title: string;
    description: string;
    dueLabel: string;
    initialStatus: TaskStatus;
  }>;
  buildItems: Array<{
    id: string;
    name: string;
    description: string;
    status: BuildItemStatus;
  }>;
  adminCheckpoints: Array<{
    id: string;
    label: string;
    description: string;
    granted: boolean;
    grantedAtLabel?: string;
  }>;
  countdown: {
    bigNumber: string;
    bigNumberLabel: string;
    bodyText: string;
  };
}

export const ZEES: Record<string, ZeeData> = {
  'gameday-plano-demo': {
    slug: 'gameday-plano-demo',
    contactName: 'Demo Franchisee',
    clinicName: "Gameday Men's Health",
    city: 'Plano',
    state: 'TX',
    am: {
      name: 'Michelle Carlson',
      title: 'Your Launch Lead',
      bio: "Account manager for franchise accounts. Has personally launched 40+ men's health locations on time and on budget.",
      photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    },
    launch: {
      currentStage: 'building_campaigns',
      dayOfTen: 7,
      daysUntilLive: 3,
      targetLaunchDate: 'May 1',
    },
    countdown: {
      bigNumber: '3',
      bigNumberLabel: 'DAYS UNTIL YOUR ADS GO LIVE',
      bodyText: 'Your Meta campaigns are 80 percent built. Google Search is wired and awaiting final keyword review. Two creative variants are with our compliance team. We are on track for Day 10.',
    },
    tasks: [
      { id: 't1', urgency: 'action_required', title: 'Approve creative variants', description: 'Three Meta ad variants are ready for your sign-off. Approving by tomorrow keeps your launch on Day 10.', dueLabel: 'DUE TOMORROW', initialStatus: 'pending' },
      { id: 't2', urgency: 'action_required', title: 'Upload final clinic photos', description: 'We have your hero shots. Two interior photos would round out the creative library before launch.', dueLabel: 'DUE BY DAY 9', initialStatus: 'pending' },
      { id: 't3', urgency: 'optional', title: 'Schedule your launch-day check-in', description: 'Michelle wants to walk you through the live dashboard the moment ads turn on.', dueLabel: 'OPTIONAL', initialStatus: 'pending' },
      { id: 't4', urgency: 'optional', title: 'Review your brand voice doc', description: "We've drafted your messaging guardrails based on your intake call. Read-through takes 5 minutes.", dueLabel: 'OPTIONAL', initialStatus: 'pending' },
    ],
    buildItems: [
      { id: 'b1', name: 'Meta Campaigns', description: 'Three creative variants drafted. Compliance review wraps tomorrow.', status: 'in_review' },
      { id: 'b2', name: 'Google Search', description: 'Keywords mapped, ad copy written, awaiting your final approval.', status: 'ready' },
      { id: 'b3', name: 'Lead Routing', description: 'GHL configured for Plano office hours with after-hours fallback to your lead response team.', status: 'live' },
      { id: 'b4', name: 'Tracking & Pixels', description: 'Meta and Google pixels wired and tested on your booking flow.', status: 'live' },
    ],
    adminCheckpoints: [
      { id: 'a1', label: 'Meta ad account access granted by corporate', description: 'Corporate granted RevSpark managed access to your Meta Business Manager.', granted: true, grantedAtLabel: 'Day 4' },
      { id: 'a2', label: 'Google Ads access granted by corporate', description: 'Corporate added RevSpark MCC to your Google Ads account.', granted: true, grantedAtLabel: 'Day 5' },
      { id: 'a3', label: 'GHL sub-account provisioned', description: 'Your dedicated GHL sub-account is created and synced with the network.', granted: true, grantedAtLabel: 'Day 3' },
      { id: 'a4', label: 'Domain verification complete', description: 'DNS records added and verified for ad delivery domains.', granted: false },
    ],
  },
};

export function getZeeBySlug(slug: string): ZeeData | null {
  return ZEES[slug] || null;
}
