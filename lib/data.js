import data from "@/data/data.json";

// ---- Basic getters -------------------------------------------------

export function getCities() {
  return data.cities;
}

export function getCityBySlug(slug) {
  return data.cities.find(
    (c) => c.slug.toLowerCase() === decodeURIComponent(slug || "").toLowerCase()
  );
}

export function getCategories() {
  return data.categories;
}

export function getCategoryBySlug(slug) {
  return data.categories.find(
    (c) => c.slug.toLowerCase() === decodeURIComponent(slug || "").toLowerCase()
  );
}

export function getSubcategories() {
  return data.subcategories;
}

export function getSubcategoriesByCategoryId(categoryId) {
  return data.subcategories.filter((s) => s.categoryId === categoryId);
}

export function getSubcategoryBySlug(categoryId, slug) {
  return data.subcategories.find(
    (s) =>
      s.categoryId === categoryId &&
      s.slug.toLowerCase() === decodeURIComponent(slug || "").toLowerCase()
  );
}

export function getCollections() {
  return data.collections;
}

export function getCollectionBySlug(slug) {
  return data.collections.find(
    (c) => c.slug.toLowerCase() === decodeURIComponent(slug || "").toLowerCase()
  );
}

export function getBanners() {
  return data.banners;
}

export function getServices() {
  return data.services;
}

export function getTrendingSearches() {
  return data.trendingSearches;
}

export function getMovies() {
  return data.movies;
}

export function getHomepageSections() {
  return data.homepageSections;
}

// ---- Businesses ------------------------------------------------------

export function getBusinesses() {
  return data.businesses;
}

export function getBusinessBySlug(slug) {
  return data.businesses.find(
    (b) => b.slug.toLowerCase() === decodeURIComponent(slug || "").toLowerCase()
  );
}

export function getBusinessesByCity(citySlug) {
  return data.businesses.filter(
    (b) => b.city.toLowerCase() === decodeURIComponent(citySlug || "").toLowerCase()
  );
}

export function getBusinessesByCategory(citySlug, categorySlug) {
  return data.businesses.filter(
    (b) =>
      b.city.toLowerCase() === decodeURIComponent(citySlug || "").toLowerCase() &&
      b.category.toLowerCase() === decodeURIComponent(categorySlug || "").toLowerCase()
  );
}

export function getBusinessesBySubcategory(citySlug, categorySlug, subcategorySlug) {
  return data.businesses.filter(
    (b) =>
      b.city.toLowerCase() === decodeURIComponent(citySlug || "").toLowerCase() &&
      b.category.toLowerCase() === decodeURIComponent(categorySlug || "").toLowerCase() &&
      (b.subcategory || "").toLowerCase() ===
        decodeURIComponent(subcategorySlug || "").toLowerCase()
  );
}

export function getSimilarBusinesses(business, limit = 4) {
  return data.businesses
    .filter(
      (b) =>
        b.id !== business.id &&
        b.city === business.city &&
        b.category === business.category
    )
    .slice(0, limit);
}

// ---- Reviews -----------------------------------------------------------

export function getReviewsByBusinessId(businessId) {
  return data.reviews.filter((r) => r.businessId === businessId);
}

export function getRatingBreakdown(businessId) {
  const reviews = getReviewsByBusinessId(businessId);
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.round(r.rating);
    if (breakdown[star] !== undefined) breakdown[star] += 1;
  });
  return breakdown;
}

// ---- Search --------------------------------------------------------

export function searchBusinesses(citySlug, query) {
  const q = (query || "").trim().toLowerCase();
  const cityBusinesses = citySlug ? getBusinessesByCity(citySlug) : data.businesses;
  if (!q) return cityBusinesses;

  return cityBusinesses.filter((b) => {
    const haystack = [
      b.name,
      b.categoryName,
      b.category,
      b.subcategory,
      b.city,
      b.area,
      ...(b.tags || []),
      ...(b.services || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

// ---- Filtering & Sorting --------------------------------------------

export function filterBusinesses(businesses, filters = {}) {
  let result = [...businesses];

  if (filters.minRating) {
    result = result.filter((b) => b.rating >= Number(filters.minRating));
  }
  if (filters.openNow) {
    result = result.filter((b) => b.isOpen);
  }
  if (filters.priceRange) {
    result = result.filter((b) => b.priceRange === filters.priceRange);
  }
  if (filters.subcategory) {
    result = result.filter(
      (b) => (b.subcategory || "").toLowerCase() === filters.subcategory.toLowerCase()
    );
  }
  return result;
}

export function sortBusinesses(businesses, sortBy = "relevance") {
  const result = [...businesses];
  switch (sortBy) {
    case "rating":
      return result.sort((a, b) => b.rating - a.rating);
    case "reviews":
      return result.sort((a, b) => b.reviewCount - a.reviewCount);
    case "name":
      return result.sort((a, b) => a.name.localeCompare(b.name));
    case "relevance":
    default:
      return result.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
  }
}
