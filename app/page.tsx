import { MainSection } from "./components/main-section";
import { HeroSection } from "./components/hero-section";

export default function Home() {
  
  
  return (
    <div className="px-4 sm:px-8 py-8">
      <main>
        <HeroSection />
        <MainSection />
      </main>
    </div>
  );
}