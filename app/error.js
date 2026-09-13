"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.wrap}>
      <AlertTriangle size={64} strokeWidth={1.2} className={styles.icon} />
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.text}>An unexpected error occurred. Please try again.</p>
      <Button variant="primary" size="lg" onClick={() => reset()}>
        Try Again
      </Button>
    </main>
  );
}
