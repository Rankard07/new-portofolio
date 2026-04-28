import { cn } from "@/lib/utils";

interface ConicBorderWrapperProps {
  children: React.ReactNode;
  colors?: [string, string, string];
  darkColors?: [string, string, string];
  className?: string;
  speed?: "fast" | "normal" | "slow";
}

export function ConicBorderWrapper({
  children,
  colors = ["#a855f7", "#ec4899", "#f97316"],
  darkColors = ["#c084fc", "#f472b6", "#fb923c"],
  className,
  speed = "normal",
}: ConicBorderWrapperProps) {
  const speedClass = {
    fast: "btn-conic-border-fast",
    normal: "",
    slow: "btn-conic-border-slow",
  }[speed];

  return (
    <div
      className={cn("btn-conic-border", speedClass, className)}
      style={{
        "--conic-color-1": colors[0],
        "--conic-color-2": colors[1],
        "--conic-color-3": colors[2],
        "--conic-dark-1": darkColors[0],
        "--conic-dark-2": darkColors[1],
        "--conic-dark-3": darkColors[2],
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
