import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { SelectedWork } from "@/components/selected-work";
import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";
import { ScrollProgress } from "@/components/scroll-progress";
import { AIChat } from "@/components/ai-chat";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main className="grain">
        <Hero />
        <About />
        <SelectedWork />
        <TechStack />
        <Contact />
      </main>
      <AIChat />
    </>
  );
}
