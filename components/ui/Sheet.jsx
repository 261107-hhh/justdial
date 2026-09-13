"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Sheet.module.css";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;

export function SheetContent({ children, className, side = "right", ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        className={cn(styles.content, styles[side], className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className={styles.close} aria-label="Close">
          <X size={18} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetHeader({ children, className }) {
  return <div className={cn(styles.header, className)}>{children}</div>;
}

export function SheetTitle({ children, className, ...props }) {
  return (
    <DialogPrimitive.Title className={cn(styles.title, className)} {...props}>
      {children}
    </DialogPrimitive.Title>
  );
}
