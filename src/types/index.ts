export type FuelType = 'gas' | 'electric';
export type BikeType = 'motorcycle' | 'scooter';
export type Brand = 'ZONTES' | 'SYM' | 'KEEWAY' | 'HOGAN' | 'DAYUN' | 'BENELLI' | 'VIGOREY';

/** Spec rows shown on the bike page. Labels live in messages/*.json under `specs`. */
export type SpecKey =
  | 'engine'
  | 'power'
  | 'topSpeed'
  | 'transmission'
  | 'fuelTank'
  | 'weight'
  | 'brakes'
  | 'battery'
  | 'range';

export interface Bike {
  id: string;
  slug: string;
  make: string;
  model: string;
  name: { en: string; ar: string };
  type: BikeType;
  fuel: FuelType;
  /** First image is the main photo. Add more paths to show a gallery on the bike page. */
  images: string[];
  /** Optional. Shown on the bike page when filled in. */
  description?: { en: string; ar: string };
  /** Optional. Only the rows you fill in are shown, e.g. { engine: '155cc', topSpeed: '110 km/h' }. */
  specs?: Partial<Record<SpecKey, string>>;
  /** Optional. Set true to pin this bike to the home page "Featured" section. */
  featured?: boolean;
}

export interface BrandMeta {
  name: Brand;
  slug: string;
  hasScooter: boolean;
  hasMotorcycle: boolean;
  hasElectric: boolean;
}

export type Locale = 'en' | 'ar';
