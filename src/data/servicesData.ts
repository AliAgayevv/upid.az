export const services = [
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
      {
        date: "26 Sentyabr 2025",
        time: "11:45",
        action: "Plugin yenilənməsi",
        details: "8 plugin yeniləndi, 2 yeni plugin quraşdırıldı",
        status: "completed",
      },
      {
        date: "25 Sentyabr 2025",
        time: "14:10",
        action: "Performans optimizasiyası",
        details: "Şəkil sıxışdırma və cache təmizlənməsi",
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
  },
];
