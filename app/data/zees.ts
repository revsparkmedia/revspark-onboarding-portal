export type TaskUrgency = 'action_required' | 'optional';
export type TaskStatus = 'pending' | 'completed' | 'snoozed';
export type BuildItemStatus = 'pending' | 'in_review' | 'ready' | 'live';
export type OnboardingStage = 'welcome_aboard' | 'agency_change_submitted' | 'corporate_access_granted' | 'campaigns_built' | 'live';

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
    formUrl?: string;
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
      currentStage: 'campaigns_built',
      dayOfTen: 7,
      daysUntilLive: 3,
      targetLaunchDate: 'May 1',
    },
    countdown: {
      bigNumber: '3',
      bigNumberLabel: 'DAYS UNTIL YOUR ADS GO LIVE',
      bodyText: 'Your Meta campaigns are 80 percent built. Google Ads campaigns are wired and awaiting final approval. Two creative variants are with our compliance team. We are on track for Day 10.',
    },
    tasks: [
      { id: 't1', urgency: 'action_required', title: 'Submit agency change form to corporate', description: 'Corporate needs your signed agency change form before they can grant ad account access. Two-minute form.', dueLabel: 'DUE BY DAY 3', initialStatus: 'completed', formUrl: '#agency-change-form-placeholder' },
      { id: 't2', urgency: 'action_required', title: 'Approve creative variants', description: 'Three Meta ad variants are ready for your sign-off. Approving by tomorrow keeps your launch on Day 10.', dueLabel: 'DUE TOMORROW', initialStatus: 'pending' },
      { id: 't3', urgency: 'action_required', title: 'Upload final clinic photos', description: 'We have your hero shots. Two interior photos would round out the creative library before launch.', dueLabel: 'DUE BY DAY 9', initialStatus: 'pending' },
      { id: 't4', urgency: 'optional', title: 'Fill out booking team intake form', description: 'Quick form so your booking team has the context they need on day one. Skip if you have not selected your booking provider yet.', dueLabel: 'OPTIONAL', initialStatus: 'pending', formUrl: '#booking-intake-form-placeholder' },
    ],
    buildItems: [
      { id: 'b1', name: 'Meta Campaigns', description: 'Three creative variants drafted. Compliance review wraps tomorrow.', status: 'in_review' },
      { id: 'b2', name: 'Google Ads', description: 'Search and Performance Max campaigns built, awaiting your final approval.', status: 'ready' },
      { id: 'b3', name: 'Lead Routing', description: 'GHL configured for Plano office hours with after-hours fallback to your lead response team.', status: 'live' },
      { id: 'b4', name: 'Tracking & Pixels', description: 'Meta and Google pixels wired and tested on your booking flow.', status: 'live' },
    ],
    adminCheckpoints: [
      { id: 'a1', label: 'Meta ad account access granted by corporate', description: 'Corporate granted RevSpark managed access to your Meta Business Manager.', granted: true, grantedAtLabel: 'Day 4' },
      { id: 'a2', label: 'Google Ads access granted by corporate', description: 'Corporate added RevSpark MCC to your Google Ads account.', granted: true, grantedAtLabel: 'Day 5' },
      { id: 'a3', label: 'GHL sub-account provided by corporate', description: 'Corporate created your dedicated GHL sub-account and synced it with the network.', granted: true, grantedAtLabel: 'Day 3' },
    ],
  },
};

export function getZeeBySlug(slug: string): ZeeData | null {
  return ZEES[slug] || null;
}
