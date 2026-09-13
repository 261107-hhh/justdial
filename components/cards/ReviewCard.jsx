import { Star } from "lucide-react";
import styles from "./ReviewCard.module.css";

export function ReviewCard({ review }) {
  const initials = review.userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.content}>
        <div className={styles.headRow}>
          <span className={styles.name}>{review.userName}</span>
          <span className={styles.date}>
            {new Date(review.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div className={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              fill={i < review.rating ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <p className={styles.comment}>{review.comment}</p>
      </div>
    </div>
  );
}
