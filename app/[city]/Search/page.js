import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BusinessListing } from "@/components/sections/BusinessListing";
import { getCityBySlug, searchBusinesses } from "@/lib/data";
import styles from "./page.module.css";

export async function generateMetadata({ params, searchParams }) {
  const { city: citySlug } = await params;
  const { query } = await searchParams;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: query ? `"${query}" — Search results in ${city.name}` : `Search in ${city.name}`,
    description: `Search results for local businesses in ${city.name} on CityDial.`,
  };
}

export default async function SearchPage({ params, searchParams }) {
  const { city: citySlug } = await params;
  const { query = "" } = await searchParams;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const results = searchBusinesses(city.slug, query);

  return (
    <main className="container">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/${city.slug}` },
          { label: "Search" },
        ]}
      />
      <h1 className={styles.title}>
        {query ? (
          <>
            Search results for &ldquo;{query}&rdquo; in {city.name}
          </>
        ) : (
          <>Search {city.name}</>
        )}
      </h1>

      <div className={styles.listingWrap}>
        <BusinessListing businesses={results} />
      </div>
    </main>
  );
}
