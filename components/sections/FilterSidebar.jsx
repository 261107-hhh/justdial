"use client";

import { Button } from "@/components/ui/Button";
import styles from "./FilterSidebar.module.css";

const RATINGS = [4.5, 4, 3.5, 3];
const PRICE_RANGES = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"];

export function FilterSidebar({ filters, onChange, subcategories = [] }) {
  function update(patch) {
    onChange({ ...filters, ...patch });
  }

  function reset() {
    onChange({ minRating: null, openNow: false, priceRange: null, subcategory: null });
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.headRow}>
        <h3 className={styles.heading}>Filters</h3>
        <button type="button" className={styles.reset} onClick={reset}>
          Clear all
        </button>
      </div>

      <div className={styles.group}>
        <label className={styles.checkRow}>
          <input
            type="checkbox"
            checked={!!filters.openNow}
            onChange={(e) => update({ openNow: e.target.checked })}
          />
          Open Now
        </label>
      </div>

      <div className={styles.group}>
        <h4 className={styles.groupTitle}>Rating</h4>
        {RATINGS.map((r) => (
          <label key={r} className={styles.checkRow}>
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === r}
              onChange={() => update({ minRating: r })}
            />
            {r}+ Stars
          </label>
        ))}
      </div>

      <div className={styles.group}>
        <h4 className={styles.groupTitle}>Price Range</h4>
        <div className={styles.priceRow}>
          {PRICE_RANGES.map((p) => (
            <button
              key={p}
              type="button"
              className={`${styles.priceBtn} ${filters.priceRange === p ? styles.priceActive : ""}`}
              onClick={() => update({ priceRange: filters.priceRange === p ? null : p })}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {subcategories.length > 0 && (
        <div className={styles.group}>
          <h4 className={styles.groupTitle}>Subcategory</h4>
          {subcategories.map((s) => (
            <label key={s.id} className={styles.checkRow}>
              <input
                type="radio"
                name="subcategory"
                checked={filters.subcategory === s.slug}
                onChange={() => update({ subcategory: s.slug })}
              />
              {s.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
