"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Dialog.module.css";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ children, className, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content className={cn(styles.content, className)} {...props}>
        {children}
        <DialogPrimitive.Close className={styles.close} aria-label="Close">
          <X size={18} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ children, className }) {
  return <div className={cn(styles.header, className)}>{children}</div>;
}

export function DialogTitle({ children, className, ...props }) {
  return (
    <DialogPrimitive.Title className={cn(styles.title, className)} {...props}>
      {children}
    </DialogPrimitive.Title>
  );
}

export function DialogDescription({ children, className, ...props }) {
  return (
    <DialogPrimitive.Description className={cn(styles.description, className)} {...props}>
      {children}
    </DialogPrimitive.Description>
  );
}
