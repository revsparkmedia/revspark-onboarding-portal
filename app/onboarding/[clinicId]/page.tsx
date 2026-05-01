import OnboardingClient from './onboarding-client';

interface PageProps {
  params: Promise<{ clinicId: string }>;
}

export default async function OnboardingPage({ params }: PageProps) {
  const { clinicId } = await params;
  return <OnboardingClient clinicId={clinicId} />;
}
