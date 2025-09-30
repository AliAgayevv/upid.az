import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import {
  mySubscriptions,
  getActiveSubscriptions,
  getPendingSubscriptions,
  getExpiredSubscriptions,
  getTotalActiveSpending,
  getUpcomingRenewals,
  UserSubscription,
} from "../../data/myServicesData";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import MetricCard from "../../components/pers/MetricCard";

import { TrendingUp, DollarSign, Calendar, Users } from "lucide-react";
const MyServices: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "pending" | "expired"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Redirect if not client
  if (!user || user.role !== "client") {
    return <Navigate to="/" replace />;
  }

  const getStatusColor = (
    status: UserSubscription["status"]
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
      case "pending":
        return "warning";
      case "expired":
        return "error";
      case "inactive":
        return "light";
      default:
        return "light";
    }
  };

  const getStatusText = (status: UserSubscription["status"]) => {
    switch (status) {
      case "active":
        return "Aktiv";
      case "pending":
        return "Gözləyir";
      case "expired":
        return "Vaxtı keçib";
      case "inactive":
        return "Deaktiv";
      default:
        return "Naməlum";
    }
  };

  const getFilteredSubscriptions = () => {
    let filtered = mySubscriptions;

    // Filter by tab
    switch (activeTab) {
      case "active":
        filtered = getActiveSubscriptions();
        break;
      case "pending":
        filtered = getPendingSubscriptions();
        break;
      case "expired":
        filtered = getExpiredSubscriptions();
        break;
      default:
        filtered = mySubscriptions;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (sub) =>
          sub.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredSubscriptions = getFilteredSubscriptions();
  const activeSubscriptions = getActiveSubscriptions();
  const upcomingRenewals = getUpcomingRenewals();
  const totalSpending = getTotalActiveSpending();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Abonə Olduğum Xidmətlər
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bütün abonəliklərimi idarə edin və vəziyyətini izləyin
          </p>
        </div>
        <a href="/marketplace">
          <Button size="sm">Yeni Xidmət Tap</Button>
        </a>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          cardTitle="Aktiv Abonəliklər"
          number={activeSubscriptions.length.toString()}
          percentage="12%"
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
        />
        <MetricCard
          cardTitle="Aylıq Xərc"
          number={`${Math.round(totalSpending / 12).toLocaleString()} AZN`}
          percentage="5%"
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
        />
        <MetricCard
          cardTitle="Yeniləmələr"
          number={upcomingRenewals.length.toString()}
          percentage="30 gün"
          icon={<Calendar className="w-6 h-6 text-yellow-500" />}
        />
        <MetricCard
          cardTitle="Ümumi Abonəliklər"
          number={mySubscriptions.length.toString()}
          percentage="3+"
          icon={<Users className="w-6 h-6 text-purple-500" />}
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Xidmət və ya şirkət adı ilə axtarın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Tab Filters */}
          <div className="flex space-x-2">
            {[
              { key: "all", label: "Hamısı", count: mySubscriptions.length },
              {
                key: "active",
                label: "Aktiv",
                count: getActiveSubscriptions().length,
              },
              {
                key: "pending",
                label: "Gözləyir",
                count: getPendingSubscriptions().length,
              },
              {
                key: "expired",
                label: "Vaxtı keçib",
                count: getExpiredSubscriptions().length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(
                    tab.key as "all" | "active" | "pending" | "expired"
                  )
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-brand-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredSubscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Service Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold text-brand-500">
                        {subscription.serviceName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {subscription.serviceName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {subscription.companyName} • {subscription.category}
                      </p>
                    </div>
                  </div>
                  <Badge color={getStatusColor(subscription.status)} size="sm">
                    {getStatusText(subscription.status)}
                  </Badge>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {subscription.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {subscription.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                  {subscription.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                      +{subscription.features.length - 3} daha çox
                    </span>
                  )}
                </div>

                {/* Dates */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Başlama: {formatDate(subscription.startDate)}</span>
                  <span>Bitmə: {formatDate(subscription.endDate)}</span>
                  {subscription.nextBillingDate &&
                    subscription.status === "active" && (
                      <span className="text-brand-500 font-medium">
                        Növbəti ödəniş:{" "}
                        {formatDate(subscription.nextBillingDate)}
                      </span>
                    )}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col items-end space-y-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(subscription.price, subscription.currency)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    / il
                  </div>
                </div>

                <div className="flex space-x-2">
                  {subscription.status === "active" && (
                    <>
                      <Button size="sm" variant="outline">
                        Detallar
                      </Button>
                      <Button size="sm" variant="outline">
                        Ləğv et
                      </Button>
                    </>
                  )}
                  {subscription.status === "expired" && (
                    <Button size="sm">Yenilə</Button>
                  )}
                  {subscription.status === "pending" && (
                    <Button size="sm" variant="outline">
                      İzlə
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Auto Renewal Info */}
            {subscription.status === "active" && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Avtomatik yeniləmə:{" "}
                    {subscription.autoRenewal ? "Aktiv" : "Deaktiv"}
                  </span>
                  <button className="text-sm text-brand-500 hover:text-brand-600 font-medium">
                    Dəyişdir
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Abonəlik tapılmadı
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || activeTab !== "all"
              ? "Axtarış meyarlarınızı dəyişdirərək yenidən cəhd edin."
              : "Hələ heç bir xidmətə abonə olmamısınız."}
          </p>
          {!searchTerm && activeTab === "all" && (
            <a href="/marketplace">
              <Button>Xidmətləri Kəşf Et</Button>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default MyServices;
