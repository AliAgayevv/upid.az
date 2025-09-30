import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserCompany } from "../../data/companiesData";
import MetricCard from "../../components/pers/MetricCard";
import ComponentCard from "../../components/common/ComponentCard";
import Badge from "../../components/ui/badge/Badge";
import {
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Building2,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Giriş edilməyib</div>;
  }

  // Admin dashboard
  if (user.role === "admin") {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bütün şirkətləri və xidmətləri idarə edin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/companies")}
          >
            <MetricCard
              cardTitle="Şirkətlər"
              number="Tamamını görün"
              icon={<Building2 className="w-6 h-6 text-blue-500" />}
            />
          </div>

          <MetricCard
            cardTitle="Aktiv Layihələr"
            number="15"
            icon={<TrendingUp className="w-6 h-6 text-green-500" />}
          />

          <MetricCard
            cardTitle="Aylıq Gəlir"
            number="$12,450"
            icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
          />

          <MetricCard
            cardTitle="Müştərilər"
            number="8"
            icon={<Users className="w-6 h-6 text-purple-500" />}
          />
        </div>

        <ComponentCard
          title="Son Fəaliyyətlər"
          desc="Sistəmdəki son dəyişikliklər"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-white/[0.02] rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white/90">
                  TechCorp - SMM xidməti tamamlandı
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2 saat əvvəl
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-white/[0.02] rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white/90">
                  Beauty World - Yeni layihə başladı
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1 gün əvvəl
                </p>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    );
  }

  // Client dashboard
  const userCompany = getUserCompany(user.id);

  if (!userCompany) {
    return (
      <div className="p-6">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Şirkət tapılmadı
          </h2>
          <p className="text-gray-600">Hesabınız hələ şirkətə bağlanmayıb.</p>
        </div>
      </div>
    );
  }

  const handleServiceClick = (serviceId: number) => {
    navigate(`/companies/${userCompany.id}/services/${serviceId}`);
  };

  const getBadgeColor = (status: string): "success" | "error" | "warning" => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "warning";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktiv";
      case "paused":
        return "Dayandırılıb";
      case "completed":
        return "Tamamlandı";
      case "cancelled":
        return "Ləğv edildi";
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Xoş gəlmisiniz, {userCompany.name}
        </h1>
        <p className="text-gray-600">
          Xidmətlərinizi və layihələrinizi idarə edin
        </p>
      </div>

      {/* Şirkət statistikaları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          cardTitle="Aktiv Xidmətlər"
          number={userCompany.services
            .filter((s) => s.status === "active")
            .length.toString()}
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
        />

        <MetricCard
          cardTitle="Aylıq Xərc"
          number={`$${userCompany.services
            .filter((s) => s.status === "active")
            .reduce((sum, s) => sum + s.monthlyPrice, 0)
            .toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
        />

        <MetricCard
          cardTitle="Ümumi Layihələr"
          number={userCompany.activeProjects.toString()}
          icon={<Users className="w-6 h-6 text-purple-500" />}
        />
      </div>

      {/* Xidmətlər */}
      <ComponentCard
        title="Sizin Xidmətləriniz"
        desc="Aktiv və planlaşdırılan xidmətlər"
      >
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {userCompany.services.map((service) => (
            <div
              key={service.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white/90">
                      {service.title}
                    </h3>
                    <Badge
                      color={getBadgeColor(service.status)}
                      variant="light"
                      size="sm"
                    >
                      {getStatusText(service.status)}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {service.description}
                  </p>

                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Tip: </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {service.serviceType}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Qiymət: </span>
                      <span className="text-green-600 dark:text-green-400">
                        ${service.monthlyPrice}/ay
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Tərəqqi: </span>
                      <span className="text-purple-600 dark:text-purple-400">
                        {service.progress}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.lastUpdate}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${service.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {userCompany.services.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p>Hələ ki xidmət tapılmadı</p>
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
}
