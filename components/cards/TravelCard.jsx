"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import styles from "./TravelCard.module.css";

export function TravelCard({ service, city = "Mumbai" }) {
  const Icon = getIcon(service.icon);
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18 }}>
      <Link href={`/${city}/${service.slug}`} className={styles.card}>
        <div className={styles.iconWrap}>
          <Icon size={22} strokeWidth={1.6} />
        </div>
        <span className={styles.name}>{service.name}</span>
      </Link>
    </motion.div>
  );
}
