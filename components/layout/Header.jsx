"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User, Megaphone, ListPlus } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";
import { getCities } from "@/lib/data";
import styles from "./Header.module.css";

function detectCity(pathname) {
  const cities = getCities().map((c) => c.slug);
  const seg = pathname.split("/").filter(Boolean)[0];
  return cities.includes(seg) ? seg : "Mumbai";
}

export function Header() {
  const pathname = usePathname();
  const city = detectCity(pathname);

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className={`container ${styles.inner}`}>
        <MobileMenu city={city} />

        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>CD</span>
          <span className={styles.logoText}>
            City<span className={styles.logoAccent}>Dial</span>
          </span>
        </Link>

        <div className={styles.searchSlot}>
          <SearchBar city={city} size="md" />
        </div>

        <nav className={styles.actions}>
          <Link href="/List-Your-Business" className={styles.actionLink}>
            <Megaphone size={16} />
            <span>Advertise</span>
          </Link>
          <Link href="/List-Your-Business" className={styles.actionLink}>
            <ListPlus size={16} />
            <span>Free Listing</span>
          </Link>
          <Link href="/List-Your-Business" className={styles.actionLink}>
            <span>Investor Relations</span>
          </Link>
          <button type="button" className={styles.loginBtn}>
            <User size={16} />
            <span>Login / Sign Up</span>
          </button>
        </nav>
      </div>

      <div className={`container ${styles.mobileSearch}`}>
        <SearchBar city={city} size="sm" />
      </div>
    </motion.header>
  );
}
