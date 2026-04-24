export function CardHoverOverlays() {
  return (
    <>
      {/* Light mode hover overlay - pink/purple */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-fuchsia-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:hidden pointer-events-none"></div>
      {/* Dark mode hover overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-slate-800 to-slate-950 opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden dark:block pointer-events-none"></div>
      {/* Top-center shine line - light mode pink/purple */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-2/3 h-0.5 bg-linear-to-r from-transparent via-fuchsia-500/80 to-transparent blur-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:hidden pointer-events-none"></div>
      {/* Top-center glow area - light mode pink/purple */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-0 w-1/2 h-10 bg-fuchsia-500/25 blur-2xl rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:hidden pointer-events-none"></div>
      {/* Top-center shine line - dark mode blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-2/3 h-0.5 bg-linear-to-r from-transparent via-primary/80 to-transparent blur-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden dark:block pointer-events-none"></div>
      {/* Top-center glow area - dark mode blue */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-0 w-1/2 h-10 bg-primary/25 blur-2xl rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden dark:block pointer-events-none"></div>
    </>
  );
}
