import { useState } from "react";
import { CheckCircle, Clock, Activity } from "lucide-react";

export default function ServiceDashboard() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
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

  const getStatusColor = (status: "completed" | "active" | "pending") => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Xidmətlər Monitorinqi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bizim komandamızın sizin üçün gördüyü işlərin canlı izləməsi
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
                    {service.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Bu ay tamamlanan
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {service.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${service.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {service.type === "smm" ? (
                    <>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {service.currentMonth.postsCreated}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Post yaradıldı
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {service.currentMonth.adsRunning}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Aktiv reklam
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {service.currentMonth.engagement}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Engagement artımı
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {service.currentMonth.followers}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Yeni izləyici
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {service.currentMonth.uptime}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Uptime
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {service.currentMonth.updates}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Yeniləmə
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {service.currentMonth.backups}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Backup
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          {service.currentMonth.security}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Təhlükəsizlik
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() =>
                    setSelectedService(
                      selectedService === service.id ? null : service.id
                    )
                  }
                  className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  {selectedService === service.id ? "Bağla" : "Detallara bax"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Activity Timeline */}
        {selectedService && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Son Fəaliyyətlər -{" "}
              {services.find((s) => s.id === selectedService)?.title}
            </h2>

            <div className="space-y-4">
              {services
                .find((s) => s.id === selectedService)
                ?.recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="flex-shrink-0 w-16 text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.time}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.date}
                      </div>
                    </div>

                    <div className="flex-shrink-0 pt-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activity.status === "completed"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {activity.action}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.details}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                            activity.status as
                              | "completed"
                              | "active"
                              | "pending"
                          )}`}
                        >
                          {activity.status === "completed"
                            ? "Tamamlandı"
                            : "Davam edir"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Upcoming Tasks */}
        {selectedService && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Gələcək Tapşırıqlar
            </h2>

            <div className="space-y-3">
              {services
                .find((s) => s.id === selectedService)
                ?.upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Son tarix: {task.deadline}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold ${getPriorityColor(
                        task.priority as "high" | "medium" | "low"
                      )}`}
                    >
                      {task.priority === "high"
                        ? "Yüksək"
                        : task.priority === "medium"
                        ? "Orta"
                        : "Aşağı"}{" "}
                      prioritet
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
