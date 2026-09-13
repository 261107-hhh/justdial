import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Rating.module.css";

function ratingClass(rating) {
  if (rating >= 4) return styles.high;
  if (rating >= 3) return styles.mid;
  return styles.low;
}

export function Rating({ rating, reviewCount, size = "md", showCount = true }) {
  return (
    <div className={cn(styles.wrap, styles[size])}>
      <span className={cn(styles.badge, ratingClass(rating))}>
        {rating.toFixed(1)}
        <Star size={size === "sm" ? 10 : 12} fill="currentColor" strokeWidth={0} />
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={styles.count}>{reviewCount.toLocaleString("en-IN")} Ratings</span>
      )}
    </div>
  );
}
