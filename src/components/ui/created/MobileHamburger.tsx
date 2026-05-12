import { useState } from "react";
import {
  Menu,
  X,
  Mail,
  ExternalLink,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FaLinkedinIn } from "react-icons/fa";
import {
  type ContactItem,
  DEFAULT_CONTACT_ITEMS,
} from "./navbar-config";
import { ConicBorderWrapper } from "./ConicBorderWrapper";
import { GlowingAnimatedBG } from "./GlowingAnimatedBG";

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
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col items-center gap-2 mt-6 w-full">
          {/* <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-xl hover:bg-accent transition-colors"
          >
            <FileText size={18} />
            Download CV
          </a> */}
          <GlowingAnimatedBG>
            <ConicBorderWrapper>
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
                    transition-all duration-300
                    w-fit mx-auto
                    
                    // ark:hover:hadow-[0_0_40px_rgba(160,124,254,1),0_0_120px_rgba(254,143,181,0.4)]
                    // over:hadow-[0_0_40px_rgba(160,124,254,1),0_0_120px_rgba(254,143,181,0.4)]
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
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-xl hover:bg-accent transition-colors w-full justify-center"
            >
              {CONTACT_ICON_MAP[item.label] ?? (
                <ExternalLink size={18} />
              )}
              {item.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
