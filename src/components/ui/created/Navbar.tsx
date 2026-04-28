import { useState } from "react";
import {
  Code2,
  Mail,
  ExternalLink,
  ChevronDown,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileHamburger } from "./MobileHamburger";
// import ThemeModeToggle from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ListItem } from "@/components/ui/created/ListItem";
import { FaLinkedinIn } from "react-icons/fa";
import {
  PAGES,
  DEFAULT_CONTACT_ITEMS,
} from "./navbar-config";
import { AnimatedThemeToggler } from "../animated-theme-toggler";
import { motion } from "motion/react";
// import { PulsatingButton } from "@/components/ui/pulsating-button";
// import { ShineBorder } from "../shine-border";g
import { Button } from "../button";

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

const DEFAULT_LOGO: NavbarLogo = {
  title: "Your Name",
  icon: <Code2 className="text-primary" size={24} />,
};

// Icon mapping for desktop Contact dropdown
const DESKTOP_CONTACT_ICONS: Record<
  string,
  React.ReactNode
> = {
  Email: <Mail size={16} />,
  LinkedIn: <FaLinkedinIn size={16} />,
  GitHub: <ExternalLink size={16} />,
};

// ============================================
// SUB-COMPONENT: Desktop Contact Dropdown
// ============================================

function ContactDropdown() {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Contact
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                {DEFAULT_CONTACT_ITEMS.map(
                  (item, index) => (
                    <ListItem key={index} href={item.href}>
                      <a className="flex items-center gap-2">
                        {DESKTOP_CONTACT_ICONS[
                          item.label
                        ] ?? <ExternalLink size={16} />}
                        {item.label}
                      </a>
                    </ListItem>
                  ),
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

// ============================================
// SUB-COMPONENT: CV Download
// ============================================

function CVDownload() {
  return (
    // <div
    //   className="relative inline-block rounded-full
    //   hover:scale-105
    //   active:scale-95
    //   transition-all
    //   duration-300
    //   hover:bg-gradient-to-r
    //   hover:from-violet-600
    //   hover:via-fuchsia-600
    //   hover:to-pink-600
    // "
    // >
    // <ShineBorder
    //   shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    //   duration={7}
    //   borderWidth={3}
    // />
    <div className="btn-conic-border btn-conic-border-fast">
      <Button
        className="
          border-4 border-double border-muted
          bg-linear-to-r 
          from-violet-600 via-fuchsia-600 to-pink-600 
          hover:from-violet-900 hover:via-fuchsia-900 hover:to-pink-900 
          dark:from-purple-900 dark:via-fuchsia-900 dark:to-pink-900 
          dark:hover:from-purple-700 dark:hover:via-fuchsia-700 dark:hover:to-pink-700
          text-white font-semibold text-sm
          px-5 py-2.5 rounded-full gap-2  
          transition duration-300
          dark:hover:shadow-[0_0_40px_rgba(160,124,254,1),0_0_120px_rgba(254,143,181,0.4)]
          hover:shadow-[0_0_40px_rgba(160,124,254,1),0_0_120px_rgba(254,143,181,0.4)]
          "
        onClick={() => {
          // TODO: Ganti dengan path CV yang sesungguhnya
          window.open("/cv.pdf", "_blank");
        }}
      >
        <FileText size={18} />
        Download CV
      </Button>
    </div>
    // </div>
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
        {PAGES.map((page) => (
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
        ))}
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
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo Section - Left */}
            <div
              className={cn(
                "flex items-center gap-2",
                logo.className,
              )}
            >
              {logo.icon}
              <span className="font-medium">
                {logo.title}
              </span>
            </div>

            {/* Center Navigation - Desktop: Pill Toggle, Mobile: Dropdown */}
            <div className="flex flex-1 justify-center items-center">
              {/* Desktop Pill Toggle with Sliding Animation */}
              <div className="hidden md:flex items-center gap-0 bg-muted/50 rounded-full p-1 border border-border/50 relative">
                {PAGES.map((page) => (
                  <button
                    key={page.id}
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
                      </>
                    )}

                    <span className="relative z-10">
                      {page.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Mobile Page Dropdown - Center */}
              <div className="flex items-center gap-2 md:hidden">
                <MobilePageDropdown
                  activePage={activePage}
                  onPageChange={onPageChange}
                />
                <CVDownload />
              </div>
            </div>

            {/* Right Navigation - Desktop: Contact Dropdown + Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <CVDownload />
              <ContactDropdown />
              {/* <ThemeModeToggle /> */}
              <AnimatedThemeToggler />
            </div>

            {/* Mobile Controls - Contact Hamburger + Theme Toggle */}
            <div className="md:hidden flex items-center gap-2">
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
