export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  industry: string;
  joinDate: string;
  status: "active" | "inactive" | "pending";
  services: CompanyService[];
  totalRevenue: number;
  activeProjects: number;
}

export interface CompanyService {
  id: number;
  serviceType: "SMM" | "Site Maintenance" | "RBAC Client" | "RBAC Admin";
  title: string;
  description: string;
  status: "active" | "paused" | "completed" | "cancelled";
  startDate: string;
  endDate?: string;
  monthlyPrice: number;
  processes: ServiceProcess[];
  assignedTeam: TeamMember[];
  progress: number;
  lastUpdate: string;
}

export interface ServiceProcess {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "blocked";
  assignedTo: string;
  startDate: string;
  endDate?: string;
  progress: number;
  priority: "high" | "medium" | "low";
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "client";
  companyId?: number; // Client üçün şirkət ID-si
}

// Mock şirkətlər
export const companiesData: Company[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    email: "info@techcorp.az",
    phone: "+994 12 555 0001",
    address: "Bakı, 28 May küç. 15",
    industry: "Technology",
    joinDate: "2024-01-15",
    status: "active",
    totalRevenue: 15500,
    activeProjects: 3,
    services: [
      {
        id: 1,
        serviceType: "SMM",
        title: "Sosial Media İdarəetməsi",
        description:
          "Facebook, Instagram və LinkedIn hesablarının idarə edilməsi",
        status: "active",
        startDate: "2024-01-20",
        monthlyPrice: 800,
        progress: 85,
        lastUpdate: "2 gün əvvəl",
        processes: [
          {
            id: 1,
            title: "Instagram kontent planı",
            description: "Oktyabr ayı üçün kontent strategiyası",
            status: "in-progress",
            assignedTo: "Leyla Məmmədova",
            startDate: "2024-09-25",
            progress: 70,
            priority: "high",
          },
          {
            id: 2,
            title: "Facebook reklam kampaniyası",
            description: "Payız məhsulları üçün məqsədli reklam",
            status: "completed",
            assignedTo: "Əli Əhmədov",
            startDate: "2024-09-20",
            endDate: "2024-09-28",
            progress: 100,
            priority: "medium",
          },
        ],
        assignedTeam: [
          { id: 1, name: "Leyla Məmmədova", role: "SMM Specialist" },
          { id: 2, name: "Əli Əhmədov", role: "Content Creator" },
        ],
      },
      {
        id: 2,
        serviceType: "Site Maintenance",
        title: "Veb Sayt Texniki Dəstəyi",
        description: "E-ticarət saytının texniki dəstəyi və təhlükəsizliyi",
        status: "active",
        startDate: "2024-02-01",
        monthlyPrice: 1200,
        progress: 95,
        lastUpdate: "1 gün əvvəl",
        processes: [
          {
            id: 3,
            title: "Təhlükəsizlik yeniləmələri",
            description: "WordPress və plugin yeniləmələri",
            status: "completed",
            assignedTo: "Tural İbrahimov",
            startDate: "2024-09-28",
            endDate: "2024-09-29",
            progress: 100,
            priority: "high",
          },
        ],
        assignedTeam: [
          { id: 3, name: "Tural İbrahimov", role: "DevOps Engineer" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Beauty World",
    email: "contact@beautyworld.az",
    phone: "+994 12 555 0002",
    address: "Bakı, Nəsimi rayonu, Azadlıq prospekti 25",
    industry: "Beauty & Wellness",
    joinDate: "2024-03-10",
    status: "active",
    totalRevenue: 4500,
    activeProjects: 2,
    services: [
      {
        id: 3,
        serviceType: "SMM",
        title: "Gözəllik Mərkəzi SMM",
        description: "Instagram və TikTok üçün gözəllik məzmunu",
        status: "active",
        startDate: "2024-03-15",
        monthlyPrice: 600,
        progress: 75,
        lastUpdate: "3 gün əvvəl",
        processes: [
          {
            id: 4,
            title: "Video kontent yaradılması",
            description: "Müştəri testimonialları və tutorial videolar",
            status: "in-progress",
            assignedTo: "Səbinə Həsənova",
            startDate: "2024-09-20",
            progress: 60,
            priority: "medium",
          },
        ],
        assignedTeam: [
          { id: 4, name: "Səbinə Həsənova", role: "Social Media Manager" },
        ],
      },
      {
        id: 4,
        serviceType: "RBAC Client",
        title: "Müştəri Rezervasyon Sistemi",
        description: "Online randevu və müştəri idarəetmə sistemi",
        status: "active",
        startDate: "2024-06-01",
        monthlyPrice: 900,
        progress: 40,
        lastUpdate: "1 həftə əvvəl",
        processes: [
          {
            id: 5,
            title: "UI/UX Dizayn",
            description: "Müştəri panelinin vizual dizaynı",
            status: "in-progress",
            assignedTo: "Günel Məhərrəmova",
            startDate: "2024-08-15",
            progress: 80,
            priority: "high",
          },
          {
            id: 6,
            title: "Backend Development",
            description: "API və verilənlər bazası strukturu",
            status: "pending",
            assignedTo: "Orxan Hacıyev",
            startDate: "2024-10-01",
            progress: 0,
            priority: "high",
          },
        ],
        assignedTeam: [
          { id: 5, name: "Günel Məhərrəmova", role: "UI/UX Designer" },
          { id: 6, name: "Orxan Hacıyev", role: "Backend Developer" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Express Logistics",
    email: "info@express-logistics.az",
    phone: "+994 12 555 0003",
    address: "Bakı, Səbail rayonu, Nizami küç. 45",
    industry: "Logistics",
    joinDate: "2024-07-20",
    status: "pending",
    totalRevenue: 0,
    activeProjects: 1,
    services: [
      {
        id: 5,
        serviceType: "RBAC Admin",
        title: "Logistika İdarəetmə Sistemi",
        description: "Yük və çatdırılma idarəetmə platforması",
        status: "paused",
        startDate: "2024-08-01",
        monthlyPrice: 1500,
        progress: 15,
        lastUpdate: "2 həftə əvvəl",
        processes: [
          {
            id: 7,
            title: "Layihə planlaması",
            description: "Sistem arxitekturasının planlaşdırılması",
            status: "completed",
            assignedTo: "Ramin Nəbiyev",
            startDate: "2024-08-01",
            endDate: "2024-08-15",
            progress: 100,
            priority: "high",
          },
          {
            id: 8,
            title: "Database dizaynı",
            description: "Məlumat bazasının strukturunun yaradılması",
            status: "blocked",
            assignedTo: "Könül Əhmədova",
            startDate: "2024-08-20",
            progress: 20,
            priority: "high",
          },
        ],
        assignedTeam: [
          { id: 7, name: "Ramin Nəbiyev", role: "Solution Architect" },
          { id: 8, name: "Könül Əhmədova", role: "Database Engineer" },
        ],
      },
    ],
  },
];

// Mock istifadəçilər (şirkət əsaslı)
export const mockUsers = [
  {
    id: 1,
    name: "UPID Admin",
    email: "admin@upid.az",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: 2,
    name: "TechCorp Manager",
    email: "manager@techcorp.az",
    password: "client123",
    role: "client" as const,
    companyId: 1,
  },
  {
    id: 3,
    name: "Beauty World Owner",
    email: "owner@beautyworld.az",
    password: "client123",
    role: "client" as const,
    companyId: 2,
  },
  {
    id: 4,
    name: "Express CEO",
    email: "ceo@express-logistics.az",
    password: "client123",
    role: "client" as const,
    companyId: 3,
  },
];

export const getCompanyById = (id: number): Company | undefined => {
  return companiesData.find((company) => company.id === id);
};

export const getCompanyServices = (companyId: number): CompanyService[] => {
  const company = getCompanyById(companyId);
  return company?.services || [];
};

export const getUserCompany = (userId: number): Company | undefined => {
  const user = mockUsers.find((u) => u.id === userId);
  if (user?.companyId) {
    return getCompanyById(user.companyId);
  }
  return undefined;
};
