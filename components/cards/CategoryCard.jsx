"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import styles from "./CategoryCard.module.css";

export function CategoryCard({ category, city = "Mumbai" }) {
  const Icon = getIcon(category.icon);
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18 }}>
      <Link href={`/${city}/${category.slug}`} className={styles.card}>
        <div className={styles.iconWrap}>
          <Icon size={26} strokeWidth={1.6} />
        </div>
        <span className={styles.name}>{category.name}</span>
      </Link>
    </motion.div>
  );
}
