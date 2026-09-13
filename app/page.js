import { SearchBar } from "@/components/layout/SearchBar";
import { Banner } from "@/components/sections/Banner";
import { DirectorySection } from "@/components/sections/DirectorySection";
import { Grid } from "@/components/sections/Grid";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { TravelCard } from "@/components/cards/TravelCard";
import { TrendingCard } from "@/components/cards/TrendingCard";
import { MovieCard } from "@/components/cards/MovieCard";
import {
  getCategories,
  getBanners,
  getServices,
  getTrendingSearches,
  getMovies,
  getHomepageSections,
} from "@/lib/data";
import styles from "./page.module.css";

const DEFAULT_CITY = "Mumbai";

export const metadata = {
  title: "CityDial — Find Local Businesses Near You",
  description:
    "Search restaurants, doctors, salons, hotels and local services near you on CityDial, an original local business directory.",
};

export default function Home() {
  const categories = getCategories();
  const popularCategories = categories.filter((c) => c.groups.includes("popular"));
  const banners = getBanners();
  const travelServices = getServices();
  const trending = getTrendingSearches();
  const movies = getMovies();
  const sections = getHomepageSections();

  function categoriesForGroup(key) {
    const section = sections.find((s) => s.key === key);
    if (!section) return [];
    return section.categorySlugs
      .map((slug) => categories.find((c) => c.slug === slug))
      .filter(Boolean);
  }

  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>Find Trusted Local Businesses Near You</h1>
          <p className={styles.heroSubtitle}>
            Restaurants, doctors, salons, hotels and more — all in one place.
          </p>
          <div className={styles.heroSearch}>
            <SearchBar city={DEFAULT_CITY} size="lg" />
          </div>
        </div>
      </section>

      <div className={`container ${styles.bannerWrap}`}>
        <Banner banners={banners} />
      </div>

      <DirectorySection
        title="Popular Categories"
        subtitle="Everything you need, just a search away"
        viewAllHref={`/${DEFAULT_CITY}/All-Categories`}
      >
        <Grid cols={6}>
          {popularCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} city={DEFAULT_CITY} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection
        title="All Services"
        subtitle="Browse the complete directory of categories"
        viewAllHref={`/${DEFAULT_CITY}/All-Categories`}
      >
        <Grid cols={6}>
          {categories.slice(0, 12).map((cat) => (
            <CategoryCard key={cat.id} category={cat} city={DEFAULT_CITY} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection title="Wedding Requirements" subtitle="Plan your big day with trusted vendors">
        <Grid cols={4}>
          {categoriesForGroup("wedding").map((cat) => (
            <CategoryCard key={cat.id} category={cat} city={DEFAULT_CITY} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection title="Beauty & Spa" subtitle="Look and feel your best">
        <Grid cols={4}>
          {categoriesForGroup("beauty").map((cat) => (
            <CategoryCard key={cat.id} category={cat} city={DEFAULT_CITY} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection title="Repairs & Services" subtitle="Quick fixes for everyday needs">
        <Grid cols={4}>
          {categoriesForGroup("repairs").map((cat) => (
            <CategoryCard key={cat.id} category={cat} city={DEFAULT_CITY} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection title="Daily Needs" subtitle="Everyday essentials, sorted">
        <Grid cols={4}>
          {categoriesForGroup("daily").map((cat) => (
            <CategoryCard key={cat.id} category={cat} city={DEFAULT_CITY} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection title="Travel Bookings" subtitle="Plan your next trip with ease">
        <Grid cols={5}>
          {travelServices.map((service) => (
            <TravelCard key={service.id} service={service} city={DEFAULT_CITY} />
          ))}
        </Grid>
      </DirectorySection>

      <DirectorySection title="Trending Searches" subtitle="What people are searching for right now">
        <div className={styles.trendingRow}>
          {trending.map((t) => (
            <TrendingCard key={t.id} trend={t} />
          ))}
        </div>
      </DirectorySection>

      <DirectorySection title="Latest Movies & Reviews" subtitle="Now showing near you">
        <Grid cols={4}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
      </DirectorySection>
    </main>
  );
}
