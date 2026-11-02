import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BRANDS } from './constants';
import type { Bike, Brand, BikeType, FuelType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getBikeBySlug(bikes: Bike[], slug: string): Bike | null {
  return bikes.find((b) => b.slug === slug) ?? null;
}

export function filterBikes(
  bikes: Bike[],
  filters: { brand?: Brand; type?: BikeType; fuel?: FuelType }
): Bike[] {
  return bikes.filter((bike) => {
    if (filters.brand && bike.make.toUpperCase() !== filters.brand) return false;
    if (filters.type && bike.type !== filters.type) return false;
    if (filters.fuel && bike.fuel !== filters.fuel) return false;
    return true;
  });
}

/** Brands that actually have at least one bike in the catalogue (in BRANDS order). */
export function getStockedBrands(bikes: Bike[]): Brand[] {
  return BRANDS.filter((brand) => bikes.some((b) => b.make.toUpperCase() === brand));
}

export function hasElectricBikes(bikes: Bike[]): boolean {
  return bikes.some((b) => b.fuel === 'electric');
}

/**
 * Picks up to `limit` bikes, preferring a new brand and a new photo each time,
 * so the same stock image doesn't repeat side by side.
 */
function pickDiverse(pool: Bike[], limit: number): Bike[] {
  const picked: Bike[] = [];
  const usedBrands = new Set<string>();
  const usedImages = new Set<string>();
  const take = (bike: Bike) => {
    picked.push(bike);
    usedBrands.add(bike.make);
    if (bike.images[0]) usedImages.add(bike.images[0]);
  };
  const passes: Array<(b: Bike) => boolean> = [
    (b) => !usedBrands.has(b.make) && !usedImages.has(b.images[0] ?? ''),
    (b) => !usedImages.has(b.images[0] ?? ''),
    () => true,
  ];
  for (const fits of passes) {
    for (const bike of pool) {
      if (picked.length >= limit) return picked;
      if (!picked.includes(bike) && fits(bike)) take(bike);
    }
  }
  return picked;
}

/** Bikes marked `featured: true` win; otherwise a varied pick across brands. */
export function getFeaturedBikes(bikes: Bike[], limit = 6): Bike[] {
  const pinned = bikes.filter((b) => b.featured);
  if (pinned.length > 0) return pinned.slice(0, limit);
  return pickDiverse(bikes, limit);
}

/** Other bikes of the same type, for the "You may also like" row on a bike page. */
export function getRelatedBikes(bikes: Bike[], bike: Bike, limit = 3): Bike[] {
  const sameType = bikes.filter((b) => b.id !== bike.id && b.type === bike.type);
  return pickDiverse(sameType, limit);
}
