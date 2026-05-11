import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
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
    if (filters.brand && bike.brand !== filters.brand) return false;
    if (filters.type && bike.type !== filters.type) return false;
    if (filters.fuel && bike.fuel !== filters.fuel) return false;
    return true;
  });
}

export function getFeaturedBikes(bikes: Bike[]): Bike[] {
  return bikes.filter((b) => b.isFeatured);
}
