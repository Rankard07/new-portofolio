import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
        visualDuration: 0.4,
        bounce: 0.6,
      }}
      className={cn(
        "sticky bottom-0 z-50 bg-background/80 backdrop-blur-sm w-full",
        className,
      )}
    >
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>
            &copy;
            {/* {new Date().getFullYear()} */}
            2026 Randi. Built on React + Vite + TypeScript & Tailwind CSS.
          </p>
        </div>
      </footer>
    </motion.nav>
  );
}
