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
import { KPIStrip } from '@/app/components/KPIStrip';
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
        <StatusTracker currentStage={zee.launch.currentStage} dayOfTen={zee.launch.dayOfTen} />
        <div className="space-y-12">
          <CountdownCard
            bigNumber={zee.countdown.bigNumber}
            bigNumberLabel={zee.countdown.bigNumberLabel}
            bodyText={zee.countdown.bodyText}
            dayOfTen={zee.launch.dayOfTen}
            amName={zee.am.name}
          />
          <TaskPanel tasks={zee.tasks} />
          <AdminCheckpoints checkpoints={zee.adminCheckpoints} />
          <AMCard am={zee.am} />
          <BuildStatus items={zee.buildItems} />
          <KPIStrip />
        </div>
      </main>
      <Footer />
      <DemoControls />
    </>
  );
}
