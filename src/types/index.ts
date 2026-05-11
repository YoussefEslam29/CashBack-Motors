export type FuelType = 'gas' | 'electric';
export type BikeType = 'motorcycle' | 'scooter';
export type Brand = 'ZONTOS' | 'SYM' | 'KEEWAY' | 'HOGAN' | 'DAYUN' | 'BENELLI' | 'VIGOREY';

export interface BikeSpec {
  labelEn: string;
  labelAr: string;
  value: string;
}

export interface Bike {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  brand: Brand;
  type: BikeType;
  fuel: FuelType;
  isElectric: boolean;
  isNew: boolean;
  isFeatured: boolean;
  images: string[];
  specs: BikeSpec[];
  descriptionEn: string;
  descriptionAr: string;
}

export interface BrandMeta {
  name: Brand;
  slug: string;
  hasScooter: boolean;
  hasMotorcycle: boolean;
  hasElectric: boolean;
}

export type Locale = 'en' | 'ar';
