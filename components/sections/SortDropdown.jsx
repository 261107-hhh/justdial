"use client";

import { ArrowUpDown } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select";
import styles from "./SortDropdown.module.css";

const OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "Rating: High to Low" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "name", label: "Name: A to Z" },
];

export function SortDropdown({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <ArrowUpDown size={15} className={styles.icon} />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
