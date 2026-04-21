import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface NavItem {
  title: string;
  href: string;
}

interface MobileHamburgerProps {
  items?: NavItem[];
}

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

export function MobileHamburger({
  items = DEFAULT_NAV_ITEMS,
}: MobileHamburgerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button with Smooth Rotation */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative h-6 w-6">
            <Menu
              className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-in-out ${
                isOpen
                  ? "rotate-90 opacity-0 scale-50"
                  : "rotate-0 opacity-100 scale-100"
              }`}
            />
            <X
              className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-in-out ${
                isOpen
                  ? "rotate-0 opacity-100 scale-100"
                  : "-rotate-90 opacity-0 scale-50"
              }`}
            />
          </div>
        </Button>
      </SheetTrigger>

      {/* Smoothly Sliding Content */}
      <SheetContent side="top" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-6">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="px-4 py-3 text-lg font-medium rounded-xl hover:bg-accent transition-colors"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
