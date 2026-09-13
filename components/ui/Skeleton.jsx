import { cn } from "@/lib/utils";
import styles from "./Skeleton.module.css";

export function Skeleton({ className, ...props }) {
  return <div className={cn(styles.skeleton, className)} {...props} />;
}
