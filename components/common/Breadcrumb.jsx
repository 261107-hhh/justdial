import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from "./Breadcrumb.module.css";

// items: [{ label, href }] — last item has no href (current page)
export function Breadcrumb({ items = [] }) {
  return (
    <nav className={styles.nav} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight size={14} className={styles.sep} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
