import { notFound } from "next/navigation";
import Link from "next/link";
import { SearchBar } from "@/components/layout/SearchBar";
import { DirectorySection } from "@/components/sections/DirectorySection";
import { Grid } from "@/components/sections/Grid";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { CollectionCard } from "@/components/cards/CollectionCard";
import {
  getCityBySlug,
  getCategories,
  getBusinessesByCity,
  sortBusinesses,
  getCollections,
} from "@/lib/data";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Local Businesses in ${city.name}`,
    description: `Discover top-rated restaurants, doctors, salons, hotels and services in ${city.name} on CityDial.`,
  };
}

export default async function CityPage({ params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const categories = getCategories();
  const cityBusinesses = getBusinessesByCity(city.slug);
  const topRated = sortBusinesses(cityBusinesses, "rating").slice(0, 6);
  const collections = getCollections().slice(0, 4);

  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>Explore {city.name}</h1>
          <p className={styles.heroSubtitle}>
            {cityBusinesses.length}+ local businesses waiting to be discovered
          </p>
          <div className={styles.heroSearch}>
            <SearchBar city={city.slug} size="lg" />
          </div>
        </div>
      </section>

      <DirectorySection
        title={`Categories in ${city.name}`}
        viewAllHref={`/${city.slug}/All-Categories`}
      >
        <Grid cols={6}>
          {categories.slice(0, 12).map((cat) => (
            <CategoryCard key={cat.id} category={cat} city={city.slug} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection
        title="Top Rated Businesses"
        subtitle={`Highest rated picks in ${city.name}`}
      >
        <Grid cols={3}>
          {topRated.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection
        title="Restaurant Collections"
        subtitle="Curated food experiences"
        viewAllHref={`/${city.slug}/Restaurant-Collections`}
      >
        <Grid cols={4}>
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} city={city.slug} />
          ))}
        </Grid>
      </DirectorySection>

      <div className={`container ${styles.ctaWrap}`}>
        <Link href="/List-Your-Business" className={styles.cta}>
          Own a business in {city.name}? List it for free →
        </Link>
      </div>
    </main>
  );
}
