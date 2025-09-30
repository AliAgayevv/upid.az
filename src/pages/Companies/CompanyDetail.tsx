import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCompanyById } from "../../data/companiesData";
import ComponentCard from "../../components/common/ComponentCard";
import MetricCard from "../../components/pers/MetricCard";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
} from "lucide-react";

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!id) {
    return <div>Şirkət ID-si tapılmadı</div>;
  }

  const company = getCompanyById(parseInt(id));

  if (!company) {
    return <div>Şirkət tapılmadı</div>;
  }

  // Admin və ya şirkət sahibi daxil ola bilər
  if (user?.role !== "admin" && user?.companyId !== company.id) {
    return (
      <div className="p-6">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
            Giriş icazəsi yoxdur
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Bu məlumatlara giriş icazəniz yoxdur.
          </p>
        </div>
      </div>
    );
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <TrendingUp className="w-4 h-4" />;
      case "paused":
        return <Pause className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
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

  const handleServiceClick = (serviceId: number) => {
    navigate(`/companies/${company.id}/services/${serviceId}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            user?.role === "admin"
              ? navigate("/companies")
              : navigate("/dashboard")
          }
          startIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Geri
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90">
            {company.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Şirkət məlumatları və xidmətlər
          </p>
        </div>
      </div>

      {/* Şirkət məlumatları */}
      <ComponentCard title="Şirkət Məlumatları" className="mb-6">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 mb-4">
                  Əlaqə Məlumatları
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white/90">
                      {company.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white/90">
                      {company.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white/90">
                      {company.address}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 mb-4">
                  Şirkət Məlumatları
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Sahə:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white/90">
                      {company.industry}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Qoşulma tarixi:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white/90">
                      {new Date(company.joinDate).toLocaleDateString("az-AZ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Status:{" "}
                    </span>
                    <Badge
                      color={getBadgeColor(company.status)}
                      variant="light"
                      size="sm"
                    >
                      {getStatusText(company.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentCard>

      {/* Statistikalar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricCard
          cardTitle="Aktiv Layihələr"
          number={company.activeProjects.toString()}
          icon={<Users className="w-6 h-6 text-blue-500" />}
        />

        <MetricCard
          cardTitle="Ümumi Gəlir"
          number={`$${company.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
        />

        <MetricCard
          cardTitle="Xidmətlər"
          number={company.services.length.toString()}
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
        />
      </div>

      {/* Xidmətlər */}
      <ComponentCard title="Xidmətlər" desc="Şirkətin xidmətlərini idarə edin">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {company.services.map((service) => (
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
                      startIcon={getStatusIcon(service.status)}
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
                    <div>
                      <span className="font-medium">Son yeniləmə: </span>
                      <span>{service.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {company.services.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p>Hələ ki xidmət tapılmadı</p>
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
};

export default CompanyDetail;
