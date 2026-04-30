import { cn } from "@/lib/utils";

interface GlowingAnimatedBGProps {
  children: React.ReactNode;
  colors?: [string, string, string, string, string, string];
  darkColors?: [
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  className?: string;
  speed?: "fast" | "normal" | "slow";
}

export function GlowingAnimatedBG({
  children,
  colors = [
    "#EDD4B2",
    "#94B0DA",
    "#5B4E77",
    "#593959",
    "#FCF0CC",
    "#237476",
  ],
  darkColors = [
    "#F1DEC4",
    "#AFC4E4",
    "#8172A3",
    "#915D91",
    "#FDF3D7",
    "#3A9A9D",
  ],
  className,
  speed = "normal",
}: GlowingAnimatedBGProps) {
  const speedClass = {
    fast: "btn-glowing-bg-fast",
    normal: "",
    slow: "btn-glowing-bg-slow",
  }[speed];

  return (
    <div
      className={cn(
        "btn-glowing-bg",
        speedClass,
        className,
      )}
      style={
        {
          "--glow-color-1": colors[0],
          "--glow-color-2": colors[1],
          "--glow-color-3": colors[2],
          "--glow-color-4": colors[3],
          "--glow-color-5": colors[4],
          "--glow-color-6": colors[5],
          "--glow-dark-1": darkColors[0],
          "--glow-dark-2": darkColors[1],
          "--glow-dark-3": darkColors[2],
          "--glow-dark-4": darkColors[3],
          "--glow-dark-5": darkColors[4],
          "--glow-dark-6": darkColors[5],
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
