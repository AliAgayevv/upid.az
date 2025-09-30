export interface UserSubscription {
  id: string;
  serviceId: string;
  serviceName: string;
  companyName: string;
  companyLogo: string;
  category: string;
  status: "active" | "inactive" | "pending" | "expired";
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  features: string[];
  description: string;
  nextBillingDate?: string;
  autoRenewal: boolean;
}

// Mock data for user subscriptions
export const mySubscriptions: UserSubscription[] = [
  {
    id: "sub-001",
    serviceId: "serv-001",
    serviceName: "Professional Web Development",
    companyName: "TechCorp Solutions",
    companyLogo: "/images/company/techcorp-logo.png",
    category: "İT Xidmətləri",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    price: 2500,
    currency: "AZN",
    features: [
      "Responsive web design",
      "SEO optimization",
      "24/7 technical support",
      "Monthly maintenance",
      "SSL certificate included",
    ],
    description:
      "Professional web development service with modern technologies and full support.",
    nextBillingDate: "2024-11-15",
    autoRenewal: true,
  },
  {
    id: "sub-002",
    serviceId: "serv-002",
    serviceName: "Advanced Cloud Solutions",
    companyName: "CloudTech Pro",
    companyLogo: "/images/company/cloudtech-logo.png",
    category: "Bulud Xidmətləri",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2025-03-01",
    price: 1800,
    currency: "AZN",
    features: [
      "99.9% uptime guarantee",
      "Auto-scaling",
      "24/7 monitoring",
      "Data backup",
      "Load balancing",
    ],
    description:
      "Enterprise-grade cloud infrastructure with high availability and performance.",
    nextBillingDate: "2024-11-01",
    autoRenewal: true,
  },
  {
    id: "sub-003",
    serviceId: "serv-003",
    serviceName: "Digital Marketing Campaign",
    companyName: "MarketBoost Agency",
    companyLogo: "/images/company/marketboost-logo.png",
    category: "Reklam",
    status: "pending",
    startDate: "2024-10-01",
    endDate: "2025-04-01",
    price: 1200,
    currency: "AZN",
    features: [
      "Social media management",
      "Google Ads campaign",
      "SEO optimization",
      "Analytics reports",
      "Content creation",
    ],
    description:
      "Comprehensive digital marketing solution to grow your business online.",
    nextBillingDate: "2024-11-01",
    autoRenewal: false,
  },
  {
    id: "sub-004",
    serviceId: "serv-004",
    serviceName: "Legal Consultation Package",
    companyName: "LawFirm Associates",
    companyLogo: "/images/company/lawfirm-logo.png",
    category: "Hüquq",
    status: "expired",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    price: 800,
    currency: "AZN",
    features: [
      "Monthly consultations",
      "Contract review",
      "Legal documentation",
      "Court representation",
      "Emergency support",
    ],
    description: "Professional legal services for business and personal needs.",
    autoRenewal: false,
  },
  {
    id: "sub-005",
    serviceId: "serv-005",
    serviceName: "Financial Advisory Service",
    companyName: "FinanceExpert LLC",
    companyLogo: "/images/company/financeexpert-logo.png",
    category: "Maliyyə",
    status: "active",
    startDate: "2024-02-15",
    endDate: "2025-02-15",
    price: 1500,
    currency: "AZN",
    features: [
      "Investment planning",
      "Tax optimization",
      "Risk assessment",
      "Monthly reports",
      "Personal advisor",
    ],
    description:
      "Expert financial guidance for investment and business growth.",
    nextBillingDate: "2024-11-15",
    autoRenewal: true,
  },
];

// Utility functions
export const getActiveSubscriptions = (): UserSubscription[] => {
  return mySubscriptions.filter((sub) => sub.status === "active");
};

export const getPendingSubscriptions = (): UserSubscription[] => {
  return mySubscriptions.filter((sub) => sub.status === "pending");
};

export const getExpiredSubscriptions = (): UserSubscription[] => {
  return mySubscriptions.filter((sub) => sub.status === "expired");
};

export const getSubscriptionsByCategory = (
  category: string
): UserSubscription[] => {
  return mySubscriptions.filter((sub) => sub.category === category);
};

export const getSubscriptionById = (
  id: string
): UserSubscription | undefined => {
  return mySubscriptions.find((sub) => sub.id === id);
};

export const getTotalActiveSpending = (): number => {
  return getActiveSubscriptions().reduce((total, sub) => total + sub.price, 0);
};

export const getUpcomingRenewals = (days: number = 30): UserSubscription[] => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return getActiveSubscriptions().filter((sub) => {
    if (!sub.nextBillingDate) return false;
    const billingDate = new Date(sub.nextBillingDate);
    return billingDate >= now && billingDate <= futureDate;
  });
};
