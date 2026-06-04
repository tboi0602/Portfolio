import { Navbar } from "@/components/navbar";
import { SunriseRay } from "@/components/sunrise-ray";
import { CursorGlow } from "@/components/cursor-glow";
import { IntroGate } from "@/components/intro-gate";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { ParticleBg } from "@/components/particle-bg";
import { GridBg } from "@/components/grid-bg";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IntroGate>
      <SmoothScroll>
        <ParticleBg />
        <GridBg />
        <ScrollProgress />
        <Navbar />
        <SunriseRay />
        <CursorGlow />
        <main className="flex-1">{children}</main>
        <Footer />
      </SmoothScroll>
    </IntroGate>
  );
}
