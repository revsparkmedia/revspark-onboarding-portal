import { TopBar } from "@/app/components/TopBar";
import { WelcomeHeader } from "@/app/components/WelcomeHeader";
import { StatusTracker } from "@/app/components/StatusTracker";
import { InsightCard } from "@/app/components/InsightCard";
import { TaskPanel } from "@/app/components/TaskPanel";
import { AMCard } from "@/app/components/AMCard";
import { CreativeStrip } from "@/app/components/CreativeStrip";
import { KPIStrip } from "@/app/components/KPIStrip";
import { Footer } from "@/app/components/Footer";

export default function Page() {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <TopBar />
      <main className="relative z-10 max-w-6xl mx-auto px-8 pb-16 w-full">
        <WelcomeHeader />
        <StatusTracker />
        <div className="space-y-8 mt-12">
          <InsightCard />
          <TaskPanel />
          <AMCard />
          <CreativeStrip />
          <KPIStrip />
        </div>
      </main>
      <Footer />
    </>
  );
}
