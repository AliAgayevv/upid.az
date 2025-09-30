import { useParams, Link } from "react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Activity,
  Users,
  TrendingUp,
  CheckCircle,
  User,
  Calendar,
} from "lucide-react";
import { getServiceById, Process, Client } from "../../data/xidmetlerData";

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<
    "processes" | "clients" | "statistics"
  >("processes");

  const service = getServiceById(Number(id));

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Xidmət tapılmadı
            </h1>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard-a qayıt
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktiv":
      case "completed":
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "İnkişafda":
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Planlanır":
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "cancelled":
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı";
      case "in-progress":
        return "Davam edir";
      case "pending":
        return "Gözləyir";
      case "cancelled":
        return "Ləğv edildi";
      case "active":
        return "Aktiv";
      case "inactive":
        return "Qeyri-aktiv";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard-a qayıt
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {service.title} - Təfərrüatlı Məlumatlar
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Proseslər, müştərilər və ətraflı statistikalar
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                service.status
              )}`}
            >
              {service.status}
            </span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Ümumi gəlir
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₼{service.statistics.totalRevenue}
                </p>
              </div>
              <div className="size-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tamamlanan tapşırıqlar
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {service.statistics.completedTasks}
                </p>
              </div>
              <div className="size-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <CheckCircle className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Aktiv müştərilər
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {service.clients.length}
                </p>
              </div>
              <div className="size-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Users className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Müştəri məmnuniyyəti
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {service.statistics.clientSatisfaction}%
                </p>
              </div>
              <div className="size-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400 text-lg font-bold">
                  ★
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("processes")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "processes"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }`}
              >
                <Activity className="inline w-4 h-4 mr-2" />
                Proseslər ({service.processes.length})
              </button>
              <button
                onClick={() => setActiveTab("clients")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "clients"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }`}
              >
                <Users className="inline w-4 h-4 mr-2" />
                Müştərilər ({service.clients.length})
              </button>
              <button
                onClick={() => setActiveTab("statistics")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "statistics"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }`}
              >
                <TrendingUp className="inline w-4 h-4 mr-2" />
                Statistika
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Processes Tab */}
            {activeTab === "processes" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Bütün Proseslər
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Yeni proses əlavə et
                  </button>
                </div>

                {service.processes.map((process: Process) => (
                  <div
                    key={process.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {process.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {process.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-gray-500">
                            <User className="size-4 mr-1" />
                            {process.assignedTo}
                          </span>
                          <span className="flex items-center text-gray-500">
                            <Calendar className="size-4 mr-1" />
                            {process.startDate}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          process.status
                        )}`}
                      >
                        {getStatusText(process.status)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">
                            Tərəqqi
                          </span>
                          <span className="font-medium">
                            {process.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${process.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Redaktə et
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === "clients" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Müştəri Siyahısı
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Yeni müştəri əlavə et
                  </button>
                </div>

                {service.clients.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Hələ müştəri əlavə edilməyib
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {service.clients.map((client: Client) => (
                      <div
                        key={client.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {client.name}
                              </h4>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  client.status
                                )}`}
                              >
                                {getStatusText(client.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {client.company}
                            </p>
                            <p className="text-sm text-gray-500">
                              {client.email} • Qoşulma: {client.joinDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                              ₼{client.totalPaid}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Ümumi ödəniş
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === "statistics" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Ətraflı Statistika
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      Performans Göstəriciləri
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Tamamlanan tapşırıqlar:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {service.statistics.completedTasks}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Davam edən tapşırıqlar:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {service.statistics.ongoingTasks}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Orta tamamlanma müddəti:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {service.statistics.averageCompletionTime} gün
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      Maliyyə Məlumatları
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Ümumi gəlir:
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ₼{service.statistics.totalRevenue}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Aktiv müştərilər:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {service.clients.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Müştəri məmnuniyyəti:
                        </span>
                        <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                          {service.statistics.clientSatisfaction}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                        Statistika Haqqında
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-400">
                        Bu statistikalar son 12 aylıq dövrü əhatə edir və
                        avtomatik olaraq yenilənir. Performans göstəriciləri
                        müştəri rəyləri və tamamlanan işlərə əsaslanır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
