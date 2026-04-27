import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/ui/created/theme-provider";
import { Navbar } from "@/components/ui/created/Navbar";
import { PAGES } from "@/components/ui/created/navbar-config";
import { HeroSection } from "@/pages/HeroSection";
import { AboutSection } from "@/pages/AboutSection";
import { SkillsSection } from "@/pages/SkillSection";
import { ProjectsSection } from "@/pages/ProjectSection";
import { GallerySection } from "@/pages/GallerySection";
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

  const allPageIds = PAGES.map((p) => p.id) as [Page, ...Page[]];

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

    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        {/* Navbar */}
        <Navbar
          activePage={page}
          onPageChange={handlePageChange}
          className="w-full"
        />

        {/* Table of Contents - only on Home page */}
        {/* {page === "home" && <TableOfContents />} */}

        {/* Page Content with Slide Animation */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={pageVariants}
              initial={isFirstLoad ? "firstLoad" : "initial"}
              // initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                visualDuration: 0.7,
                delay: isFirstLoad ? 0.2 : 0,
              }}
              className="w-full"
            >
              {page === "home" && (
                <div className="max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8">
                  <ProjectsSection />
                </div>
              )}

              {page === "gallery" && (
                <div className="max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8">
                  <GallerySection />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
