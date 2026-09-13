import Link from "next/link";
import { getCategories, getCities } from "@/lib/data";

const SOCIAL_LINKS = [
  { label: "Facebook", abbr: "f" },
  { label: "Instagram", abbr: "ig" },
  { label: "Twitter", abbr: "x" },
  { label: "YouTube", abbr: "yt" },
];
import styles from "./Footer.module.css";

export function Footer() {
  const categories = getCategories().slice(0, 8);
  const cities = getCities();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>CD</span>
            <span>
              City<span className={styles.logoAccent}>Dial</span>
            </span>
          </div>
          <p className={styles.tagline}>
            An original local business directory for finding trusted restaurants,
            services, and professionals near you.
          </p>
          <div className={styles.social}>
            {SOCIAL_LINKS.map((s) => (
              <a href="#" aria-label={s.label} key={s.label}>
                {s.abbr}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h4>Popular Categories</h4>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/Mumbai/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Explore Cities</h4>
          <ul>
            {cities.map((city) => (
              <li key={city.slug}>
                <Link href={`/${city.slug}`}>{city.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Company</h4>
          <ul>
            <li><Link href="/List-Your-Business">List Your Business</Link></li>
            <li><Link href="/List-Your-Business">Advertise With Us</Link></li>
            <li><Link href="/List-Your-Business">Investor Relations</Link></li>
            <li><Link href="/Mumbai/All-Categories">All Categories</Link></li>
            <li><Link href="/Mumbai/Restaurant-Collections">Restaurant Collections</Link></li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} CityDial. All rights reserved.</p>
        <p className={styles.disclaimer}>
          This is a demo project built for educational purposes and is not affiliated
          with any third-party directory service.
        </p>
      </div>
    </footer>
  );
}
