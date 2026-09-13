import { cn } from "@/lib/utils";
import styles from "./Grid.module.css";

// cols: how many columns on desktop; the CSS handles responsive breakpoints
export function Grid({ children, cols = 4, gap = "md", scroll = false, className }) {
  return (
    <div
      className={cn(
        styles.grid,
        styles[`cols-${cols}`],
        styles[`gap-${gap}`],
        scroll && styles.scroll,
        className
      )}
    >
      {children}
    </div>
  );
}
