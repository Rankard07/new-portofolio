import { useState } from "react";
import { Menu, X, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FaLinkedinIn } from "react-icons/fa";
import { type ContactItem, DEFAULT_CONTACT_ITEMS } from "./navbar-config";

// Icon mapping by label (easy to extend)
const CONTACT_ICON_MAP: Record<string, React.ReactNode> = {
  Email: <Mail size={18} />,
  LinkedIn: <FaLinkedinIn size={18} />,
  GitHub: <ExternalLink size={18} />,
};

interface MobileHamburgerProps {
  contactItems?: ContactItem[];
}

export function MobileHamburger({
  contactItems = DEFAULT_CONTACT_ITEMS,
}: MobileHamburgerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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

      <SheetContent
        side="top"
        className="w-full max-w-md mx-auto rounded-b-2xl"
      >
        <SheetHeader>
          <SheetTitle>Contact</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-6">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-xl hover:bg-accent transition-colors"
            >
              {CONTACT_ICON_MAP[item.label] ?? <ExternalLink size={18} />}
              {item.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
