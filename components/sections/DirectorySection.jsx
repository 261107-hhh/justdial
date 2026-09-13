"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./DirectorySection.module.css";

export function DirectorySection({ title, subtitle, viewAllHref, children, className = "" }) {
  return (
    <motion.section
      className={`container ${styles.section} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link href={viewAllHref} className={styles.viewAll}>
            View All <ArrowRight size={15} />
          </Link>
        )}
      </div>
      {children}
    </motion.section>
  );
}
