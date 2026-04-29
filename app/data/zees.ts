export type TaskUrgency = 'action_required' | 'optional';
export type TaskStatus = 'pending' | 'completed' | 'snoozed';
export type BuildItemStatus = 'pending' | 'in_progress' | 'awaiting_launch' | 'launched';
export type OnboardingStage = 'kickoff_call_complete' | 'agency_change_submitted' | 'corporate_access_granted' | 'revspark_setup_and_builds' | 'live';
export type DataSource = 'monday' | 'portal_admin';

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
    email: string;
  };
  launch: {
    currentStage: OnboardingStage;
    dayOfTotal: number;
    totalDays: number;
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
    formCtaLabel?: string;
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

const MICHELLE = {
  name: 'Michelle Carlson',
  title: 'Your Launch Lead',
  bio: "Account manager for franchise accounts. Has personally launched 40+ men's health locations on time and on budget.",
  photoUrl: '/michelle.png',
  email: 'michelle@revsparkmedia.com',
};

export const ZEES: Record<string, ZeeData> = {
  'gameday-plano-demo': {
    slug: 'gameday-plano-demo',
    contactName: 'Demo Franchisee',
    clinicName: "Gameday Men's Health",
    city: 'Plano', state: 'TX',
    am: MICHELLE,
    launch: {
      currentStage: 'revspark_setup_and_builds', dayOfTotal: 5, totalDays: 7, daysUntilLive: 2,
      targetLaunchDate: 'May 1',
    },
    countdown: {
      bigNumber: '2', bigNumberLabel: 'BUSINESS DAYS UNTIL YOUR ADS GO LIVE',
      bodyText: 'Your Meta campaigns are built. Google Ads is live in MCC and awaiting final keyword review. GHL setup with Eliza workflows is in progress. Landing pages are drafted. We are on track for May 1.',
    },
    tasks: [
      { id: 't1', urgency: 'action_required', title: 'Submit agency change form to corporate', description: 'Corporate needs your signed agency change form before they can grant access to Meta, Google Ads, GHL, GMB, and your territory map. Allow up to 5 business days after submission.', dueLabel: 'COMPLETE', initialStatus: 'completed', formUrl: '#agency-change-form-placeholder', formCtaLabel: 'Open form' },
      { id: 't2', urgency: 'action_required', title: 'Confirm ad spend', description: 'Confirm your monthly ad spend so we can right-size your campaigns and channel mix.', dueLabel: 'DUE BY DAY 3', initialStatus: 'completed' },
      { id: 't3', urgency: 'action_required', title: 'Confirm strategy and offer', description: 'Tell us about your test value, consultation framing, pricing, specials, and any packages you run. We need to be appraised of anything you have going on so our copy reflects your actual approach.', dueLabel: 'DUE BY DAY 4', initialStatus: 'completed' },
      { id: 't4', urgency: 'action_required', title: 'Confirm campaign focus', description: 'TRT only, or do you want us running ED, peptides, weight loss, or other service lines? Spend level helps us decide.', dueLabel: 'DUE BY DAY 4', initialStatus: 'completed' },
      { id: 't5', urgency: 'action_required', title: 'Approve new lead messaging', description: 'We have drafted your new lead nurture messaging. Review and approve so we can finalize your GHL automations before launch.', dueLabel: 'DUE TOMORROW', initialStatus: 'pending' },
      { id: 't6', urgency: 'action_required', title: 'Confirm lead handling preferences', description: 'If you are using your own booking team, tell us what automations best support their workflow. If you are using ours, complete the questionnaire below.', dueLabel: 'DUE TOMORROW', initialStatus: 'pending' },
      { id: 't7', urgency: 'action_required', title: 'Confirm GHL setup and pipelines', description: 'Walk through your GHL opportunities and pipelines with us. We may have cleanup to do before launch.', dueLabel: 'DUE BY DAY 6', initialStatus: 'pending' },
      { id: 't8', urgency: 'optional', title: 'Confirm location and demographic specifics', description: 'Mostly blue collar or lots of executives, more suburban or urban, big retirement community or younger professionals. The more specific the better.', dueLabel: 'OPTIONAL', initialStatus: 'pending' },
      { id: 't9', urgency: 'optional', title: 'Upload clinic photos to your Google Drive folder', description: 'High-resolution interior and exterior photos. We use these in your creative library. Upload to the Drive folder we shared with you.', dueLabel: 'OPTIONAL', initialStatus: 'pending', formUrl: '#google-drive-folder-placeholder', formCtaLabel: 'Open Drive folder' },
      { id: 't10', urgency: 'optional', title: 'Complete booking team questionnaire', description: 'If RevSpark will run your booking team, complete this questionnaire so they have what they need on day one.', dueLabel: 'OPTIONAL', initialStatus: 'pending', formUrl: '#booking-team-questionnaire-placeholder', formCtaLabel: 'Open questionnaire' },
    ],
    buildItems: [
      { id: 'b1', name: 'Meta Campaigns', description: 'Three creative variants drafted and queued for launch.', status: 'awaiting_launch' },
      { id: 'b2', name: 'Google Ads', description: 'Search and Performance Max campaigns built, awaiting your final approval.', status: 'awaiting_launch' },
      { id: 'b3', name: 'GHL Setup', description: 'Eliza booking workflows imported, nurture sequences customized, opportunities and pipelines configured.', status: 'in_progress' },
      { id: 'b4', name: 'Email/SMS Sequences', description: 'Standard nurture and re-engagement sequences customized for your offer and lead messaging.', status: 'in_progress' },
      { id: 'b5', name: 'Landing Pages', description: 'Pages drafted and ready for your review before launch.', status: 'awaiting_launch' },
      { id: 'b6', name: 'Tracking & Pixels', description: 'Meta and Google pixels wired and tested on your booking flow.', status: 'launched' },
      { id: 'b7', name: 'Agency Analytics Setup', description: 'Your dashboard is being provisioned. Access details coming with your launch-day walkthrough.', status: 'in_progress' },
    ],
    adminCheckpoints: [
      { id: 'a1', label: 'Meta ad account and page access granted', description: 'Corporate granted RevSpark managed access to your Meta Business Manager and Page.', granted: true, grantedAtLabel: 'Day 3' },
      { id: 'a2', label: 'Google Ads account number provided', description: 'Corporate sent the Google Ads account number for our MCC linking request.', granted: true, grantedAtLabel: 'Day 3' },
      { id: 'a3', label: 'Google Ads MCC link approved', description: 'Corporate approved our MCC linking request. Account is now under management.', granted: true, grantedAtLabel: 'Day 4' },
      { id: 'a4', label: 'GHL sub-account access granted', description: 'Corporate provided your dedicated GHL sub-account access.', granted: true, grantedAtLabel: 'Day 3' },
      { id: 'a5', label: 'GMB access granted', description: 'Corporate granted RevSpark access to your Google Business Profile.', granted: true, grantedAtLabel: 'Day 3' },
      { id: 'a6', label: 'Official territory map provided', description: 'Corporate sent your official service area map for ad targeting.', granted: true, grantedAtLabel: 'Day 3' },
    ],
  },

  'gameday-aventura-demo': {
    slug: 'gameday-aventura-demo',
    contactName: 'Sample Aventura',
    clinicName: "Gameday Men's Health",
    city: 'Aventura', state: 'FL',
    am: MICHELLE,
    launch: {
      currentStage: 'agency_change_submitted', dayOfTotal: 1, totalDays: 7, daysUntilLive: 6,
      targetLaunchDate: 'May 8',
    },
    countdown: {
      bigNumber: '6', bigNumberLabel: 'BUSINESS DAYS UNTIL YOUR ADS GO LIVE',
      bodyText: 'You just submitted your agency change form to corporate. Once they grant access (allow up to 5 business days), we kick off campaign builds, GHL setup, and landing page customization.',
    },
    tasks: [
      { id: 't1', urgency: 'action_required', title: 'Submit agency change form to corporate', description: 'Corporate needs your signed agency change form before they can grant access. Allow up to 5 business days after submission.', dueLabel: 'COMPLETE', initialStatus: 'completed', formUrl: '#agency-change-form-placeholder', formCtaLabel: 'Open form' },
      { id: 't2', urgency: 'action_required', title: 'Confirm ad spend', description: 'Confirm your monthly ad spend so we can right-size your campaigns and channel mix.', dueLabel: 'DUE BY DAY 3', initialStatus: 'pending' },
      { id: 't3', urgency: 'action_required', title: 'Confirm strategy and offer', description: 'Tell us about your test value, consultation framing, pricing, specials, and any packages you run.', dueLabel: 'DUE BY DAY 4', initialStatus: 'pending' },
      { id: 't4', urgency: 'action_required', title: 'Confirm campaign focus', description: 'TRT only, or other service lines too. Spend level helps us decide.', dueLabel: 'DUE BY DAY 4', initialStatus: 'pending' },
      { id: 't5', urgency: 'optional', title: 'Confirm location and demographic specifics', description: 'Tell us about your customer base. The more specific, the better our targeting.', dueLabel: 'OPTIONAL', initialStatus: 'pending' },
    ],
    buildItems: [
      { id: 'b1', name: 'Meta Campaigns', description: 'Pending corporate access grant.', status: 'pending' },
      { id: 'b2', name: 'Google Ads', description: 'Pending corporate access grant and MCC link.', status: 'pending' },
      { id: 'b3', name: 'GHL Setup', description: 'Pending GHL sub-account access from corporate.', status: 'pending' },
      { id: 'b4', name: 'Email/SMS Sequences', description: 'Pending strategy confirmation.', status: 'pending' },
      { id: 'b5', name: 'Landing Pages', description: 'Pending strategy and offer confirmation.', status: 'pending' },
      { id: 'b6', name: 'Tracking & Pixels', description: 'Pending Meta access and domain setup.', status: 'pending' },
      { id: 'b7', name: 'Agency Analytics Setup', description: 'Will provision once campaigns are live.', status: 'pending' },
    ],
    adminCheckpoints: [
      { id: 'a1', label: 'Meta ad account and page access granted', description: 'Corporate grants RevSpark managed access to your Meta Business Manager and Page.', granted: false },
      { id: 'a2', label: 'Google Ads account number provided', description: 'Corporate sends the Google Ads account number for our MCC linking request.', granted: false },
      { id: 'a3', label: 'Google Ads MCC link approved', description: 'Corporate approves our MCC linking request.', granted: false },
      { id: 'a4', label: 'GHL sub-account access granted', description: 'Corporate provides your dedicated GHL sub-account access.', granted: false },
      { id: 'a5', label: 'GMB access granted', description: 'Corporate grants RevSpark access to your Google Business Profile.', granted: false },
      { id: 'a6', label: 'Official territory map provided', description: 'Corporate sends your official service area map for ad targeting.', granted: false },
    ],
  },

  'gameday-corona-demo': {
    slug: 'gameday-corona-demo',
    contactName: 'Sample Corona',
    clinicName: "Gameday Men's Health",
    city: 'Corona', state: 'CA',
    am: MICHELLE,
    launch: {
      currentStage: 'live', dayOfTotal: 7, totalDays: 7, daysUntilLive: 0,
      targetLaunchDate: 'Apr 24',
    },
    countdown: {
      bigNumber: 'LIVE', bigNumberLabel: 'YOUR ADS ARE RUNNING',
      bodyText: 'Your campaigns went live April 24. Your performance dashboard activates after 7 days of data. Michelle will check in this Thursday.',
    },
    tasks: [
      { id: 't1', urgency: 'optional', title: 'Schedule your week-1 review', description: 'Michelle will walk you through your first week of performance data.', dueLabel: 'OPTIONAL', initialStatus: 'pending' },
    ],
    buildItems: [
      { id: 'b1', name: 'Meta Campaigns', description: 'Three variants live. Optimization underway.', status: 'launched' },
      { id: 'b2', name: 'Google Ads', description: 'Search and PMax live across both clinics.', status: 'launched' },
      { id: 'b3', name: 'GHL Setup', description: 'Configured and tested.', status: 'launched' },
      { id: 'b4', name: 'Email/SMS Sequences', description: 'Live and sending.', status: 'launched' },
      { id: 'b5', name: 'Landing Pages', description: 'Live and converting.', status: 'launched' },
      { id: 'b6', name: 'Tracking & Pixels', description: 'Full attribution flowing.', status: 'launched' },
      { id: 'b7', name: 'Agency Analytics Setup', description: 'Dashboard live. Access details sent in your launch-day email.', status: 'launched' },
    ],
    adminCheckpoints: [
      { id: 'a1', label: 'Meta ad account and page access granted', description: 'Corporate granted RevSpark managed access to your Meta Business Manager and Page.', granted: true, grantedAtLabel: 'Day 2' },
      { id: 'a2', label: 'Google Ads account number provided', description: 'Corporate sent the Google Ads account number.', granted: true, grantedAtLabel: 'Day 2' },
      { id: 'a3', label: 'Google Ads MCC link approved', description: 'Corporate approved our MCC linking request.', granted: true, grantedAtLabel: 'Day 3' },
      { id: 'a4', label: 'GHL sub-account access granted', description: 'Corporate provided your dedicated GHL sub-account access.', granted: true, grantedAtLabel: 'Day 2' },
      { id: 'a5', label: 'GMB access granted', description: 'Corporate granted access to your Google Business Profile.', granted: true, grantedAtLabel: 'Day 2' },
      { id: 'a6', label: 'Official territory map provided', description: 'Corporate sent your official service area map.', granted: true, grantedAtLabel: 'Day 2' },
    ],
  },
};

export function getZeeBySlug(slug: string): ZeeData | null {
  return ZEES[slug] || null;
}

export function getAllZees(): ZeeData[] {
  return Object.values(ZEES);
}

export const FIELD_SOURCES = {
  currentStage: 'monday' as DataSource,
  launchDate: 'monday' as DataSource,
  tasks: 'monday' as DataSource,
  buildItems: 'monday' as DataSource,
  adminCheckpoints: 'portal_admin' as DataSource,
};
