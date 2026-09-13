import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BusinessListing } from "@/components/sections/BusinessListing";
import {
  getCityBySlug,
  getCategoryBySlug,
  getSubcategoryBySlug,
  getBusinessesBySubcategory,
} from "@/lib/data";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { city: citySlug, slug: categorySlug, subcategory: subcategorySlug } = await params;
  const city = getCityBySlug(citySlug);
  const category = getCategoryBySlug(categorySlug);
  if (!city || !category) return {};
  const subcategory = getSubcategoryBySlug(category.id, subcategorySlug);
  if (!subcategory) return {};
  return {
    title: `${subcategory.name} ${category.name} in ${city.name}`,
    description: `Discover ${subcategory.name} ${category.name.toLowerCase()} in ${city.name} on CityDial.`,
  };
}

export default async function SubcategoryPage({ params }) {
  const { city: citySlug, slug: categorySlug, subcategory: subcategorySlug } = await params;
  const city = getCityBySlug(citySlug);
  const category = getCategoryBySlug(categorySlug);
  if (!city || !category) notFound();

  const subcategory = getSubcategoryBySlug(category.id, subcategorySlug);
  if (!subcategory) notFound();

  const businesses = getBusinessesBySubcategory(city.slug, category.slug, subcategory.slug);

  return (
    <main className="container">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/${city.slug}` },
          { label: category.name, href: `/${city.slug}/${category.slug}` },
          { label: subcategory.name },
        ]}
      />
      <h1 className={styles.title}>
        {subcategory.name} {category.name} in {city.name}
      </h1>
      <p className={styles.subtitle}>{businesses.length} businesses found</p>

      <div className={styles.listingWrap}>
        <BusinessListing businesses={businesses} />
      </div>
    </main>
  );
}
