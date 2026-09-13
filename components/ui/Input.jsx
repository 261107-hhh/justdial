"use client";

import { cn } from "@/lib/utils";
import styles from "./Input.module.css";

export function Input({ className, ...props }) {
  return <input className={cn(styles.input, className)} {...props} />;
}

export function Textarea({ className, ...props }) {
  return <textarea className={cn(styles.textarea, className)} {...props} />;
}

export function Label({ className, children, ...props }) {
  return (
    <label className={cn(styles.label, className)} {...props}>
      {children}
    </label>
  );
}
