export interface MarketplaceService {
  id: number;
  title: string;
  description: string;
  category:
    | "SMM"
    | "Web Development"
    | "Mobile App"
    | "Design"
    | "Marketing"
    | "Consulting";
  price: {
    monthly?: number;
    oneTime?: number;
    custom?: boolean;
  };
  duration: string;
  features: string[];
  popular?: boolean;
  new?: boolean;
  rating: number;
  reviewCount: number;
  provider: string;
  image?: string;
  tags: string[];
}

export const marketplaceServices: MarketplaceService[] = [
  {
    id: 1,
    title: "Premium SMM Paketi",
    description:
      "Facebook, Instagram və LinkedIn hesablarınızın professional idarə edilməsi",
    category: "SMM",
    price: { monthly: 500 },
    duration: "Aylıq",
    features: [
      "Həftədə 15 post",
      "Story və Reels hazırlanması",
      "Reklam kampaniyası idarəsi",
      "Analitik hesabatlar",
      "24/7 dəstək",
    ],
    popular: true,
    rating: 4.8,
    reviewCount: 127,
    provider: "UPID Social Media",
    tags: ["sosial media", "instagram", "facebook", "reklam"],
  },
  {
    id: 2,
    title: "E-Ticarət Veb Saytı",
    description: "Modern və responsive e-ticarət platforması",
    category: "Web Development",
    price: { oneTime: 3500 },
    duration: "Birdəfəlik",
    features: [
      "Responsive dizayn",
      "Ödəniş sistemi inteqrasiyası",
      "Məhsul idarəetməsi",
      "SEO optimallaşdırılması",
      "6 aylıq texniki dəstək",
    ],
    new: true,
    rating: 4.9,
    reviewCount: 89,
    provider: "UPID Web Solutions",
    tags: ["e-ticarət", "web sayt", "responsive", "seo"],
  },
  {
    id: 3,
    title: "Mobil Tətbiq Hazırlanması",
    description: "iOS və Android üçün cross-platform mobil tətbiq",
    category: "Mobile App",
    price: { custom: true },
    duration: "Layihə əsaslı",
    features: [
      "Cross-platform inkişaf",
      "UI/UX dizayn",
      "Backend API",
      "App Store yükləmə",
      "1 illik dəstək",
    ],
    rating: 4.7,
    reviewCount: 45,
    provider: "UPID Mobile",
    tags: ["mobil", "ios", "android", "cross-platform"],
  },
  {
    id: 4,
    title: "Brend Dizayn Paketi",
    description: "Loqo, brand guideline və corporate identity",
    category: "Design",
    price: { oneTime: 1200 },
    duration: "2-3 həftə",
    features: [
      "Loqo dizaynı",
      "Brand guideline",
      "Vizit kartı dizaynı",
      "Letterhead tərtibatı",
      "Sosial media template",
    ],
    rating: 4.6,
    reviewCount: 78,
    provider: "UPID Creative",
    tags: ["brend", "logo", "dizayn", "corporate"],
  },
  {
    id: 5,
    title: "SEO Optimallaşdırması",
    description:
      "Veb saytınızın axtarış motorlarında reytinqinin yüksəldilməsi",
    category: "Marketing",
    price: { monthly: 800 },
    duration: "Aylıq",
    features: [
      "Açar söz tədqiqatı",
      "On-page SEO",
      "Texniki SEO audit",
      "Link building",
      "Aylıq performans hesabatı",
    ],
    popular: true,
    rating: 4.8,
    reviewCount: 156,
    provider: "UPID Digital",
    tags: ["seo", "axtarış", "google", "marketing"],
  },
  {
    id: 6,
    title: "IT Məsləhət Xidməti",
    description: "Biznesiniz üçün texnoloji həllər və məsləhət",
    category: "Consulting",
    price: { monthly: 1500 },
    duration: "Saatlıq/Aylıq",
    features: [
      "IT strategiya tərtibatı",
      "Sistem arxitekturası",
      "Texnoloji audit",
      "Rəqəmsal transformasiya",
      "Komanda təlimi",
    ],
    rating: 4.9,
    reviewCount: 67,
    provider: "UPID Consulting",
    tags: ["məsləhət", "it", "strategiya", "transformasiya"],
  },
  {
    id: 7,
    title: "Veb Sayt Texniki Dəstəyi",
    description: "Mövcud veb saytınızın texniki dəstəyi və yeniləmələri",
    category: "Web Development",
    price: { monthly: 300 },
    duration: "Aylıq",
    features: [
      "24/7 izləmə",
      "Təhlükəsizlik yeniləmələri",
      "Backup və bərpa",
      "Performans optimallaşdırması",
      "Bug düzəlişləri",
    ],
    rating: 4.7,
    reviewCount: 203,
    provider: "UPID Support",
    tags: ["dəstək", "texniki", "backup", "təhlükəsizlik"],
  },
  {
    id: 8,
    title: "Google Ads Kampaniyası",
    description: "Məqsədli Google reklamları ilə satışlarınızı artırın",
    category: "Marketing",
    price: { monthly: 600 },
    duration: "Aylıq",
    features: [
      "Kampanya strategiyası",
      "Açar söz tədqiqatı",
      "Ad copy yazılması",
      "Landing page optimallaşdırması",
      "Detallı analitika",
    ],
    new: true,
    rating: 4.5,
    reviewCount: 92,
    provider: "UPID Ads",
    tags: ["google ads", "reklam", "ppc", "kampaniya"],
  },
];

export const serviceCategories = [
  "Hamısı",
  "SMM",
  "Web Development",
  "Mobile App",
  "Design",
  "Marketing",
  "Consulting",
] as const;

export const getServicesByCategory = (
  category: string
): MarketplaceService[] => {
  if (category === "Hamısı") {
    return marketplaceServices;
  }
  return marketplaceServices.filter((service) => service.category === category);
};

export const getPopularServices = (): MarketplaceService[] => {
  return marketplaceServices.filter((service) => service.popular);
};

export const getNewServices = (): MarketplaceService[] => {
  return marketplaceServices.filter((service) => service.new);
};
