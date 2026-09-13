"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(styles.btn, styles[variant], styles[size], className)}
      {...props}
    />
  );
}
