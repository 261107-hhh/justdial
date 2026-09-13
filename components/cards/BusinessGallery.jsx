"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import styles from "./BusinessGallery.module.css";

export function BusinessGallery({ images = [], name }) {
  const [active, setActive] = useState(0);
  const safeImages = images.length ? images : [name];

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ImagePlaceholder
              label={`${name} ${active + 1}`}
              ratio="wide"
              className={styles.mainImage}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {safeImages.length > 1 && (
        <div className={styles.thumbs}>
          {safeImages.map((img, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.thumbBtn} ${i === active ? styles.activeThumb : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <ImagePlaceholder label={`${name} ${i + 1}`} ratio="square" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
