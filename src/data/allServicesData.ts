export interface AdminService {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  category: string;
  subcategory?: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  status: "active" | "inactive" | "pending" | "draft";
  createdDate: string;
  lastModified: string;
  subscriberCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  images: string[];
  serviceType: "one-time" | "subscription" | "custom";
  isPopular: boolean;
  isFeatured: boolean;
}

// Mock data for all services in the system
export const allServices: AdminService[] = [
  {
    id: "serv-001",
    name: "Professional Web Development",
    companyId: "comp-001",
    companyName: "TechCorp Solutions",
    companyLogo: "/images/company/techcorp-logo.png",
    category: "İT Xidmətləri",
    subcategory: "Web Development",
    description:
      "Professional web development service with modern technologies, responsive design, and comprehensive support. Our team delivers high-quality websites that drive business growth.",
    shortDescription: "Professional web development with modern technologies",
    price: 2500,
    currency: "AZN",
    duration: "1 ay",
    features: [
      "Responsive web design",
      "SEO optimization",
      "24/7 technical support",
      "Monthly maintenance",
      "SSL certificate included",
      "Cross-browser compatibility",
      "Mobile optimization",
    ],
    status: "active",
    createdDate: "2024-01-10",
    lastModified: "2024-09-25",
    subscriberCount: 45,
    rating: 4.8,
    reviewCount: 32,
    tags: ["web", "development", "responsive", "SEO"],
    images: [
      "/images/services/web-dev-1.jpg",
      "/images/services/web-dev-2.jpg",
    ],
    serviceType: "subscription",
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "serv-002",
    name: "Advanced Cloud Solutions",
    companyId: "comp-002",
    companyName: "CloudTech Pro",
    companyLogo: "/images/company/cloudtech-logo.png",
    category: "İT Xidmətləri",
    subcategory: "Cloud Services",
    description:
      "Comprehensive cloud infrastructure solutions including AWS, Azure, and Google Cloud services with 24/7 monitoring and support.",
    shortDescription: "Enterprise cloud solutions with 24/7 support",
    price: 1800,
    currency: "AZN",
    duration: "1 ay",
    features: [
      "Multi-cloud support",
      "Auto-scaling",
      "Backup & disaster recovery",
      "Security monitoring",
      "Performance optimization",
    ],
    status: "active",
    createdDate: "2024-02-05",
    lastModified: "2024-09-20",
    subscriberCount: 28,
    rating: 4.6,
    reviewCount: 19,
    tags: ["cloud", "AWS", "Azure", "infrastructure"],
    images: ["/images/services/cloud-1.jpg"],
    serviceType: "subscription",
    isPopular: true,
    isFeatured: false,
  },
  {
    id: "serv-003",
    name: "Digital Marketing Campaign",
    companyId: "comp-003",
    companyName: "MarketPro Agency",
    companyLogo: "/images/company/marketpro-logo.png",
    category: "Marketinq",
    subcategory: "Digital Marketing",
    description:
      "Comprehensive digital marketing campaigns including social media management, content creation, and paid advertising across multiple platforms.",
    shortDescription: "Complete digital marketing solution",
    price: 1200,
    currency: "AZN",
    duration: "1 ay",
    features: [
      "Social media management",
      "Content creation",
      "Paid advertising",
      "Analytics & reporting",
      "Brand strategy",
    ],
    status: "active",
    createdDate: "2024-01-20",
    lastModified: "2024-09-28",
    subscriberCount: 67,
    rating: 4.7,
    reviewCount: 89,
    tags: ["marketing", "social media", "advertising"],
    images: [
      "/images/services/marketing-1.jpg",
      "/images/services/marketing-2.jpg",
    ],
    serviceType: "subscription",
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "serv-004",
    name: "Corporate Legal Consultation",
    companyId: "comp-004",
    companyName: "LegalExperts LLC",
    companyLogo: "/images/company/legal-logo.png",
    category: "Hüquqi Xidmətlər",
    subcategory: "Corporate Law",
    description:
      "Professional legal consultation services for corporate matters, contract reviews, and business compliance.",
    shortDescription: "Expert corporate legal consultation",
    price: 800,
    currency: "AZN",
    duration: "1 saatı",
    features: [
      "Contract review",
      "Legal compliance",
      "Business structure advice",
      "Risk assessment",
      "Documentation support",
    ],
    status: "active",
    createdDate: "2024-03-01",
    lastModified: "2024-09-15",
    subscriberCount: 23,
    rating: 4.9,
    reviewCount: 15,
    tags: ["legal", "corporate", "consultation"],
    images: ["/images/services/legal-1.jpg"],
    serviceType: "one-time",
    isPopular: false,
    isFeatured: false,
  },
  {
    id: "serv-005",
    name: "Financial Planning & Analysis",
    companyId: "comp-005",
    companyName: "FinanceWise Consulting",
    companyLogo: "/images/company/finance-logo.png",
    category: "Maliyyə",
    subcategory: "Financial Planning",
    description:
      "Comprehensive financial planning and analysis services for businesses and individuals, including investment strategies and risk management.",
    shortDescription: "Professional financial planning services",
    price: 1500,
    currency: "AZN",
    duration: "1 həftə",
    features: [
      "Investment strategy",
      "Risk assessment",
      "Budget planning",
      "Financial reporting",
      "Tax optimization",
    ],
    status: "active",
    createdDate: "2024-02-15",
    lastModified: "2024-09-22",
    subscriberCount: 34,
    rating: 4.5,
    reviewCount: 26,
    tags: ["finance", "planning", "investment"],
    images: ["/images/services/finance-1.jpg"],
    serviceType: "one-time",
    isPopular: false,
    isFeatured: true,
  },
  {
    id: "serv-006",
    name: "Graphic Design Services",
    companyId: "comp-006",
    companyName: "Creative Studio",
    companyLogo: "/images/company/creative-logo.png",
    category: "Dizayn",
    subcategory: "Graphic Design",
    description:
      "Professional graphic design services including logo design, branding, print materials, and digital graphics.",
    shortDescription: "Creative graphic design solutions",
    price: 600,
    currency: "AZN",
    duration: "1 həftə",
    features: [
      "Logo design",
      "Brand identity",
      "Print materials",
      "Digital graphics",
      "Unlimited revisions",
    ],
    status: "active",
    createdDate: "2024-01-25",
    lastModified: "2024-09-18",
    subscriberCount: 52,
    rating: 4.4,
    reviewCount: 41,
    tags: ["design", "graphic", "logo", "branding"],
    images: ["/images/services/design-1.jpg", "/images/services/design-2.jpg"],
    serviceType: "one-time",
    isPopular: true,
    isFeatured: false,
  },
  {
    id: "serv-007",
    name: "Mobile App Development",
    companyId: "comp-007",
    companyName: "MobileTech Solutions",
    companyLogo: "/images/company/mobile-logo.png",
    category: "İT Xidmətləri",
    subcategory: "Mobile Development",
    description:
      "Custom mobile application development for iOS and Android platforms with modern UI/UX design and robust backend integration.",
    shortDescription: "Custom mobile app development",
    price: 3500,
    currency: "AZN",
    duration: "2 ay",
    features: [
      "iOS & Android development",
      "Custom UI/UX design",
      "Backend integration",
      "App store deployment",
      "Post-launch support",
    ],
    status: "active",
    createdDate: "2024-03-10",
    lastModified: "2024-09-30",
    subscriberCount: 18,
    rating: 4.9,
    reviewCount: 12,
    tags: ["mobile", "app", "iOS", "Android"],
    images: ["/images/services/mobile-1.jpg"],
    serviceType: "one-time",
    isPopular: false,
    isFeatured: true,
  },
  {
    id: "serv-008",
    name: "Content Writing Services",
    companyId: "comp-008",
    companyName: "WordCraft Agency",
    companyLogo: "/images/company/wordcraft-logo.png",
    category: "Marketinq",
    subcategory: "Content Creation",
    description:
      "Professional content writing services including blog posts, website copy, social media content, and SEO-optimized articles.",
    shortDescription: "Professional content writing",
    price: 400,
    currency: "AZN",
    duration: "1 həftə",
    features: [
      "SEO-optimized content",
      "Blog posts",
      "Website copy",
      "Social media content",
      "Proofreading & editing",
    ],
    status: "inactive",
    createdDate: "2024-02-28",
    lastModified: "2024-08-15",
    subscriberCount: 29,
    rating: 4.3,
    reviewCount: 22,
    tags: ["content", "writing", "SEO", "copywriting"],
    images: ["/images/services/content-1.jpg"],
    serviceType: "subscription",
    isPopular: false,
    isFeatured: false,
  },
  {
    id: "serv-009",
    name: "Cybersecurity Audit",
    companyId: "comp-009",
    companyName: "SecureNet Solutions",
    companyLogo: "/images/company/secure-logo.png",
    category: "İT Xidmətləri",
    subcategory: "Cybersecurity",
    description:
      "Comprehensive cybersecurity audit and penetration testing services to identify vulnerabilities and strengthen security posture.",
    shortDescription: "Professional cybersecurity audit",
    price: 2200,
    currency: "AZN",
    duration: "2 həftə",
    features: [
      "Vulnerability assessment",
      "Penetration testing",
      "Security report",
      "Remediation guidance",
      "Compliance check",
    ],
    status: "pending",
    createdDate: "2024-09-01",
    lastModified: "2024-09-29",
    subscriberCount: 0,
    rating: 0,
    reviewCount: 0,
    tags: ["security", "audit", "penetration testing"],
    images: ["/images/services/security-1.jpg"],
    serviceType: "one-time",
    isPopular: false,
    isFeatured: false,
  },
  {
    id: "serv-010",
    name: "E-commerce Development",
    companyId: "comp-010",
    companyName: "E-Shop Pro",
    companyLogo: "/images/company/eshop-logo.png",
    category: "İT Xidmətləri",
    subcategory: "E-commerce",
    description:
      "Complete e-commerce website development with payment integration, inventory management, and analytics dashboard.",
    shortDescription: "Complete e-commerce solution",
    price: 4500,
    currency: "AZN",
    duration: "3 ay",
    features: [
      "Custom e-commerce design",
      "Payment gateway integration",
      "Inventory management",
      "Order tracking system",
      "Analytics dashboard",
    ],
    status: "draft",
    createdDate: "2024-09-15",
    lastModified: "2024-09-29",
    subscriberCount: 0,
    rating: 0,
    reviewCount: 0,
    tags: ["e-commerce", "online store", "payment"],
    images: ["/images/services/ecommerce-1.jpg"],
    serviceType: "one-time",
    isPopular: false,
    isFeatured: false,
  },
];

// Helper functions for filtering and statistics
export const getServicesByStatus = (status: AdminService["status"]) => {
  return allServices.filter((service) => service.status === status);
};

export const getServicesByCategory = (category: string) => {
  return allServices.filter((service) => service.category === category);
};

export const getPopularServices = () => {
  return allServices.filter((service) => service.isPopular);
};

export const getFeaturedServices = () => {
  return allServices.filter((service) => service.isFeatured);
};

export const getServiceStats = () => {
  const totalServices = allServices.length;
  const activeServices = getServicesByStatus("active").length;
  const inactiveServices = getServicesByStatus("inactive").length;
  const pendingServices = getServicesByStatus("pending").length;
  const draftServices = getServicesByStatus("draft").length;
  const totalSubscribers = allServices.reduce(
    (sum, service) => sum + service.subscriberCount,
    0
  );
  const averageRating =
    allServices
      .filter((s) => s.rating > 0)
      .reduce((sum, service) => sum + service.rating, 0) /
    allServices.filter((s) => s.rating > 0).length;

  return {
    totalServices,
    activeServices,
    inactiveServices,
    pendingServices,
    draftServices,
    totalSubscribers,
    averageRating: Math.round(averageRating * 10) / 10,
  };
};

export const searchServices = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return allServices.filter(
    (service) =>
      service.name.toLowerCase().includes(lowercaseQuery) ||
      service.companyName.toLowerCase().includes(lowercaseQuery) ||
      service.category.toLowerCase().includes(lowercaseQuery) ||
      service.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
