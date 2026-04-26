import { useState } from "react";
import { Code2, Mail, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileHamburger } from "./MobileHamburger";
import ThemeModeToggle from "./ModeToggle";
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
import { PAGES, DEFAULT_CONTACT_ITEMS } from "./navbar-config";

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
const DESKTOP_CONTACT_ICONS: Record<string, React.ReactNode> = {
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
            <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                {DEFAULT_CONTACT_ITEMS.map((item, index) => (
                  <ListItem key={index} href={item.href}>
                    <a className="flex items-center gap-2">
                      {DESKTOP_CONTACT_ICONS[item.label] ?? (
                        <ExternalLink size={16} />
                      )}
                      {item.label}
                    </a>
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
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
  const activeLabel = PAGES.find((p) => p.id === activePage)?.label ?? "Menu";

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
      <DropdownMenuContent align="center" className="min-w-35">
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

/* function ContactDropdown() {
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
} */

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
          {/* Logo Section - Left */}
          <div className={cn("flex items-center gap-2", logo.className)}>
            {logo.icon}
            <span className="font-medium">{logo.title}</span>
          </div>

          {/* Center Navigation - Desktop: Pill Toggle, Mobile: Dropdown */}
          <div className="flex flex-1 justify-center items-center">
            {/* Desktop Pill Toggle */}
            <div className="hidden md:flex items-center gap-0 bg-muted/50 rounded-full p-1 border border-border/50 relative">
              {PAGES.map((page) => (
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

            {/* Mobile Page Dropdown - Center */}
            <div className="md:hidden">
              <MobilePageDropdown
                activePage={activePage}
                onPageChange={onPageChange}
              />
            </div>
          </div>

          {/* Right Navigation - Desktop: Contact Dropdown + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ContactDropdown />
            <ThemeModeToggle />
          </div>

          {/* Mobile Controls - Contact Hamburger + Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeModeToggle />
            <MobileHamburger />
          </div>
        </div>
      </div>
    </nav>
  );
}
