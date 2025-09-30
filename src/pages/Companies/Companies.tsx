import React from "react";
import { useAuth } from "../../context/AuthContext";
import { companiesData } from "../../data/companiesData";
import { useNavigate } from "react-router-dom";
import ComponentCard from "../../components/common/ComponentCard";
import MetricCard from "../../components/pers/MetricCard";
import Badge from "../../components/ui/badge/Badge";
import {
  Building2,
  Users,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const Companies: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Yalnız adminlər bütün şirkətləri görə bilər
  if (user?.role !== "admin") {
    return (
      <div className="p-6">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Giriş icazəsi yoxdur
          </h2>
          <p className="text-gray-600">
            Bu səhifəyə yalnız adminlər daxil ola bilər.
          </p>
        </div>
      </div>
    );
  }

  const handleCompanyClick = (companyId: number) => {
    navigate(`/companies/${companyId}`);
  };

  const getBadgeColor = (status: string): "success" | "error" | "warning" => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "pending":
        return "warning";
      default:
        return "warning";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktiv";
      case "inactive":
        return "Deaktiv";
      case "pending":
        return "Gözləyir";
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Şirkətlər</h1>
        <p className="text-gray-600">Bütün müştəri şirkətlərini idarə edin</p>
      </div>

      {/* Statistikalar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          cardTitle="Ümumi Şirkətlər"
          number={companiesData.length.toString()}
          icon={<Building2 className="w-6 h-6 text-blue-500" />}
        />

        <MetricCard
          cardTitle="Aktiv Şirkətlər"
          number={companiesData
            .filter((c) => c.status === "active")
            .length.toString()}
          icon={<TrendingUp className="w-6 h-6 text-green-500" />}
        />

        <MetricCard
          cardTitle="Ümumi Gəlir"
          number={`$${companiesData
            .reduce((sum, c) => sum + c.totalRevenue, 0)
            .toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
        />

        <MetricCard
          cardTitle="Aktiv Layihələr"
          number={companiesData
            .reduce((sum, c) => sum + c.activeProjects, 0)
            .toString()}
          icon={<Users className="w-6 h-6 text-purple-500" />}
        />
      </div>

      {/* Şirkətlər siyahısı */}
      <ComponentCard
        title="Bütün Şirkətlər"
        desc="Müştəri şirkətlərini idarə edin"
      >
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {companiesData.map((company) => (
            <div
              key={company.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
              onClick={() => handleCompanyClick(company.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white/90 truncate">
                        {company.name}
                      </h3>
                      <Badge
                        color={getBadgeColor(company.status)}
                        variant="light"
                        size="sm"
                      >
                        {getStatusText(company.status)}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{company.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{company.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{company.industry}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900 dark:text-white/90">
                      {company.activeProjects}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">Layihə</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 dark:text-white/90">
                      ${company.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">Gəlir</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(company.joinDate).toLocaleDateString("az-AZ")}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Qoşulma</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>
    </div>
  );
};

export default Companies;
