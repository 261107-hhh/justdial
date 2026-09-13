"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, SearchX } from "lucide-react";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { FilterSidebar } from "@/components/sections/FilterSidebar";
import { SortDropdown } from "@/components/sections/SortDropdown";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { filterBusinesses, sortBusinesses } from "@/lib/data";
import styles from "./BusinessListing.module.css";

const PAGE_SIZE = 9;

export function BusinessListing({ businesses, subcategories = [] }) {
  const [filters, setFilters] = useState({
    minRating: null,
    openNow: false,
    priceRange: null,
    subcategory: null,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sheetOpen, setSheetOpen] = useState(false);

  const results = useMemo(() => {
    const filtered = filterBusinesses(businesses, filters);
    return sortBusinesses(filtered, sortBy);
  }, [businesses, filters, sortBy]);

  const visible = results.slice(0, visibleCount);

  function handleFilterChange(next) {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <FilterSidebar filters={filters} onChange={handleFilterChange} subcategories={subcategories} />
      </aside>

      <div className={styles.main}>
        <div className={styles.toolbar}>
          <p className={styles.count}>{results.length} results found</p>
          <div className={styles.toolbarActions}>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button type="button" className={styles.filterBtn}>
                  <SlidersHorizontal size={15} /> Filters
                </button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <FilterSidebar
                  filters={filters}
                  onChange={handleFilterChange}
                  subcategories={subcategories}
                />
                <Button className={styles.applyBtn} onClick={() => setSheetOpen(false)}>
                  Show {results.length} Results
                </Button>
              </SheetContent>
            </Sheet>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {visible.length === 0 ? (
          <div className={styles.empty}>
            <SearchX size={40} strokeWidth={1.3} />
            <h3>No businesses found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <>
            <motion.div layout className={styles.grid}>
              <AnimatePresence>
                {visible.map((b) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <BusinessCard business={b} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {visibleCount < results.length && (
              <div className={styles.loadMoreWrap}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
