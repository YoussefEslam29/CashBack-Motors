export type FuelType = 'gas' | 'electric';
export type BikeType = 'motorcycle' | 'scooter';
export type Brand = 'ZONTOS' | 'SYM' | 'KEEWAY' | 'HOGAN' | 'DAYUN' | 'BENELLI' | 'VIGOREY';

export interface Bike {
  id: string;
  slug: string;
  make: string;
  model: string;
  name: { en: string; ar: string };
  type: BikeType;
  fuel: FuelType;
  images: string[];
}

export interface BrandMeta {
  name: Brand;
  slug: string;
  hasScooter: boolean;
  hasMotorcycle: boolean;
  hasElectric: boolean;
}

export type Locale = 'en' | 'ar';
