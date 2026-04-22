// import { useState } from "react";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileHamburger } from "./MobileHamburger";
import ThemeModeToggle from "./ModeToggle";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

// ============================================
// INTERFACES (Type Definitions)
// ============================================

interface NavItem {
  title: string;
  href: string;
}

interface NavbarLogo {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

interface NavbarProps {
  logo?: NavbarLogo;
  items?: NavItem[];
  className?: string;
}

// ============================================
// CONSTANTS (Configuration Data)
// ============================================

const DEFAULT_LOGO: NavbarLogo = {
  title: "Your Name",
  icon: <Code2 className="text-primary" size={24} />,
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Skills",
    href: "#skills",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

// ============================================
// SUB-COMPONENTS
// ============================================

/* function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-accent transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
} */

// ============================================
// MAIN COMPONENT
// ============================================

export function Navbar({
  logo = DEFAULT_LOGO,
  items = DEFAULT_NAV_ITEMS,
  className,
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className={cn("flex items-center gap-2", logo.className)}>
            {logo.icon}
            <span className="font-medium">{logo.title}</span>
          </div>

          {/* Desktop Navigation using NavigationMenu */}
          <div className="hidden md:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                {items.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild href={item.href}>
                      <a className="hover:text-primary transition-colors">
                        {item.title}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <ThemeModeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeModeToggle />
            <MobileHamburger items={items} />
          </div>
        </div>
      </div>
    </nav>
  );
}
