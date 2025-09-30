export interface DashboardService {
  id: number;
  title: string;
  type: string;
  status: string;
  progress: number;
  currentMonth: {
    postsCreated?: number;
    adsRunning?: number;
    engagement?: string;
    followers?: string;
    uptime?: string;
    updates?: number;
    backups?: number;
    security?: string;
  };
  recentActivities: Activity[];
  upcomingTasks: Task[];
  processes: Process[];
  clients: Client[];
  statistics: Statistics;
}

export interface Activity {
  date: string;
  time: string;
  action: string;
  details: string;
  status: "completed" | "active" | "pending";
}

export interface Task {
  title: string;
  deadline: string;
  priority: "high" | "medium" | "low";
}

export interface Process {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "cancelled";
  startDate: string;
  endDate?: string;
  assignedTo: string;
  progress: number;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  joinDate: string;
  status: "active" | "inactive" | "pending";
  totalPaid: number;
}

export interface Statistics {
  totalRevenue: number;
  completedTasks: number;
  ongoingTasks: number;
  clientSatisfaction: number;
  averageCompletionTime: number;
}

export const xidmetlerData: DashboardService[] = [
  {
    id: 1,
    title: "SMM Xidməti",
    type: "smm",
    status: "Aktiv",
    progress: 75,
    currentMonth: {
      postsCreated: 24,
      adsRunning: 5,
      engagement: "+18%",
      followers: "+342",
    },
    recentActivities: [
      {
        date: "29 Sentyabr 2025",
        time: "14:30",
        action: "Instagram post yaradıldı",
        details: "Yeni məhsul təqdimatı üçün carousel post hazırlandı",
        status: "completed",
      },
      {
        date: "28 Sentyabr 2025",
        time: "10:15",
        action: "Facebook reklam kampaniyası başladıldı",
        details: "Payız endirim kampaniyası - Budget: 500 AZN",
        status: "active",
      },
      {
        date: "27 Sentyabr 2025",
        time: "16:45",
        action: "Aylıq analitik hesabat hazırlandı",
        details: "Avqust ayı performans göstəriciləri",
        status: "completed",
      },
      {
        date: "26 Sentyabr 2025",
        time: "11:20",
        action: "Story seriyası dərc olundu",
        details: "Müştəri rəyləri ilə 5 story paylaşıldı",
        status: "completed",
      },
    ],
    upcomingTasks: [
      {
        title: "Həftəlik kontent planı",
        deadline: "30 Sentyabr",
        priority: "high",
      },
      {
        title: "Video montaj - Məhsul tanıtımı",
        deadline: "2 Oktyabr",
        priority: "medium",
      },
    ],
    processes: [
      {
        id: 1,
        title: "Facebook reklamlarının qurulması",
        description:
          "Müştəri üçün Facebook və Instagram reklamlarının yaradılması və optimallaşdırılması",
        status: "completed",
        startDate: "2024-09-01",
        endDate: "2024-09-15",
        assignedTo: "Əli Əhmədov",
        progress: 100,
      },
      {
        id: 2,
        title: "Kontent strategiyasının hazırlanması",
        description: "Aylıq kontent planının hazırlanması və təsdiq edilməsi",
        status: "in-progress",
        startDate: "2024-09-20",
        assignedTo: "Leyla Məmmədova",
        progress: 75,
      },
      {
        id: 3,
        title: "Instagram Stories kampaniyası",
        description:
          "Brendin tanıdılması üçün stories kampaniyasının həyata keçirilməsi",
        status: "pending",
        startDate: "2024-10-01",
        assignedTo: "Rəşad Quliyev",
        progress: 0,
      },
    ],
    clients: [
      {
        id: 1,
        name: "Rəsul Məmmədov",
        email: "resul@example.com",
        company: "Tech Solutions LLC",
        joinDate: "2024-01-20",
        status: "active",
        totalPaid: 450,
      },
      {
        id: 2,
        name: "Səbinə Həsənova",
        email: "sebine@business.az",
        company: "Beauty Center",
        joinDate: "2024-03-10",
        status: "active",
        totalPaid: 600,
      },
    ],
    statistics: {
      totalRevenue: 2250,
      completedTasks: 28,
      ongoingTasks: 8,
      clientSatisfaction: 94,
      averageCompletionTime: 12,
    },
  },
  {
    id: 2,
    title: "Site Maintenance",
    type: "maintenance",
    status: "Aktiv",
    progress: 92,
    currentMonth: {
      uptime: "99.9%",
      updates: 12,
      backups: 30,
      security: "Təhlükəsiz",
    },
    recentActivities: [
      {
        date: "29 Sentyabr 2025",
        time: "03:00",
        action: "Avtomatik backup tamamlandı",
        details: "Tam sistem və verilənlər bazası ehtiyat nüsxəsi",
        status: "completed",
      },
      {
        date: "28 Sentyabr 2025",
        time: "09:30",
        action: "SSL sertifikatı yeniləndi",
        details: "Təhlükəsizlik sertifikatı 1 il müddətinə uzadıldı",
        status: "completed",
      },
      {
        date: "27 Sentyabr 2025",
        time: "15:20",
        action: "WordPress core yeniləndi",
        details: "Versiya 6.3.2 → 6.4.1 (təhlükəsizlik yamaqları)",
        status: "completed",
      },
    ],
    upcomingTasks: [
      {
        title: "Server resursları yoxlanışı",
        deadline: "30 Sentyabr",
        priority: "medium",
      },
      {
        title: "Təhlükəsizlik skan",
        deadline: "1 Oktyabr",
        priority: "high",
      },
    ],
    processes: [
      {
        id: 4,
        title: "Təhlükəsizlik yenilənməsi",
        description: "WordPress və plugin yenilənmələrinin aparılması",
        status: "completed",
        startDate: "2024-09-28",
        endDate: "2024-09-29",
        assignedTo: "Tural İbrahimov",
        progress: 100,
      },
      {
        id: 5,
        title: "Performans optimallaşdırılması",
        description: "Sayt sürətinin artırılması və SEO təkmilləşdirilməsi",
        status: "in-progress",
        startDate: "2024-09-25",
        assignedTo: "Kamran Əliyev",
        progress: 60,
      },
    ],
    clients: [
      {
        id: 3,
        name: "Arzu Abdullayeva",
        email: "arzu@clinic.az",
        company: "Medical Center Plus",
        joinDate: "2024-02-20",
        status: "active",
        totalPaid: 800,
      },
    ],
    statistics: {
      totalRevenue: 1600,
      completedTasks: 15,
      ongoingTasks: 3,
      clientSatisfaction: 98,
      averageCompletionTime: 8,
    },
  },
];

export const getServiceById = (id: number): DashboardService | undefined => {
  return xidmetlerData.find((service) => service.id === id);
};
