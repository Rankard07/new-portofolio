import { ThemeProvider } from "@/components/ui/created/theme-provider";
import { Navbar } from "@/components/ui/created/Navbar";
import { HeroSection } from "@/pages/HeroSection";
import { AboutSection } from "@/pages/AboutSection";
import { SkillsSection } from "@/pages/SkillSection";
// import { ContactSection } from "@/pages/ContactSection";
// import { ProjectsSection } from "@/pages/ProjectSection";
import Footer from "@/pages/Footer";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        {/* Navbar */}
        <Navbar className="w-full" />

        {/* Section */}
        <div className="max-w-281.5 mx-auto ">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          {/* <ProjectsSection /> */}
          {/* <ContactSection /> */}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
