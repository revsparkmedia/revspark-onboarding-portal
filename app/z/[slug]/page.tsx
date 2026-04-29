import { notFound } from 'next/navigation';
import { getZeeBySlug } from '@/app/data/zees';
import { TopBar } from '@/app/components/TopBar';
import { WelcomeHeader } from '@/app/components/WelcomeHeader';
import { StatusTracker } from '@/app/components/StatusTracker';
import { CountdownCard } from '@/app/components/CountdownCard';
import { TaskPanel } from '@/app/components/TaskPanel';
import { AMCard } from '@/app/components/AMCard';
import { BuildStatus } from '@/app/components/BuildStatus';
import { AdminCheckpoints } from '@/app/components/AdminCheckpoints';
import { Footer } from '@/app/components/Footer';
import { DemoControls } from '@/app/components/DemoControls';

export default async function ZeePortalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zee = getZeeBySlug(slug);

  if (!zee) {
    notFound();
  }

  return (
    <>
      <TopBar amName={zee.am.name} />
      <main className="max-w-6xl mx-auto px-6 md:px-8 pb-16">
        <WelcomeHeader
          clinicName={zee.clinicName}
          city={zee.city}
          state={zee.state}
          daysUntilLive={zee.launch.daysUntilLive}
        />
        <StatusTracker
          currentStage={zee.launch.currentStage}
          dayOfTotal={zee.launch.dayOfTotal}
          totalDays={zee.launch.totalDays}
        />
        <div className="space-y-12">
          <CountdownCard
            bigNumber={zee.countdown.bigNumber}
            bigNumberLabel={zee.countdown.bigNumberLabel}
            bodyText={zee.countdown.bodyText}
            dayOfTotal={zee.launch.dayOfTotal}
            totalDays={zee.launch.totalDays}
            amName={zee.am.name}
            amEmail={zee.am.email}
            clinicName={zee.clinicName}
            city={zee.city}
          />
          <AMCard am={zee.am} />
          <TaskPanel tasks={zee.tasks} />
          <AdminCheckpoints checkpoints={zee.adminCheckpoints} />
          <BuildStatus items={zee.buildItems} />
        </div>
      </main>
      <Footer />
      <DemoControls />
    </>
  );
}
