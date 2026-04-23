import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
// import React, { useRef, useEffect } from 'react';

export function HeroSection() {
  return (
    <section className="relative py-10 pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="bg-card border border-border rounded-xl p-8 lg:p-12 transition duration-500 ease-in-out hover:border-fuchsia-500/50 dark:hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 relative overflow-hidden group">
          {/* Light mode hover overlay - pink/purple */}
          <div className="absolute inset-0 bg-linear-to-b from-fuchsia-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:hidden pointer-events-none"></div>
          {/* Dark mode hover overlay — opacity transition ensures smooth in AND out */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-800 to-slate-950 opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden dark:block pointer-events-none"></div>
          {/* Top-center shine line - light mode pink/purple */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-linear-to-r from-transparent via-fuchsia-500/80 to-transparent blur-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:hidden pointer-events-none"></div>
          {/* Top-center glow area - light mode pink/purple */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1/2 h-10 bg-fuchsia-500/25 blur-2xl rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:hidden pointer-events-none"></div>
          {/* Top-center shine line - dark mode blue */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-linear-to-r from-transparent via-primary/80 to-transparent blur-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden dark:block pointer-events-none"></div>
          {/* Top-center glow area - dark mode blue */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1/2 h-10 bg-primary/25 blur-2xl rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden dark:block pointer-events-none"></div>
          <div className="relative flex flex-col lg:flex-row items-center gap-12">
            {/* Hero Content - Start */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge - Start */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-6">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm">Available for opportunities</span>
              </div>
              {/* Badge - End */}

              {/* Title - Start */}
              <h1 className="text-5xl lg:text-6xl mb-6">
                Front-End Developer &<br />
                <span className="text-primary">UI/UX Designer</span>
              </h1>
              {/* Title - End */}

              {/* Description - Start */}
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Fresh bootcamp graduate passionate about creating beautiful,
                user-centered web experiences. I transform designs into
                pixel-perfect, responsive interfaces.
              </p>
              {/* Description - End */}

              {/* Buttons - Start */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get In Touch
                </a>
                <Button asChild>
                  <a
                    href="#projects"
                    className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    View Projects
                  </a>
                </Button>
              </div>
              {/* Buttons - End */}
            </div>
            {/* Hero Content - End */}
            {/* Profile Image - Start */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent rounded-full blur-3xl"></div>
                <div className="relative w-full h-full bg-secondary rounded-full flex items-center justify-center text-8xl">
                  👨‍💻
                </div>
              </div>
            </div>
            {/* Profile Image - End */}
          </div>
        </div>
      </div>
    </section>
  );
}
