// import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ui/created/theme-context";
import { Switch } from "@/components/ui/switch";

export default function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const currentTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <Switch
      size="sm"
      checked={isDark}
      onCheckedChange={toggleTheme}
      thumbChildren={
        isDark ? (
          <Moon className="h-3 w-3 text-background" />
        ) : (
          <Sun className="h-3 w-3 text-foreground" />
        )
      }
    />
  );
}
