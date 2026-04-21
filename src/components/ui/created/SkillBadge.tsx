import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  // icon?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SkillBadge({ name, icon, className }: SkillBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-3 bg-secondary rounded-lg hover:bg-accent transition-colors",
        className,
      )}
    >
      {icon && (
        <span className="text-2xl flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="text-secondary-foreground">{name}</span>
    </div>
  );
}
