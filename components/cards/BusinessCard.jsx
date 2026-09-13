"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { Rating } from "@/components/common/Rating";
import { Button } from "@/components/ui/Button";
import { telHref, whatsappHref } from "@/lib/utils";
import styles from "./BusinessCard.module.css";

export function BusinessCard({ business }) {
  const href = `/${business.city}/${business.slug}`;

  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -5, boxShadow: "var(--shadow-lg)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link href={href} className={styles.imageLink}>
        <ImagePlaceholder label={business.name} ratio="landscape" className={styles.image} />
        <span className={`${styles.openBadge} ${business.isOpen ? styles.open : styles.closed}`}>
          {business.isOpen ? "Open Now" : "Closed"}
        </span>
      </Link>

      <div className={styles.body}>
        <Link href={href} className={styles.name}>
          {business.name}
        </Link>
        <p className={styles.meta}>
          {business.categoryName} · {business.priceRange}
        </p>

        <Rating rating={business.rating} reviewCount={business.reviewCount} size="sm" />

        <p className={styles.address}>
          <MapPin size={13} /> {business.address}
        </p>

        <div className={styles.actions}>
          <Button asChild size="sm" variant="outline">
            <a href={telHref(business.phone)}>
              <Phone size={14} /> Call
            </a>
          </Button>
          <Button asChild size="sm" variant="success">
            <a href={whatsappHref(business.whatsapp)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </Button>
          <Link href={href} className={styles.viewDetails}>
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
