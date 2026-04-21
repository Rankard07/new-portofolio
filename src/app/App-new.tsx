import { ThemeProvider } from "@/components/ui/created/theme-provider";
import { Navbar } from "@/components/ui/created/Navbar";
import { AboutSection } from "@/pages/AboutSection";
// import { ContactSection } from "@/pages/ContactSection";
// import { ProjectsSection } from "@/pages/ProjectSection";
import { HeroSection } from "@/pages/HeroSection";
import { SkillsSection } from "@/pages/SkillSection";
import Footer from "@/pages/Footer";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Navbar />

        <HeroSection />
        <AboutSection />
        <SkillsSection />
        {/* <ProjectsSection />
        <ContactSection /> */}

        <Footer />
      </div>
    </ThemeProvider>
  );
}
