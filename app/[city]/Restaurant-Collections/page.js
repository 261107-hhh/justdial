import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Grid } from "@/components/sections/Grid";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { getCityBySlug, getCollections } from "@/lib/data";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Restaurant Collections in ${city.name}`,
    description: `Explore curated restaurant collections in ${city.name} — Indian Flavours, Global Cuisines, Nightlife and more.`,
  };
}

export default async function RestaurantCollectionsPage({ params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const collections = getCollections();

  return (
    <main>
      <div className={styles.hero}>
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: city.name, href: `/${city.slug}` },
              { label: "Restaurant Collections" },
            ]}
          />
          <h1 className={styles.heroTitle}>IT&apos;S ALL ABOUT FOOD</h1>
          <p className={styles.heroSubtitle}>
            Curated collections to help you find the perfect meal in {city.name}
          </p>
        </div>
      </div>

      <div className={`container ${styles.gridWrap}`}>
        <Grid cols={3} gap="lg">
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} city={city.slug} />
          ))}
        </Grid>
      </div>
    </main>
  );
}
