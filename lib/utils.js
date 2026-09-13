export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function slugToTitle(slug = "") {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function telHref(phone) {
  return `tel:${phone}`;
}

export function whatsappHref(phone, message = "Hi, I found your business on CityDial and would like to know more.") {
  const clean = (phone || "").replace(/\D/g, "");
  return `https://wa.me/91${clean}?text=${encodeURIComponent(message)}`;
}

export function directionsHref(address) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
