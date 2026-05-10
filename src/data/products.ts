export type Brand = "ZONTOS" | "SYM" | "KEEWAY" | "HOGAN" | "DAYUN" | "BENELLI" | "VIGOREY";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  brand: Brand;
  description: string;
  descriptionAr: string;
  category: "motorcycle" | "scooter";
  fuel: "gas" | "electric";
  images: string[];
  specs: {
    engine: string;
    power: string;
    topSpeed: string;
    year: number;
  };
  featured: boolean;
}

export const brands: Brand[] = [
  "ZONTOS",
  "SYM",
  "KEEWAY",
  "HOGAN",
  "DAYUN",
  "BENELLI",
  "VIGOREY",
];

export const products: Product[] = [
  {
    id: "1",
    slug: "zontos-sport-250",
    name: "Zontos Sport 250",
    nameAr: "زونتوس سبورت 250",
    brand: "ZONTOS",
    description:
      "A high-performance sport bike built for speed enthusiasts. Aggressive styling meets raw power with a liquid-cooled 250cc engine.",
    descriptionAr:
      "دراجة رياضية عالية الأداء مصممة لعشاق السرعة. تصميم عدواني يلتقي بقوة خام مع محرك 250 سي سي مبرد بالسائل.",
    category: "motorcycle",
    fuel: "gas",
    images: ["/bikes/sport-thunder-250.jpg"],
    specs: {
      engine: "250cc Liquid-Cooled",
      power: "26 HP",
      topSpeed: "140 km/h",
      year: 2025,
    },
    featured: true,
  },
  {
    id: "2",
    slug: "sym-cruiser-150",
    name: "SYM Cruiser 150",
    nameAr: "SYM كروزر 150",
    brand: "SYM",
    description:
      "The perfect daily commuter scooter. Fuel-efficient 150cc engine with comfortable ergonomics designed for Cairo's streets.",
    descriptionAr:
      "السكوتر المثالي للتنقل اليومي. محرك 150 سي سي موفر للوقود مع تصميم مريح مصمم لشوارع القاهرة.",
    category: "scooter",
    fuel: "gas",
    images: ["/bikes/city-cruiser-150.jpg"],
    specs: {
      engine: "150cc Air-Cooled",
      power: "14 HP",
      topSpeed: "110 km/h",
      year: 2025,
    },
    featured: true,
  },
  {
    id: "3",
    slug: "keeway-e-glide",
    name: "Keeway E-Glide",
    nameAr: "كيواي إي جلايد",
    brand: "KEEWAY",
    description:
      "Go green without compromise. This electric scooter offers 80km range on a single charge with zero emissions.",
    descriptionAr:
      "انطلق بالكهرباء بدون تنازل. سكوتر كهربائي يوفر 80 كم في الشحنة الواحدة بدون انبعاثات.",
    category: "scooter",
    fuel: "electric",
    images: ["/bikes/eco-glide-e1.jpg"],
    specs: {
      engine: "3000W Hub Motor",
      power: "4 HP Equivalent",
      topSpeed: "65 km/h",
      year: 2025,
    },
    featured: true,
  },
  {
    id: "4",
    slug: "hogan-road-200",
    name: "Hogan Road 200",
    nameAr: "هوجان رود 200",
    brand: "HOGAN",
    description:
      "Built for the long road. A touring motorcycle with a powerful 200cc engine, large fuel tank, and supreme comfort.",
    descriptionAr:
      "مصممة للطريق الطويل. دراجة سياحية بمحرك 200 سي سي قوي وخزان وقود كبير وراحة فائقة.",
    category: "motorcycle",
    fuel: "gas",
    images: ["/bikes/road-king-200.jpg"],
    specs: {
      engine: "200cc Air-Cooled",
      power: "18 HP",
      topSpeed: "125 km/h",
      year: 2024,
    },
    featured: true,
  },
  {
    id: "5",
    slug: "dayun-swift-125",
    name: "Dayun Swift 125",
    nameAr: "دايون سويفت 125",
    brand: "DAYUN",
    description:
      "Nimble, affordable, and reliable. The Swift 125 is the go-to scooter for quick city trips and delivery runs.",
    descriptionAr:
      "رشيق وبسعر مناسب وموثوق. سويفت 125 هو السكوتر المثالي للرحلات السريعة في المدينة وعمليات التوصيل.",
    category: "scooter",
    fuel: "gas",
    images: ["/bikes/swift-125-scooter.jpg"],
    specs: {
      engine: "125cc Air-Cooled",
      power: "10 HP",
      topSpeed: "95 km/h",
      year: 2025,
    },
    featured: true,
  },
  {
    id: "6",
    slug: "vigorey-volt-e3",
    name: "Vigorey Volt E3",
    nameAr: "فيجوري فولت E3",
    brand: "VIGOREY",
    description:
      "Electric performance redefined. The Volt E3 combines sporty looks with instant torque and zero maintenance.",
    descriptionAr:
      "أداء كهربائي بمفهوم جديد. فولت E3 يجمع بين المظهر الرياضي والعزم الفوري وصيانة صفرية.",
    category: "motorcycle",
    fuel: "electric",
    images: ["/bikes/volt-racer-e3.jpg"],
    specs: {
      engine: "5000W Mid-Drive",
      power: "8 HP Equivalent",
      topSpeed: "100 km/h",
      year: 2025,
    },
    featured: true,
  },
  {
    id: "7",
    slug: "keeway-flash-50",
    name: "Keeway Flash 50",
    nameAr: "كيواي فلاش 50",
    brand: "KEEWAY",
    description:
      "Compact and easy to ride. Perfect for beginners and short commutes with an ultra-efficient 50cc engine.",
    descriptionAr:
      "صغير وسهل القيادة. مثالي للمبتدئين والتنقلات القصيرة بمحرك 50 سي سي فائق الكفاءة.",
    category: "scooter",
    fuel: "gas",
    images: ["/bikes/flash-50-mini.jpg"],
    specs: {
      engine: "50cc 4-Stroke",
      power: "4 HP",
      topSpeed: "60 km/h",
      year: 2024,
    },
    featured: false,
  },
  {
    id: "8",
    slug: "benelli-titan-400",
    name: "Benelli Titan 400",
    nameAr: "بينيلي تيتان 400",
    brand: "BENELLI",
    description:
      "Conquer any terrain. The Titan 400 is a dual-sport adventure bike with serious off-road capability and highway comfort.",
    descriptionAr:
      "اغزي أي تضاريس. تيتان 400 دراجة مغامرات مزدوجة الاستخدام بقدرة جدية على الطرق الوعرة وراحة على الطريق السريع.",
    category: "motorcycle",
    fuel: "gas",
    images: ["/bikes/titan-400-adventure.jpg"],
    specs: {
      engine: "400cc Liquid-Cooled",
      power: "40 HP",
      topSpeed: "160 km/h",
      year: 2025,
    },
    featured: false,
  },
  {
    id: "9",
    slug: "vigorey-breeze-e",
    name: "Vigorey Breeze E",
    nameAr: "فيجوري بريز كهربائي",
    brand: "VIGOREY",
    description:
      "Whisper-quiet and wallet-friendly. The Breeze is the ideal electric scooter for eco-conscious urban riders.",
    descriptionAr:
      "هادئ تماماً وصديق للميزانية. بريز هو السكوتر الكهربائي المثالي للركاب الحضريين المهتمين بالبيئة.",
    category: "scooter",
    fuel: "electric",
    images: ["/bikes/breeze-electric-scooter.jpg"],
    specs: {
      engine: "2000W Hub Motor",
      power: "3 HP Equivalent",
      topSpeed: "50 km/h",
      year: 2025,
    },
    featured: false,
  },
  {
    id: "10",
    slug: "zontos-shadow-300",
    name: "Zontos Shadow 300",
    nameAr: "زونتوس شادو 300",
    brand: "ZONTOS",
    description:
      "Raw and unfiltered. The Shadow 300 is a naked streetfighter that turns heads with its aggressive stance and punchy engine.",
    descriptionAr:
      "خام وبدون فلاتر. شادو 300 دراجة شارع عارية تلفت الأنظار بوقفتها العدوانية ومحركها القوي.",
    category: "motorcycle",
    fuel: "gas",
    images: ["/bikes/shadow-300-naked.jpg"],
    specs: {
      engine: "300cc Liquid-Cooled",
      power: "32 HP",
      topSpeed: "150 km/h",
      year: 2025,
    },
    featured: false,
  },
  {
    id: "11",
    slug: "hogan-metro-110",
    name: "Hogan Metro 110",
    nameAr: "هوجان مترو 110",
    brand: "HOGAN",
    description:
      "The everyday workhorse. Reliable, efficient, and built for Egyptian roads. A perfect scooter for delivery and commuting.",
    descriptionAr:
      "حصان العمل اليومي. موثوق وفعال ومصمم للطرق المصرية. سكوتر مثالي للتوصيل والتنقل.",
    category: "scooter",
    fuel: "gas",
    images: ["/bikes/swift-125-scooter.jpg"],
    specs: {
      engine: "110cc Air-Cooled",
      power: "8 HP",
      topSpeed: "85 km/h",
      year: 2025,
    },
    featured: false,
  },
  {
    id: "12",
    slug: "keeway-racer-200",
    name: "Keeway Racer 200",
    nameAr: "كيواي ريسر 200",
    brand: "KEEWAY",
    description:
      "Sport-inspired design meets practical performance. The Racer 200 is a versatile motorcycle for thrill seekers and daily riders alike.",
    descriptionAr:
      "تصميم رياضي يلتقي بأداء عملي. ريسر 200 دراجة متعددة الاستخدامات لعشاق الإثارة والركاب اليوميين.",
    category: "motorcycle",
    fuel: "gas",
    images: ["/bikes/sport-thunder-250.jpg"],
    specs: {
      engine: "200cc Liquid-Cooled",
      power: "20 HP",
      topSpeed: "130 km/h",
      year: 2025,
    },
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(
  category?: string,
  fuel?: string,
  brand?: string
): Product[] {
  let filtered = [...products];
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (fuel && fuel !== "all") {
    filtered = filtered.filter((p) => p.fuel === fuel);
  }
  if (brand && brand !== "all") {
    filtered = filtered.filter((p) => p.brand === brand);
  }
  return filtered;
}

export function getProductsByBrand(brand: Brand): Product[] {
  return products.filter((p) => p.brand === brand);
}
