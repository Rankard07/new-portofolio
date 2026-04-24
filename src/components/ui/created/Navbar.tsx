import { Code2, ChevronDown, Mail, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileHamburger } from "./MobileHamburger";
import ThemeModeToggle from "./ModeToggle";
import { useState, useRef, useEffect } from "react";

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
  activePage?: "home" | "project" | "gallery";
  onPageChange?: (page: "home" | "project" | "gallery") => void;
  className?: string;
}

// ============================================
// CONSTANTS (Configuration Data)
// ============================================

const DEFAULT_LOGO: NavbarLogo = {
  title: "Your Name",
  icon: <Code2 className="text-primary" size={24} />,
};

const CENTER_PAGES: { id: "home" | "project" | "gallery"; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "project", label: "Project" },
  { id: "gallery", label: "Gallery" },
];

// ============================================
// SUB-COMPONENT: Contact Dropdown
// ============================================

function ContactDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors"
      >
        Contact
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            <ExternalLink size={16} /> LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            <ExternalLink size={16} /> GitHub
          </a>
          <a
            href="mailto:email@example.com"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Mail size={16} /> Email
          </a>
        </div>
      )}
    </div>
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
    <nav
      className={cn(
        "sticky top-0 z-50 bg-background/80 backdrop-blur-sm w-full",
        className,
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo Section - Kiri */}
          <div className={cn("flex items-center gap-2", logo.className)}>
            {logo.icon}
            <span className="font-medium">{logo.title}</span>
          </div>

          {/* Center Navigation - Pill Toggle */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center gap-0 bg-muted/50 rounded-full p-1 border border-border/50 relative">
              {CENTER_PAGES.map((page) => (
                <button
                  key={page.id}
                  onClick={() => onPageChange?.(page.id)}
                  className={cn(
                    "relative px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                    activePage === page.id
                      ? "bg-muted text-muted-foreground animate-pulse"
                      : "",
                  )}
                >
                  {/* --- EFEK SINAR (Hanya muncul jika aktif) --- */}
                  {activePage === page.id && (
                    <>
                      {/* Sinar Inti - Sangat Terang */}
                      <span className="absolute animate-pulse top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.9),0_0_15px_5px_rgba(255,255,255,0.4)] z-10" />

                      {/* Pendaran Atmosfer (Aura) - Lebih Luas */}
                      <span className="absolute animate-pulse top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/40 blur-md rounded-full opacity-80" />
                    </>
                  )}

                  {page.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Navigation - Contact Dropdown + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ContactDropdown />
            <ThemeModeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <ThemeModeToggle />
            <MobileHamburger
              items={[
                { title: "Home", href: "#home" },
                { title: "Project", href: "#project" },
                { title: "Gallery", href: "#gallery" },
              ]}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
