"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import styles from "./Banner.module.css";

export function Banner({ banners = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners.length) return null;
  const banner = banners[index];

  function go(dir) {
    setIndex((i) => (i + dir + banners.length) % banners.length);
  }

  return (
    <div className={styles.wrap}>
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={styles.slide}
        >
          <ImagePlaceholder
            label={banner.title}
            icon={Megaphone}
            ratio="wide"
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h2 className={styles.title}>{banner.title}</h2>
            <p className={styles.subtitle}>{banner.subtitle}</p>
            <Link href={banner.link} className={styles.cta}>
              Explore Now
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {banners.length > 1 && (
        <>
          <button className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous banner">
            <ChevronLeft size={20} />
          </button>
          <button className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label="Next banner">
            <ChevronRight size={20} />
          </button>
          <div className={styles.dots}>
            {banners.map((b, i) => (
              <button
                key={b.id}
                className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to banner ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
