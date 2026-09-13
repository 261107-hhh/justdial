"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Megaphone, ListPlus, TrendingUp, User, Grid3x3 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import styles from "./MobileMenu.module.css";

const LINKS = [
  { label: "All Categories", href: "/Mumbai/All-Categories", icon: Grid3x3 },
  { label: "Advertise With Us", href: "/List-Your-Business", icon: Megaphone },
  { label: "Free Business Listing", href: "/List-Your-Business", icon: ListPlus },
  { label: "Investor Relations", href: "/List-Your-Business", icon: TrendingUp },
];

export function MobileMenu({ city = "Mumbai" }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className={styles.trigger} aria-label="Open menu" type="button">
          <Menu size={22} />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>CityDial</SheetTitle>
        </SheetHeader>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link href="/" className={styles.link} onClick={() => setOpen(false)}>
                <User size={18} /> Login / Sign Up
              </Link>
            </li>
            {LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.link} onClick={() => setOpen(false)}>
                  <item.icon size={18} /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
