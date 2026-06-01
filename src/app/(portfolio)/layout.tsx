import { Navbar } from "@/components/navbar";
import { SunriseRay } from "@/components/sunrise-ray";
import { CursorGlow } from "@/components/cursor-glow";
import { PageIntro } from "@/components/page-intro";
import { Footer } from "@/components/footer";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageIntro />
      <Navbar />
      <SunriseRay />
      <CursorGlow />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
