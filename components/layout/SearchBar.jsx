"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CitySelector } from "./CitySelector";
import styles from "./SearchBar.module.css";
import { cn } from "@/lib/utils";

export function SearchBar({ city = "Mumbai", size = "md", initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(`/${city}/Search${q ? `?query=${encodeURIComponent(q)}` : ""}`);
  }

  return (
    <form className={cn(styles.form, styles[size])} onSubmit={handleSubmit} role="search">
      <div className={styles.citySlot}>
        <CitySelector currentCity={city} />
      </div>
      <div className={styles.inputSlot}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search for Restaurants, Doctors, Salons..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
      </div>
      <button type="submit" className={styles.button} aria-label="Search">
        <Search size={18} />
        <span className={styles.buttonLabel}>Search</span>
      </button>
    </form>
  );
}
