"use client";

import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import styles from "./DropdownMenu.module.css";

export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export function DropdownMenuContent({ children, className, ...props }) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        className={cn(styles.content, className)}
        sideOffset={8}
        align="end"
        {...props}
      >
        {children}
      </DropdownPrimitive.Content>
    </DropdownPrimitive.Portal>
  );
}

export function DropdownMenuItem({ children, className, ...props }) {
  return (
    <DropdownPrimitive.Item className={cn(styles.item, className)} {...props}>
      {children}
    </DropdownPrimitive.Item>
  );
}

export function DropdownMenuLabel({ children, className, ...props }) {
  return (
    <DropdownPrimitive.Label className={cn(styles.label, className)} {...props}>
      {children}
    </DropdownPrimitive.Label>
  );
}

export function DropdownMenuSeparator({ className, ...props }) {
  return <DropdownPrimitive.Separator className={cn(styles.separator, className)} {...props} />;
}
