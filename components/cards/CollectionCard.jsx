"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import styles from "./CollectionCard.module.css";

export function CollectionCard({ collection, city = "Mumbai" }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/${city}/${collection.categorySlug}/${collection.subcategorySlug}`}
        className={styles.card}
      >
        <ImagePlaceholder label={collection.name} ratio="square" className={styles.image} />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{collection.name}</h3>
          <p className={styles.desc}>{collection.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
