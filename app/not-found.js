import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <SearchX size={64} strokeWidth={1.2} className={styles.icon} />
      <h1 className={styles.title}>404 — Page Not Found</h1>
      <p className={styles.text}>
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button asChild variant="primary" size="lg">
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}
