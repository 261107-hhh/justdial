"use client";

import { motion } from "framer-motion";
import { Film, Star } from "lucide-react";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import styles from "./MovieCard.module.css";

export function MovieCard({ movie }) {
  return (
    <motion.div className={styles.card} whileHover={{ y: -4 }} transition={{ duration: 0.18 }}>
      <ImagePlaceholder label={movie.title} icon={Film} ratio="tall" className={styles.poster} />
      <div className={styles.body}>
        <h4 className={styles.title}>{movie.title}</h4>
        <p className={styles.meta}>
          {movie.genre} · {movie.language}
        </p>
        <span className={styles.rating}>
          <Star size={12} fill="currentColor" strokeWidth={0} /> {movie.rating.toFixed(1)}
        </span>
      </div>
    </motion.div>
  );
}
