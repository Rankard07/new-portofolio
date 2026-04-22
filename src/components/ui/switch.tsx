import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  children,
  thumbChildren,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default" | "md" | "lg" | "custom";
  children?: React.ReactNode;
  thumbChildren?: React.ReactNode;
}) {
  const sizeClasses = {
    sm: "h-[14px] w-[24px]",
    default: "h-[18.4px] w-[32px]",
    md: "h-[24px] w-[44px]",
    lg: "h-[32px] w-[60px]",
    custom: "",
  };

  const thumbSizeClasses = {
    sm: "size-3",
    default: "size-4",
    md: "size-5",
    lg: "size-7",
    custom: "",
  };

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        size !== "custom" && sizeClasses[size],
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none flex items-center justify-center rounded-full bg-background ring-0 transition-transform dark:data-checked:bg-primary-foreground data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground",
          size !== "custom" && thumbSizeClasses[size],
          size === "default" && "data-checked:translate-x-[calc(100%-2px)]",
          size === "sm" && "data-checked:translate-x-[calc(100%-2px)]",
          size === "md" && "data-checked:translate-x-[calc(100%-4px)]",
          size === "lg" && "data-checked:translate-x-[calc(100%-4px)]",
        )}
      >
        {thumbChildren}
      </SwitchPrimitive.Thumb>
      {children}
    </SwitchPrimitive.Root>
  );
}

export { Switch };
