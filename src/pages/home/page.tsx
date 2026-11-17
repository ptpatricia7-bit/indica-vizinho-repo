import { useEffect } from "react";
import "@/pages/home/home.css";
import SiteNav from "@/pages/home/components/SiteNav";
import Chapter from "@/pages/home/components/Chapter";
import ManifestoPanel from "@/pages/home/components/ManifestoPanel";
import PlansPanel from "@/pages/home/components/PlansPanel";
import CyclePanel from "@/pages/home/components/CyclePanel";
import ChestPanel from "@/pages/home/components/ChestPanel";
import ProofPanel from "@/pages/home/components/ProofPanel";
import SignupPanel from "@/pages/home/components/SignupPanel";
import FaqSection from "@/pages/home/components/FaqSection";
import SiteFooter from "@/pages/home/components/SiteFooter";
import { initFilm } from "@/pages/home/hooks/useFilm";
import { initPanels } from "@/pages/home/hooks/usePanels";

export default function Home() {
  useEffect(() => {
    initFilm();
    initPanels();
  }, []);

  return (
    <div className="relative bg-background-50 text-foreground-950">
      <SiteNav />
      <main>
        <Chapter />
        <ManifestoPanel />
        <PlansPanel />
        <CyclePanel />
        <ChestPanel />
        <ProofPanel />
        <SignupPanel />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}