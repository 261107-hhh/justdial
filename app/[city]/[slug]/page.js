import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BusinessListing } from "@/components/sections/BusinessListing";
import { BusinessDetail } from "@/components/sections/BusinessDetail";
import { Grid } from "@/components/sections/Grid";
import { CollectionCard } from "@/components/cards/CollectionCard";
import {
  getCityBySlug,
  getCategoryBySlug,
  getBusinessBySlug,
  getBusinessesByCategory,
  getSubcategoriesByCategoryId,
  getCollections,
} from "@/lib/data";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const category = getCategoryBySlug(slug);
  if (category) {
    return {
      title: `${category.name} in ${city.name}`,
      description: `Find the best ${category.name.toLowerCase()} in ${city.name} with ratings, reviews, contact details and more.`,
    };
  }

  const business = getBusinessBySlug(slug);
  if (business && business.city === city.slug) {
    return {
      title: `${business.name} in ${city.name} | ${business.categoryName}`,
      description: `${business.name} - ${business.categoryName} in ${business.area}, ${city.name}. View contact details, ratings, reviews and more.`,
    };
  }

  return {};
}

export default async function CategoryOrBusinessPage({ params }) {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  // Try category first
  const category = getCategoryBySlug(slug);
  if (category) {
    const businesses = getBusinessesByCategory(city.slug, category.slug);
    const subcategories = getSubcategoriesByCategoryId(category.id);
    const relatedCollections = getCollections().filter((c) => c.categorySlug === category.slug);

    return (
      <main className="container">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: city.name, href: `/${city.slug}` },
            { label: category.name },
          ]}
        />
        <h1 className={styles.title}>
          {category.name} in {city.name}
        </h1>
        <p className={styles.subtitle}>{businesses.length} businesses found</p>

        {relatedCollections.length > 0 && (
          <div className={styles.collectionsWrap}>
            <Grid cols={6} gap="sm">
              {relatedCollections.map((c) => (
                <CollectionCard key={c.id} collection={c} city={city.slug} />
              ))}
            </Grid>
          </div>
        )}

        <div className={styles.listingWrap}>
          <BusinessListing businesses={businesses} subcategories={subcategories} />
        </div>
      </main>
    );
  }

  // Otherwise treat slug as a business
  const business = getBusinessBySlug(slug);
  if (!business || business.city !== city.slug) notFound();

  return <BusinessDetail business={business} city={city} />;
}
