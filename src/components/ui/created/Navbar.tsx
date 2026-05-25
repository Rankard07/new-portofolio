import { useState, useEffect } from "react";
import {
  ChevronDown,
  Code2,
  FileText,
  Home,
  FolderGit2,
  Sparkles,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileHamburger } from "./MobileHamburger";
// import ThemeModeToggle from "./ModeToggle";
import { AnimatedThemeToggler } from "../animated-theme-toggler";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

import { GlowingAnimatedBG } from "./GlowingAnimatedBG";
import { ConicBorderWrapper } from "./ConicBorderWrapper";
import { PAGES } from "./navbar-config";

// ============================================
// INTERFACES (Type Definitions)
// ============================================

interface NavbarLogo {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

interface NavbarProps {
  logo?: NavbarLogo;
  activePage?: string;
  onPageChange?: (page: string) => void;
  className?: string;
}

// ============================================
// CONSTANTS (Configuration Data)
// ============================================

// const DEFAULT_LOGO_TITLE = "Zahran";
// const DEFAULT_LOGO: NavbarLogo = {
//   title: DEFAULT_LOGO_TITLE,
//   icon: (
//     <span className="text-primary font-mono font-semibold">
//       &lt;{DEFAULT_LOGO_TITLE}/&gt;
//     </span>
//   ),
// };
const DEFAULT_LOGO: NavbarLogo = {
  title: "Zahran",
  icon: <Code2 className="text-primary" size={24} />,
};

// Mapping ID Halaman ke Icon yang sesuai untuk efek floating di Navbar
const PAGE_ICONS: Record<string, React.ReactNode> = {
  home: <Home size={14} />,
  project: <FolderGit2 size={14} />,
  contact: <Mail size={14} />,
  other: <Sparkles size={14} />,
};

// ============================================
// SUB-COMPONENT: CV Download
// ============================================

function CVDownload() {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <GlowingAnimatedBG>
        <ConicBorderWrapper>
          <Button
            className="
          border-4 border-double border-muted
          bg-linear-to-r 
          from-violet-600 via-fuchsia-600 o-pink-600 
          hover:from-violet-900 hover:via-fuchsia-900 over:to-pink-900 
          dark:from-purple-900 dark:via-fuchsia-900 ark:to-pink-900 
          dark:hover:from-purple-700 dark:hover:via-fuchsia-700 ark:hover:to-pink-700
          text-white font-semibold text-sm
          px-5 py-2.5 rounded-full gap-2  
          transition-all duration-300

          "
            onClick={() => {
              // TODO: Ganti dengan path CV yang sesungguhnya
              window.open(
                "/Resume-CV.Haltev.pdf",
                "_blank",
              );
            }}
          >
            <FileText size={18} />
            Download CV
          </Button>
        </ConicBorderWrapper>
      </GlowingAnimatedBG>
    </motion.div>
  );
}

// ============================================
// SUB-COMPONENT: Mobile Page Dropdown (Center)
// ============================================

function MobilePageDropdown({
  activePage,
  onPageChange,
}: {
  activePage?: string;
  onPageChange?: (page: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeLabel =
    PAGES.find((p) => p.id === activePage)?.label ?? "Menu";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
        {activeLabel}
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="min-w-35"
      >
        {PAGES.filter((page) => page.id !== "contact").map(
          (page) => (
            <DropdownMenuItem
              key={page.id}
              onClick={() => {
                onPageChange?.(page.id);
                setOpen(false);
              }}
              className={cn(
                "cursor-pointer",
                activePage === page.id && "bg-accent",
              )}
            >
              {page.label}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Navbar({
  logo = DEFAULT_LOGO,
  activePage = "home",
  onPageChange,
  className,
}: NavbarProps) {
  // State untuk mengontrol kemunculan otomatis dan hover
  const [showOtherHint, setShowOtherHint] = useState(false);
  const [isHoveringOther, setIsHoveringOther] =
    useState(false);

  // Logika untuk menampilkan hint secara otomatis saat pertama kali load (selama beberapa detik)
  useEffect(() => {
    if (activePage !== "other") {
      // Muncul setelah 2 detik
      const showTimer = setTimeout(
        () => setShowOtherHint(true),
        2000,
      );
      // Hilang setelah 5 detik (tampil selama 5 detik)
      const hideTimer = setTimeout(
        () => setShowOtherHint(false),
        5000,
      );

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [activePage]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
        visualDuration: 0.4,
        bounce: 0.6,
      }}
      className={cn("sticky top-0 z-50 w-full", className)}
    >
      <nav>
        <div className="w-full px-2 sm:px-4 lg:px-8">
          <div className="flex items-center h-14 sm:h-16">
            {/* Logo Section - Left */}
            <div
              className={cn(
                "flex items-center gap-2 shrink-0 max-w-30",
                logo.className,
              )}
            >
              {/* {logo.icon && (
                <div className="hidden sm:block">
                  {logo.icon}
                </div>
              )} */}
              <span className="text-2xl text-blue-400">
                &lt;
              </span>
              <span className="font-medium text-base sm:text-2xl ">
                {logo.title}
              </span>
              <span className="text-2xl text-blue-400">
                /&gt;
              </span>
            </div>

            {/* START -Center Navigation - Desktop: Pill Toggle, Mobile: Dropdown */}
            <div className="flex flex-1 justify-center items-center">
              {/* Desktop Pill Toggle with Sliding Animation */}
              <div className="hidden md:flex items-center gap-0 bg-muted/50 rounded-full p-1 border border-border/50 relative">
                {PAGES.map((page) => (
                  <button
                    key={page.id}
                    onMouseEnter={() => {
                      if (page.id === "other")
                        setIsHoveringOther(true);
                    }}
                    onMouseLeave={() => {
                      if (page.id === "other")
                        setIsHoveringOther(false);
                    }}
                    onClick={() => onPageChange?.(page.id)}
                    className={cn(
                      "relative px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
                      activePage === page.id
                        ? "bg-muted-foreground text-background animate-pulse"
                        : "text-foreground hover:text-foreground/80",
                    )}
                  >
                    {/* Sliding Background Pill */}
                    {activePage === page.id && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-muted-foreground rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                          bounce: 0,
                        }}
                      />
                    )}

                    {/* --- EFEK SINAR (Hanya muncul jika aktif) --- */}
                    {activePage === page.id && (
                      <>
                        {/* Sinar Inti - Sangat Terang */}
                        <motion.span
                          layoutId="glowCore"
                          className="absolute animate-pulse top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-foreground dark:bg-white rounded-full shadow-[0_0_8px_2px_rgba(0,0,0,0.5),0_0_15px_5px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_2px_rgba(255,255,255,0.9),0_0_15px_5px_rgba(255,255,255,0.4)] z-10"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            bounce: 0,
                          }}
                        />

                        {/* Pendaran Atmosfer (Aura) - Lebih Luas */}
                        <motion.span
                          layoutId="glowAura"
                          className="absolute animate-pulse top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-foreground/30 dark:bg-white/40 blur-md rounded-full opacity-80"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />

                        {/* Icon Floating di bawah tombol yang aktif */}
                        <motion.div
                          layoutId="activeIconTab"
                          initial={{
                            opacity: 0,
                            y: -5,
                            x: "-50%",
                          }}
                          animate={{
                            opacity: 1,
                            y: 34,
                            x: "-50%",
                          }} // Menambahkan x: -50% agar tetap di tengah
                          transition={{
                            default: {
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            },
                          }}
                          className="navbar-active-icon bg-muted/40 text-background animate-pulse"
                        >
                          {/* Elemen Icon yang melakukan floating di dalam tab */}
                          <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              ease: "easeInOut",
                            }}
                            className="flex items-center justify-center scale-150"
                          >
                            {PAGE_ICONS[page.id]}
                          </motion.div>
                        </motion.div>
                      </>
                    )}

                    <span className="relative z-10">
                      {page.label}
                    </span>

                    {/* POP-UP Hint khusus untuk tombol 'Other' saat sedang tidak di page Other */}
                    <AnimatePresence>
                      {page.id === "other" &&
                        activePage !== "other" &&
                        (showOtherHint ||
                          isHoveringOther) && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: 10,
                              scale: 0.8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              y: 10,
                              scale: 0.8,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                            className="absolute top-full mt-5 left-1/2 -translate-x-1/2 px-3 py-2 bg-primary rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] border border-primary-foreground/20 whitespace-nowrap pointer-events-none z-50"
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-[9px] font-black text-primary-foreground/60 uppercase tracking-widest leading-none mb-1">
                                New Spot!
                              </span>
                              <div className="flex items-center gap-1.5">
                                <div className="bg-primary-foreground/20 p-1 rounded-md">
                                  <Sparkles
                                    size={12}
                                    className="text-primary-foreground animate-pulse"
                                  />
                                </div>
                                <span className="text-[11px] text-primary-foreground font-bold tracking-tight">
                                  Certificate is Here
                                </span>
                              </div>
                            </div>
                            {/* Tooltip Arrow (Panah ke atas sekarang) */}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-primary rotate-45" />
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>

              {/* Mobile Page Dropdown - Center */}
              <div className="flex flex-1 justify-center items-center md:hidden">
                <MobilePageDropdown
                  activePage={activePage}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
            {/* END - Center Navigation */}

            {/* Right Navigation - Desktop: CV Download + Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <CVDownload />
              {/* <ThemeModeToggle /> */}
              <AnimatedThemeToggler />
            </div>

            {/* Mobile Controls - Theme Toggle + Hamburger Only */}
            <div className="md:hidden flex items-center gap-1 shrink-0">
              {/* <ThemeModeToggle /> */}
              <AnimatedThemeToggler />
              <MobileHamburger />
            </div>
          </div>
        </div>
      </nav>
    </motion.nav>
  );
}
