"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Navigation,
  Send,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Map as MapIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Rating } from "@/components/common/Rating";
import { BusinessGallery } from "@/components/cards/BusinessGallery";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Label } from "@/components/ui/Input";
import {
  getCategoryBySlug,
  getReviewsByBusinessId,
  getRatingBreakdown,
  getSimilarBusinesses,
} from "@/lib/data";
import { telHref, whatsappHref, directionsHref } from "@/lib/utils";
import styles from "./BusinessDetail.module.css";

export function BusinessDetail({ business, city }) {
  const category = getCategoryBySlug(business.category);
  const reviews = getReviewsByBusinessId(business.id);
  const breakdown = getRatingBreakdown(business.id);
  const similar = getSimilarBusinesses(business);
  const totalReviews = reviews.length;

  const [submitted, setSubmitted] = useState(false);

  function handleEnquirySubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="container">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/${city.slug}` },
          { label: category?.name || business.categoryName, href: `/${city.slug}/${business.category}` },
          { label: business.name },
        ]}
      />

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <BusinessGallery images={business.images} name={business.name} />

          <div className={styles.headerBlock}>
            <div>
              <h1 className={styles.name}>{business.name}</h1>
              <p className={styles.meta}>
                {business.categoryName} · {business.priceRange} · {business.area}, {city.name}
              </p>
            </div>
            <span className={`${styles.statusBadge} ${business.isOpen ? styles.open : styles.closed}`}>
              {business.isOpen ? "Open Now" : "Closed"}
            </span>
          </div>

          <Rating rating={business.rating} reviewCount={business.reviewCount} />

          <div className={styles.actionsRow}>
            <Button asChild variant="primary">
              <a href={telHref(business.phone)}>
                <Phone size={16} /> Call
              </a>
            </Button>
            <Button asChild variant="success">
              <a href={whatsappHref(business.whatsapp)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={directionsHref(business.address)} target="_blank" rel="noopener noreferrer">
                <Navigation size={16} /> Get Direction
              </a>
            </Button>
            <Button
              variant="ghost"
              onClick={() => document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Send size={16} /> Send Enquiry
            </Button>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.about}>{business.about}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Services</h2>
            <div className={styles.servicesGrid}>
              {business.services.map((s) => (
                <span key={s} className={styles.serviceChip}>
                  <CheckCircle2 size={14} /> {s}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            <div className={styles.reviewSummary}>
              <div className={styles.avgScore}>
                <span className={styles.avgNumber}>{business.rating.toFixed(1)}</span>
                <div className={styles.avgStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.round(business.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className={styles.avgCount}>{business.reviewCount.toLocaleString("en-IN")} ratings</span>
              </div>
              <div className={styles.breakdown}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = breakdown[star] || 0;
                  const pct = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
                  return (
                    <div key={star} className={styles.breakdownRow}>
                      <span>{star}★</span>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${pct}%` }} />
                      </div>
                      <span className={styles.breakdownCount}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.reviewList}>
              {reviews.length ? (
                reviews.map((r) => <ReviewCard key={r.id} review={r} />)
              ) : (
                <p className={styles.noReviews}>No reviews yet.</p>
              )}
            </div>
          </section>

          {similar.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Similar Businesses</h2>
              <div className={styles.similarGrid}>
                {similar.map((b) => (
                  <BusinessCard key={b.id} business={b} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={styles.sideCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <MapPin size={16} /> Address
            </h3>
            <p className={styles.cardText}>{business.address}</p>
            <a
              href={directionsHref(business.address)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapPlaceholder}
            >
              <MapIcon size={26} strokeWidth={1.4} />
              <span>View on Map</span>
            </a>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Clock size={16} /> Timings
            </h3>
            <p className={styles.cardText}>
              {business.openingTime} – {business.closingTime}
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Phone size={16} /> Contact
            </h3>
            <p className={styles.cardText}>+91 {business.phone}</p>
            <div className={styles.contactActions}>
              <Button asChild size="sm" variant="primary">
                <a href={telHref(business.phone)}>Call Now</a>
              </Button>
              <Button asChild size="sm" variant="success">
                <a href={whatsappHref(business.whatsapp)} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <motion.div
            id="enquiry-form"
            className={styles.card}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={styles.cardTitle}>
              <Send size={16} /> Send Enquiry
            </h3>
            {submitted ? (
              <p className={styles.successMsg}>
                Thanks! Your enquiry has been sent to {business.name}.
              </p>
            ) : (
              <form className={styles.form} onSubmit={handleEnquirySubmit}>
                <div>
                  <Label htmlFor="enq-name">Name</Label>
                  <Input id="enq-name" required placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="enq-phone">Phone</Label>
                  <Input id="enq-phone" required placeholder="Your phone number" />
                </div>
                <div>
                  <Label htmlFor="enq-msg">Message</Label>
                  <Textarea id="enq-msg" placeholder={`Hi, I'd like to know more about ${business.name}`} />
                </div>
                <Button type="submit" variant="accent">
                  Send Enquiry
                </Button>
              </form>
            )}
          </motion.div>
        </aside>
      </div>
    </main>
  );
}
