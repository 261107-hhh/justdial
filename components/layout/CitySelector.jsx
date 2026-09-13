"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { getCities } from "@/lib/data";
import styles from "./CitySelector.module.css";

export function CitySelector({ currentCity }) {
  const router = useRouter();
  const cities = getCities();

  function handleSelect(citySlug) {
    router.push(`/${citySlug}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={styles.trigger} type="button">
          <MapPin size={16} className={styles.icon} />
          <span>{currentCity || "Select City"}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Choose your city</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cities.map((city) => (
          <DropdownMenuItem key={city.slug} onSelect={() => handleSelect(city.slug)}>
            {city.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
