import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCompanyById } from "../../data/companiesData";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import MetricCard from "../../components/pers/MetricCard";
import {
  ChevronLeftIcon,
  TimeIcon,
  CheckCircleIcon,
  ErrorIcon,
  UserIcon,
  DollarLineIcon,
  GroupIcon,
  CalenderIcon,
} from "../../icons";
import { TrendingUpIcon } from "lucide-react";

const ServiceDetail: React.FC = () => {
  const { companyId, serviceId } = useParams<{
    companyId: string;
    serviceId: string;
  }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!companyId || !serviceId) {
    return <div>Məlumatlar tapılmadı</div>;
  }

  const company = getCompanyById(parseInt(companyId));
  const service = company?.services.find((s) => s.id === parseInt(serviceId));

  if (!company || !service) {
    return <div>Xidmət tapılmadı</div>;
  }

  // Admin və ya şirkət sahibi daxil ola bilər
  if (user?.role !== "admin" && user?.companyId !== company.id) {
    return (
      <div className="p-6">
        <div className="text-center">
          <ErrorIcon className="w-12 h-12 text-error-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Giriş icazəsi yoxdur
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Bu məlumatlara giriş icazəniz yoxdur.
          </p>
        </div>
      </div>
    );
  }

  const getProcessStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProcessStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "in-progress":
        return <TimeIcon className="w-4 h-4" />;
      case "pending":
        return <CalenderIcon className="w-4 h-4" />;
      case "blocked":
        return <ErrorIcon className="w-4 h-4" />;
      default:
        return <TimeIcon className="w-4 h-4" />;
    }
  };

  const getProcessStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı";
      case "in-progress":
        return "Davam edir";
      case "pending":
        return "Gözləyir";
      case "blocked":
        return "Bloklanıb";
      default:
        return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Yüksək";
      case "medium":
        return "Orta";
      case "low":
        return "Aşağı";
      default:
        return priority;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/companies/${company.id}`)}
          startIcon={<ChevronLeftIcon className="w-4 h-4" />}
        >
          Geri
        </Button>
        <div>
          <h1 className="text-title-lg font-bold text-gray-900 dark:text-white">
            {service.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {company.name} - {service.serviceType}
          </p>
        </div>
      </div>

      {/* Xidmət məlumatları */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Xidmət Məlumatları
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Təsvir:{" "}
                </span>
                <p className="text-gray-900 dark:text-white mt-1">
                  {service.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Başlama tarixi:{" "}
                  </span>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(service.startDate).toLocaleDateString("az-AZ")}
                  </p>
                </div>
                {service.endDate && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Bitiş tarixi:{" "}
                    </span>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(service.endDate).toLocaleDateString("az-AZ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Proseslər */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Proseslər
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {service.processes.map((process) => (
                <div key={process.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${getProcessStatusColor(
                          process.status
                        )}`}
                      >
                        {getProcessStatusIcon(process.status)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {process.title}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <Badge
                            color={
                              process.priority === "high"
                                ? "error"
                                : process.priority === "medium"
                                ? "warning"
                                : "success"
                            }
                            size="sm"
                          >
                            {getPriorityText(process.priority)}
                          </Badge>
                          <Badge
                            color={
                              process.status === "completed"
                                ? "success"
                                : process.status === "in-progress"
                                ? "primary"
                                : process.status === "blocked"
                                ? "error"
                                : "warning"
                            }
                          >
                            {getProcessStatusText(process.status)}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {process.description}
                      </p>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <UserIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            {process.assignedTo}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalenderIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {new Date(process.startDate).toLocaleDateString(
                              "az-AZ"
                            )}
                            {process.endDate &&
                              ` - ${new Date(
                                process.endDate
                              ).toLocaleDateString("az-AZ")}`}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Tərəqqi
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {process.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-brand-500 h-2 rounded-full"
                            style={{ width: `${process.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {service.processes.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <TimeIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Hələ ki proses tapılmadı</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistikalar */}
          <div className="grid grid-cols-1 gap-4">
            <MetricCard
              cardTitle="Tərəqqi"
              number={`${service.progress}%`}
              icon={<TrendingUpIcon className="w-6 h-6 text-brand-500" />}
            />
            <MetricCard
              cardTitle="Aylıq qiymət"
              number={`$${service.monthlyPrice}`}
              icon={<DollarLineIcon className="w-6 h-6 text-success-500" />}
            />
            <MetricCard
              cardTitle="Son yeniləmə"
              number={service.lastUpdate}
              icon={<TimeIcon className="w-6 h-6 text-warning-500" />}
            />
          </div>

          {/* Komanda */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Komanda
            </h3>
            <div className="space-y-3">
              {service.assignedTeam.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-100 dark:bg-brand-500/20 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}

              {service.assignedTeam.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  <GroupIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Komanda təyin edilməyib</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ümumi Tərəqqi
            </h3>
            <div className="relative">
              <div className="w-32 h-32 mx-auto">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--color-brand-500)"
                    strokeWidth="3"
                    strokeDasharray={`${service.progress}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {service.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
