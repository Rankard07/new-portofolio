import { cn } from "@/lib/utils";

interface LinearBorderWrapperProps {
  children: React.ReactNode;
  colors?: [string, string];
  darkColors?: [string, string];
  className?: string;
  speed?: "fast" | "normal" | "slow";
}

export function LinearBorderWrapper({
  children,
  colors = ["#0080ff", "#0048ff"],
  darkColors = ["#00eaff", "#00a2ff"],
  className,
  speed = "normal",
}: LinearBorderWrapperProps) {
  const speedClass = {
    fast: "btn-linear-border-fast",
    normal: "",
    slow: "btn-linear-border-slow",
  }[speed];

  return (
    <div
      className={cn(
        "btn-linear-border",
        speedClass,
        className,
      )}
      style={
        {
          "--linear-color-1": colors[0],
          "--linear-color-2": colors[1],
          "--linear-dark-1": darkColors[0],
          "--linear-dark-2": darkColors[1],
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
