import type { Bike } from '@/types';

export const bikes: Bike[] = [
  // ── ZONTOS (scooter + motorcycle) ──────────────────────────
  {
    id: '1',
    slug: 'zontos-zts-350-gs',
    name: 'Zontos ZT350-GS',
    nameAr: 'زونتوس ZT350-GS',
    brand: 'ZONTOS',
    type: 'motorcycle',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: true,
    images: ['/bikes/sport-thunder-250.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '350cc Parallel Twin' },
      { labelEn: 'Power', labelAr: 'القوة', value: '38 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '160 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '178 kg' },
    ],
    descriptionEn:
      'The ZT350-GS is a versatile adventure-touring motorcycle built for long-distance comfort and on-road agility. Powered by a punchy 350cc parallel twin engine.',
    descriptionAr:
      'ZT350-GS دراجة مغامرات متعددة الاستخدامات مصممة لراحة المسافات الطويلة وخفة الحركة. بمحرك 350 سي سي توأم متوازي.',
  },
  {
    id: '2',
    slug: 'zontos-zt-125-u',
    name: 'Zontos ZT125-U',
    nameAr: 'زونتوس ZT125-U',
    brand: 'ZONTOS',
    type: 'scooter',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: false,
    images: ['/bikes/swift-125-scooter.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '125cc Single Cylinder' },
      { labelEn: 'Power', labelAr: 'القوة', value: '12 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '100 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '120 kg' },
    ],
    descriptionEn:
      'An efficient urban scooter with a reliable 125cc engine, generous under-seat storage, and sleek styling perfect for city commuting.',
    descriptionAr:
      'سكوتر حضري بمحرك 125 سي سي موثوق ومساحة تخزين واسعة وتصميم أنيق مثالي للتنقل في المدينة.',
  },

  // ── SYM (scooter only) ─────────────────────────────────────
  {
    id: '3',
    slug: 'sym-symphony-st-200',
    name: 'SYM Symphony ST 200',
    nameAr: 'SYM سيمفوني ST 200',
    brand: 'SYM',
    type: 'scooter',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: true,
    images: ['/bikes/city-cruiser-150.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '175cc 4-Stroke' },
      { labelEn: 'Power', labelAr: 'القوة', value: '16 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '115 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '140 kg' },
    ],
    descriptionEn:
      'The Symphony ST 200 is SYM\'s flagship commuter scooter. A smooth 175cc engine with excellent fuel economy for daily Cairo rides.',
    descriptionAr:
      'سيمفوني ST 200 هو سكوتر SYM الرائد. محرك 175 سي سي سلس مع اقتصاد ممتاز في الوقود للتنقل اليومي.',
  },
  {
    id: '4',
    slug: 'sym-crox-125',
    name: 'SYM Crox 125',
    nameAr: 'SYM كروكس 125',
    brand: 'SYM',
    type: 'scooter',
    fuel: 'gas',
    isElectric: false,
    isNew: false,
    isFeatured: false,
    images: ['/bikes/swift-125-scooter.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '125cc Air-Cooled' },
      { labelEn: 'Power', labelAr: 'القوة', value: '10 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '95 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '112 kg' },
    ],
    descriptionEn:
      'Compact, light, and affordable. The Crox 125 is the entry-level SYM scooter designed for first-time riders and quick errands.',
    descriptionAr:
      'صغير وخفيف وبسعر مناسب. كروكس 125 هو سكوتر SYM للمبتدئين المصمم للركاب الجدد والتنقلات السريعة.',
  },

  // ── KEEWAY (scooter + motorcycle + electric) ───────────────
  {
    id: '5',
    slug: 'keeway-rkf-125',
    name: 'Keeway RKF 125',
    nameAr: 'كيواي RKF 125',
    brand: 'KEEWAY',
    type: 'motorcycle',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: true,
    images: ['/bikes/sport-thunder-250.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '125cc Liquid-Cooled' },
      { labelEn: 'Power', labelAr: 'القوة', value: '15 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '120 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '135 kg' },
    ],
    descriptionEn:
      'A sharp-looking naked sport bike from Keeway. The RKF 125 combines aggressive styling with nimble handling for urban riding.',
    descriptionAr:
      'دراجة رياضية أنيقة من كيواي. RKF 125 تجمع بين التصميم العدواني والتحكم الرشيق للقيادة في المدينة.',
  },
  {
    id: '6',
    slug: 'keeway-e-zi-mini',
    name: 'Keeway E-Zi Mini',
    nameAr: 'كيواي E-Zi ميني',
    brand: 'KEEWAY',
    type: 'scooter',
    fuel: 'electric',
    isElectric: true,
    isNew: true,
    isFeatured: true,
    images: ['/bikes/eco-glide-e1.jpg'],
    specs: [
      { labelEn: 'Motor', labelAr: 'المحرك', value: '1200W Hub Motor' },
      { labelEn: 'Range', labelAr: 'المدى', value: '65 km' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '45 km/h' },
      { labelEn: 'Charge Time', labelAr: 'وقت الشحن', value: '4 hours' },
    ],
    descriptionEn:
      'Go electric without compromise. The E-Zi Mini is a compact urban electric scooter with removable battery and zero emissions.',
    descriptionAr:
      'انطلق بالكهرباء بدون تنازل. E-Zi ميني سكوتر كهربائي مدمج ببطارية قابلة للفك وبدون انبعاثات.',
  },

  // ── HOGAN (scooter + motorcycle) ───────────────────────────
  {
    id: '7',
    slug: 'hogan-classic-200',
    name: 'Hogan Classic 200',
    nameAr: 'هوجان كلاسيك 200',
    brand: 'HOGAN',
    type: 'motorcycle',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: true,
    images: ['/bikes/road-king-200.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '200cc Air-Cooled' },
      { labelEn: 'Power', labelAr: 'القوة', value: '18 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '125 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '155 kg' },
    ],
    descriptionEn:
      'Built for the long road. The Classic 200 is a touring motorcycle with a powerful engine, large fuel tank, and supreme comfort.',
    descriptionAr:
      'مصممة للطريق الطويل. كلاسيك 200 دراجة سياحية بمحرك قوي وخزان وقود كبير وراحة فائقة.',
  },
  {
    id: '8',
    slug: 'hogan-flash-110',
    name: 'Hogan Flash 110',
    nameAr: 'هوجان فلاش 110',
    brand: 'HOGAN',
    type: 'scooter',
    fuel: 'gas',
    isElectric: false,
    isNew: false,
    isFeatured: false,
    images: ['/bikes/swift-125-scooter.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '110cc Air-Cooled' },
      { labelEn: 'Power', labelAr: 'القوة', value: '8 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '85 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '100 kg' },
    ],
    descriptionEn:
      'The everyday workhorse. Reliable, efficient, and built for Egyptian roads. A perfect scooter for delivery and commuting.',
    descriptionAr:
      'حصان العمل اليومي. موثوق وفعال ومصمم للطرق المصرية. سكوتر مثالي للتوصيل والتنقل.',
  },

  // ── DAYUN (scooter only) ───────────────────────────────────
  {
    id: '9',
    slug: 'dayun-dy-125t',
    name: 'Dayun DY125T',
    nameAr: 'دايون DY125T',
    brand: 'DAYUN',
    type: 'scooter',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: false,
    images: ['/bikes/swift-125-scooter.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '125cc 4-Stroke' },
      { labelEn: 'Power', labelAr: 'القوة', value: '10 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '95 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '108 kg' },
    ],
    descriptionEn:
      'Nimble, affordable, and reliable. The DY125T is the go-to scooter for quick city trips and delivery runs.',
    descriptionAr:
      'رشيق وبسعر مناسب وموثوق. DY125T هو السكوتر المثالي للرحلات السريعة في المدينة وعمليات التوصيل.',
  },
  {
    id: '10',
    slug: 'dayun-dy-150t',
    name: 'Dayun DY150T',
    nameAr: 'دايون DY150T',
    brand: 'DAYUN',
    type: 'scooter',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: false,
    images: ['/bikes/city-cruiser-150.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '150cc Air-Cooled' },
      { labelEn: 'Power', labelAr: 'القوة', value: '12 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '105 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '118 kg' },
    ],
    descriptionEn:
      'Upgraded engine for those who need more power. The DY150T handles highways comfortably while keeping fuel costs low.',
    descriptionAr:
      'محرك مطور لمن يحتاج قوة أكبر. DY150T يتحرك على الطرق السريعة براحة مع الحفاظ على استهلاك منخفض.',
  },

  // ── BENELLI (motorcycle only) ──────────────────────────────
  {
    id: '11',
    slug: 'benelli-tnt-150i',
    name: 'Benelli TNT 150i',
    nameAr: 'بينيلي TNT 150i',
    brand: 'BENELLI',
    type: 'motorcycle',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: true,
    images: ['/bikes/titan-400-adventure.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '150cc Single Cylinder' },
      { labelEn: 'Power', labelAr: 'القوة', value: '14 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '115 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '148 kg' },
    ],
    descriptionEn:
      'Italian engineering meets street performance. The TNT 150i is a naked streetfighter with sharp handling and bold styling.',
    descriptionAr:
      'الهندسة الإيطالية تلتقي بأداء الشارع. TNT 150i دراجة شارع عارية بتحكم حاد وتصميم جريء.',
  },
  {
    id: '12',
    slug: 'benelli-leoncino-250',
    name: 'Benelli Leoncino 250',
    nameAr: 'بينيلي ليونشينو 250',
    brand: 'BENELLI',
    type: 'motorcycle',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: false,
    images: ['/bikes/shadow-300-naked.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '250cc Single Cylinder' },
      { labelEn: 'Power', labelAr: 'القوة', value: '25 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '135 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '162 kg' },
    ],
    descriptionEn:
      'A scrambler-inspired design with adventure-ready capability. The Leoncino 250 turns heads on both street and trail.',
    descriptionAr:
      'تصميم مستوحى من دراجات السكرامبلر مع قدرة على المغامرة. ليونشينو 250 تلفت الأنظار في الشارع والطريق الوعر.',
  },

  // ── VIGOREY (scooter + motorcycle + electric) ──────────────
  {
    id: '13',
    slug: 'vigorey-vr-200',
    name: 'Vigorey VR200',
    nameAr: 'فيجوري VR200',
    brand: 'VIGOREY',
    type: 'motorcycle',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: false,
    images: ['/bikes/sport-thunder-250.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '200cc Liquid-Cooled' },
      { labelEn: 'Power', labelAr: 'القوة', value: '20 HP' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '130 km/h' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '145 kg' },
    ],
    descriptionEn:
      'Sport-inspired design meets practical performance. The VR200 is a versatile motorcycle for thrill seekers and daily riders alike.',
    descriptionAr:
      'تصميم رياضي يلتقي بأداء عملي. VR200 دراجة متعددة الاستخدامات لعشاق الإثارة والركاب اليوميين.',
  },
  {
    id: '14',
    slug: 'vigorey-e-force-s',
    name: 'Vigorey E-Force S',
    nameAr: 'فيجوري E-Force S',
    brand: 'VIGOREY',
    type: 'scooter',
    fuel: 'electric',
    isElectric: true,
    isNew: true,
    isFeatured: true,
    images: ['/bikes/volt-racer-e3.jpg'],
    specs: [
      { labelEn: 'Motor', labelAr: 'المحرك', value: '3000W Mid-Drive' },
      { labelEn: 'Range', labelAr: 'المدى', value: '80 km' },
      { labelEn: 'Top Speed', labelAr: 'السرعة القصوى', value: '70 km/h' },
      { labelEn: 'Charge Time', labelAr: 'وقت الشحن', value: '5 hours' },
    ],
    descriptionEn:
      'Electric performance redefined. The E-Force S combines sporty looks with instant torque and zero maintenance costs.',
    descriptionAr:
      'أداء كهربائي بمفهوم جديد. E-Force S يجمع بين المظهر الرياضي والعزم الفوري وتكلفة صيانة صفرية.',
  },
];
