import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Grid } from "@/components/sections/Grid";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { getCityBySlug, getCategories } from "@/lib/data";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `All Categories in ${city.name}`,
    description: `Browse every business category available in ${city.name} on CityDial.`,
  };
}

export default async function AllCategoriesPage({ params }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const categories = getCategories();

  return (
    <main className="container">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: city.name, href: `/${city.slug}` },
          { label: "All Categories" },
        ]}
      />
      <h1 className={styles.title}>All Categories in {city.name}</h1>
      <p className={styles.subtitle}>{categories.length} categories available</p>

      <div className={styles.gridWrap}>
        <Grid cols={6}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} city={city.slug} />
          ))}
        </Grid>
      </div>
    </main>
  );
}
