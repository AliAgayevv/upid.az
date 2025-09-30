import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import {
  allServices,
  getServicesByStatus,
  getServiceStats,
  searchServices,
  AdminService,
} from "../../data/allServicesData";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import MetricCard from "../../components/pers/MetricCard";
import {
  TrendingUp,
  Users,
  Star,
  Settings,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
} from "lucide-react";

const AllServices: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "inactive" | "pending" | "draft"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const stats = getServiceStats();

  const getStatusColor = (
    status: AdminService["status"]
  ):
    | "primary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "light"
    | "dark" => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "pending":
        return "warning";
      case "draft":
        return "light";
      default:
        return "light";
    }
  };

  const getStatusText = (status: AdminService["status"]): string => {
    switch (status) {
      case "active":
        return "Aktiv";
      case "inactive":
        return "Qeyri-aktiv";
      case "pending":
        return "Gözləyir";
      case "draft":
        return "Qaralama";
      default:
        return status;
    }
  };

  const filteredServices = React.useMemo(() => {
    let services =
      activeTab === "all" ? allServices : getServicesByStatus(activeTab);

    if (searchTerm) {
      services = searchServices(searchTerm);
      if (activeTab !== "all") {
        services = services.filter((service) => service.status === activeTab);
      }
    }

    if (selectedCategory !== "all") {
      services = services.filter(
        (service) => service.category === selectedCategory
      );
    }

    return services;
  }, [activeTab, searchTerm, selectedCategory]);

  const categories = React.useMemo(() => {
    const cats = Array.from(
      new Set(allServices.map((service) => service.category))
    );
    return ["all", ...cats];
  }, []);

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bütün Xidmətlər
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Sistemdəki bütün xidmətləri idarə edin
          </p>
        </div>
        <Link to="/services/add">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Xidmət Əlavə Et
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          cardTitle="Toplam Xidmətlər"
          number={stats.totalServices.toString()}
          icon={<Settings className="w-6 h-6" />}
          percentage="12%"
        />
        <MetricCard
          cardTitle="Aktiv Xidmətlər"
          number={stats.activeServices.toString()}
          icon={<TrendingUp className="w-6 h-6" />}
          percentage="8%"
        />
        <MetricCard
          cardTitle="Toplam Abunəçi"
          number={stats.totalSubscribers.toString()}
          icon={<Users className="w-6 h-6" />}
          percentage="23%"
        />
        <MetricCard
          cardTitle="Ortalama Reytinq"
          number={stats.averageRating.toString()}
          icon={<Star className="w-6 h-6" />}
          percentage="0.2"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Xidmət adı, şirkət və ya kateqoriya axtarın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Bütün Kateqoriyalar</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: "all", label: "Hamısı", count: allServices.length },
              { key: "active", label: "Aktiv", count: stats.activeServices },
              {
                key: "inactive",
                label: "Qeyri-aktiv",
                count: stats.inactiveServices,
              },
              {
                key: "pending",
                label: "Gözləyir",
                count: stats.pendingServices,
              },
              { key: "draft", label: "Qaralama", count: stats.draftServices },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Services List */}
        <div className="p-6">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Xidmət tapılmadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Axtarış meyarlarınızı dəyişdirərək yenidən cəhd edin.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Company Logo */}
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Settings className="w-8 h-8 text-gray-400" />
                      </div>

                      {/* Service Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {service.name}
                          </h3>
                          <Badge color={getStatusColor(service.status)}>
                            {getStatusText(service.status)}
                          </Badge>
                          {service.isPopular && (
                            <Badge color="warning">Populyar</Badge>
                          )}
                          {service.isFeatured && (
                            <Badge color="info">Təqdim edilir</Badge>
                          )}
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p>
                            <span className="font-medium">Şirkət:</span>{" "}
                            {service.companyName}
                          </p>
                          <p>
                            <span className="font-medium">Kateqoriya:</span>{" "}
                            {service.category}
                          </p>
                          <p>
                            <span className="font-medium">Qiymət:</span>{" "}
                            {service.price} {service.currency}
                          </p>
                          <p>
                            <span className="font-medium">Abunəçi sayı:</span>{" "}
                            {service.subscriberCount}
                          </p>
                          {service.rating > 0 && (
                            <p className="flex items-center gap-1">
                              <span className="font-medium">Reytinq:</span>
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              {service.rating} ({service.reviewCount} rəy)
                            </p>
                          )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          {service.shortDescription}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                          {service.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {service.tags.length > 3 && (
                            <span className="text-gray-500 text-xs">
                              +{service.tags.length - 3} daha
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllServices;
