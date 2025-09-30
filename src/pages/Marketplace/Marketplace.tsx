import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  serviceCategories,
  getServicesByCategory,
  MarketplaceService,
} from "../../data/marketplaceData";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import {
  DollarLineIcon,
  TimeIcon,
  CheckCircleIcon,
  PlusIcon,
  InfoIcon,
} from "../../icons";
import { PackagePlusIcon } from "lucide-react";

const Marketplace: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("Hamısı");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Client olmayan istifadəçiləri əngəllə
  if (user?.role !== "client") {
    return (
      <div className="p-6">
        <div className="text-center">
          <InfoIcon className="w-12 h-12 text-error-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Giriş icazəsi yoxdur
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Bu səhifə yalnız client istifadəçiləri üçün əlçatandır.
          </p>
        </div>
      </div>
    );
  }

  const filteredServices = getServicesByCategory(selectedCategory).filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const formatPrice = (service: MarketplaceService) => {
    if (service.price.custom) {
      return "Qiymət sorğusu";
    }
    if (service.price.monthly) {
      return `$${service.price.monthly}/ay`;
    }
    if (service.price.oneTime) {
      return `$${service.price.oneTime}`;
    }
    return "Qiymət müəyyən edilməyib";
  };

  const handleContactForService = (serviceId: number) => {
    // Burada əlaqə modalı və ya səhifəsi açıla bilər
    alert(`Xidmət ID ${serviceId} üçün əlaqə sorğusu göndərildi!`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-title-lg font-bold text-gray-900 dark:text-white mb-2">
          Xidmətlər Marketplace
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Biznesinizi inkişaf etdirmək üçün professional xidmətləri kəşf edin
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Xidmətləri axtarın..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {serviceCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Service Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <div className="flex space-x-1">
                  {service.popular && (
                    <Badge color="primary" size="sm">
                      Populyar
                    </Badge>
                  )}
                  {service.new && (
                    <Badge color="success" size="sm">
                      Yeni
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {service.description}
              </p>

              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{service.rating}</span>
                  <span>({service.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TimeIcon className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Daxil olan xidmətlər:
              </h4>
              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-success-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-gray-500 dark:text-gray-400">
                    +{service.features.length - 3} əlavə xidmət
                  </li>
                )}
              </ul>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <div className="flex items-center space-x-1">
                  <DollarLineIcon className="w-5 h-5 text-success-500" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(service)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {service.provider}
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleContactForService(service.id)}
                startIcon={<PackagePlusIcon className="w-4 h-4" />}
              >
                Əlaqə
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <InfoIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nəticə tapılmadı
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Axtarış meyarlarınızı dəyişdirərək yenidən cəhd edin.
          </p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
