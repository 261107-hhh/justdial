import Link from "next/link";
import { TrendingUp } from "lucide-react";
import styles from "./TrendingCard.module.css";

export function TrendingCard({ trend }) {
  return (
    <Link href={trend.link} className={styles.chip}>
      <TrendingUp size={14} />
      <span>{trend.text}</span>
    </Link>
  );
}
