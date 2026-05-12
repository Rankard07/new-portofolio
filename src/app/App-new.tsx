import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/ui/created/theme-provider";
import { Navbar } from "@/components/ui/created/Navbar";
import { PAGES } from "@/components/ui/created/navbar-config";
import { HeroSection } from "@/pages/home/HeroSection";
import { AboutSection } from "@/pages/home/AboutSection";
import { SkillsSection } from "@/pages/home/SkillSection";
import { ProjectsSection } from "@/pages/project/ProjectSection";
import { OtherSection } from "@/pages/other/OtherSection";
// import { TableOfContents } from "@/components/ui/created/TableOfContents";
import Footer from "@/pages/Footer";
import { AnimatePresence, motion } from "motion/react";

type Page = (typeof PAGES)[number]["id"];

const pageVariants = {
  // Entry animation from left/right
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  // Where animation stop (middle)
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  // Exit animation to left/right
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),

  firstLoad: {
    // y: 40,
    opacity: 0,
    scale: 0.9,
  },
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [direction, setDirection] = useState(0);

  const allPageIds = PAGES.map((p) => p.id) as [
    Page,
    ...Page[],
  ];

  const handlePageChange = (newPage: string) => {
    if (!allPageIds.includes(newPage as Page)) return;
    const currentIndex = allPageIds.indexOf(page);
    const newIndex = allPageIds.indexOf(newPage as Page);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setPage(newPage as Page);
  };

  // Entry Animation
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Nonaktifkan scroll restoration browser
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Scroll ke atas saat pertama kali load
    window.scrollTo(0, 0);

    // Reset hash URL agar tidak stuck di #skills
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <div className="min-h-screen bg-background">
        {/* Navbar - Hidden on Other page */}
        {page !== "other" && (
          <Navbar
            activePage={page}
            onPageChange={handlePageChange}
            className="w-full"
          />
        )}

        {/* Table of Contents - only on Home page */}
        {/* {page === "home" && <TableOfContents />} */}

        {/* Page Content with Slide Animation */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={pageVariants}
              initial={
                isFirstLoad ? "firstLoad" : "initial"
              }
              // initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                // type: "tween",
                // duration: 4,
                type: "spring",
                stiffness: 100,
                damping: 20,
                visualDuration: 0.4,
                delay: isFirstLoad ? 0.2 : 0,
              }}
              className="w-full"
            >
              {page === "home" && (
                <div className="w-full max-w-[70rem] mx-auto px-2 sm:px-4 lg:px-8">
                  <div id="hero">
                    <HeroSection />
                  </div>
                  <div id="about">
                    <AboutSection />
                  </div>
                  <div id="skills">
                    <SkillsSection />
                  </div>
                </div>
              )}

              {page === "project" && (
                <div className="w-full max-w-[70rem] mx-auto px-2 sm:px-4 lg:px-8">
                  <ProjectsSection />
                </div>
              )}

              {page === "other" && (
                <OtherSection
                  onBack={() => handlePageChange("home")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer - Hidden on Other page */}
        {page !== "other" && <Footer />}
      </div>
    </ThemeProvider>
  );
}
