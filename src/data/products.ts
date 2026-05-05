export interface Product {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number | null;
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

export const products: Product[] = [
  {
    id: "1",
    slug: "sport-thunder-250",
    name: "Sport Thunder 250",
    nameAr: "سبورت ثاندر 250",
    description:
      "A high-performance sport bike built for speed enthusiasts. Aggressive styling meets raw power with a liquid-cooled 250cc engine.",
    descriptionAr:
      "دراجة رياضية عالية الأداء مصممة لعشاق السرعة. تصميم عدواني يلتقي بقوة خام مع محرك 250 سي سي مبرد بالسائل.",
    price: 45000,
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
    slug: "city-cruiser-150",
    name: "City Cruiser 150",
    nameAr: "سيتي كروزر 150",
    description:
      "The perfect daily commuter. Fuel-efficient 150cc engine with comfortable ergonomics designed for Cairo's streets.",
    descriptionAr:
      "الرفيق المثالي للتنقل اليومي. محرك 150 سي سي موفر للوقود مع تصميم مريح مصمم لشوارع القاهرة.",
    price: 28000,
    category: "motorcycle",
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
    slug: "eco-glide-e1",
    name: "Eco Glide E1",
    nameAr: "إيكو جلايد E1",
    description:
      "Go green without compromise. This electric scooter offers 80km range on a single charge with zero emissions.",
    descriptionAr:
      "انطلق بالكهرباء بدون تنازل. سكوتر كهربائي يوفر 80 كم في الشحنة الواحدة بدون انبعاثات.",
    price: 22000,
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
    slug: "road-king-200",
    name: "Road King 200",
    nameAr: "رود كينج 200",
    description:
      "Built for the long road. A touring motorcycle with a powerful 200cc engine, large fuel tank, and supreme comfort.",
    descriptionAr:
      "مصممة للطريق الطويل. دراجة سياحية بمحرك 200 سي سي قوي وخزان وقود كبير وراحة فائقة.",
    price: 38000,
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
    slug: "swift-125-scooter",
    name: "Swift 125 Scooter",
    nameAr: "سويفت 125 سكوتر",
    description:
      "Nimble, affordable, and reliable. The Swift 125 is the go-to scooter for quick city trips and delivery runs.",
    descriptionAr:
      "رشيق وبسعر مناسب وموثوق. سويفت 125 هو السكوتر المثالي للرحلات السريعة في المدينة وعمليات التوصيل.",
    price: 18000,
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
    slug: "volt-racer-e3",
    name: "Volt Racer E3",
    nameAr: "فولت ريسر E3",
    description:
      "Electric performance redefined. The Volt Racer E3 combines sporty looks with instant torque and zero maintenance.",
    descriptionAr:
      "أداء كهربائي بمفهوم جديد. فولت ريسر E3 يجمع بين المظهر الرياضي والعزم الفوري وصيانة صفرية.",
    price: null,
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
    slug: "flash-50-mini",
    name: "Flash 50 Mini",
    nameAr: "فلاش 50 ميني",
    description:
      "Compact and easy to ride. Perfect for beginners and short commutes with an ultra-efficient 50cc engine.",
    descriptionAr:
      "صغير وسهل القيادة. مثالي للمبتدئين والتنقلات القصيرة بمحرك 50 سي سي فائق الكفاءة.",
    price: 12000,
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
    slug: "titan-400-adventure",
    name: "Titan 400 Adventure",
    nameAr: "تيتان 400 أدفنتشر",
    description:
      "Conquer any terrain. The Titan 400 is a dual-sport adventure bike with serious off-road capability and highway comfort.",
    descriptionAr:
      "اغزي أي تضاريس. تيتان 400 دراجة مغامرات مزدوجة الاستخدام بقدرة جدية على الطرق الوعرة وراحة على الطريق السريع.",
    price: 65000,
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
    slug: "breeze-electric-scooter",
    name: "Breeze E-Scooter",
    nameAr: "بريز سكوتر كهربائي",
    description:
      "Whisper-quiet and wallet-friendly. The Breeze is the ideal electric scooter for eco-conscious urban riders.",
    descriptionAr:
      "هادئ تماماً وصديق للميزانية. بريز هو السكوتر الكهربائي المثالي للركاب الحضريين المهتمين بالبيئة.",
    price: 15000,
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
    slug: "shadow-300-naked",
    name: "Shadow 300 Naked",
    nameAr: "شادو 300 نيكد",
    description:
      "Raw and unfiltered. The Shadow 300 is a naked streetfighter that turns heads with its aggressive stance and punchy engine.",
    descriptionAr:
      "خام وبدون فلاتر. شادو 300 دراجة شارع عارية تلفت الأنظار بوقفتها العدوانية ومحركها القوي.",
    price: 52000,
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
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(
  category?: string,
  fuel?: string
): Product[] {
  let filtered = [...products];
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (fuel && fuel !== "all") {
    filtered = filtered.filter((p) => p.fuel === fuel);
  }
  return filtered;
}
