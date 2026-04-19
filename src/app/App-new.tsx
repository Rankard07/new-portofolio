/* import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-serif">
          Project Portofolio Randi
        </h1>
        <p className="text-slate-600 mb-6">
          Tailwind dan Shadcn sudah aktif! Siap
          untuk mulai ngoding.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Lihat Proyek
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
 */

import { Navbar } from "@/components/ui/created/Navbar";
import { AboutSection } from "@/pages/AboutSection";
import { ContactSection } from "@/pages/ContactSection";
import { HeroSection } from "@/pages/HeroSection";
import { ProjectsSection } from "@/pages/ProjectSection";
import { SkillsSection } from "@/pages/SkillSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Your
            Name. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
