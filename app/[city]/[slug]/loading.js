import { Skeleton } from "@/components/ui/Skeleton";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className="container">
      <div className={styles.hero}>
        <Skeleton className={styles.heroLine} />
        <Skeleton className={styles.heroLineSm} />
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className={styles.card} />
        ))}
      </div>
    </main>
  );
}
