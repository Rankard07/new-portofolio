import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

const HOME_SECTIONS: TocItem[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    HOME_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-xs font-medium text-muted-foreground mb-3 px-2 uppercase tracking-wider">
          On this page
        </p>
        <nav className="flex flex-col gap-1">
          {HOME_SECTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-left text-sm px-2 py-1.5 rounded-md transition-colors duration-200",
                activeId === item.id
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
