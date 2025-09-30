import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import { ArrowLeft, Plus, X, CheckCircle } from "lucide-react";

interface ServiceFormData {
  name: string;
  companyId: string;
  category: string;
  subcategory: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  status: "active" | "inactive" | "pending" | "draft";
  serviceType: "one-time" | "subscription" | "custom";
  tags: string[];
  isPopular: boolean;
  isFeatured: boolean;
}

interface FormErrors {
  name?: string;
  companyId?: string;
  category?: string;
  description?: string;
  shortDescription?: string;
  price?: string;
  duration?: string;
  features?: string[];
}

const AddService: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    companyId: "",
    category: "",
    subcategory: "",
    description: "",
    shortDescription: "",
    price: 0,
    currency: "AZN",
    duration: "",
    features: [""],
    status: "draft",
    serviceType: "one-time",
    tags: [""],
    isPopular: false,
    isFeatured: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const categories = [
    "İT Xidmətləri",
    "Marketinq",
    "Hüquqi Xidmətlər",
    "Maliyyə",
    "Dizayn",
    "Təhsil",
    "Sağlamlıq",
    "Daşınmaz Əmlak",
    "Nəqliyyat",
    "Digər",
  ];

  const companies = [
    { id: "comp-001", name: "TechCorp Solutions" },
    { id: "comp-002", name: "CloudTech Pro" },
    { id: "comp-003", name: "MarketPro Agency" },
    { id: "comp-004", name: "LegalExperts LLC" },
    { id: "comp-005", name: "FinanceWise Consulting" },
    { id: "comp-006", name: "Creative Studio" },
    { id: "comp-007", name: "MobileTech Solutions" },
    { id: "comp-008", name: "WordCraft Agency" },
    { id: "comp-009", name: "SecureNet Solutions" },
    { id: "comp-010", name: "E-Shop Pro" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Xidmət adı tələb olunur";
    }

    if (!formData.companyId) {
      newErrors.companyId = "Şirkət seçimi tələb olunur";
    }

    if (!formData.category) {
      newErrors.category = "Kateqoriya seçimi tələb olunur";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Təsvir tələb olunur";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Qısa təsvir tələb olunur";
    }

    if (formData.price <= 0) {
      newErrors.price = "Düzgün qiymət daxil edin";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Müddət tələb olunur";
    }

    const validFeatures = formData.features.filter((f) => f.trim() !== "");
    if (validFeatures.length === 0) {
      newErrors.features = ["Ən azı bir xüsusiyyət əlavə edin"];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clean up features and tags
      const cleanedData = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ""),
        tags: formData.tags.filter((t) => t.trim() !== ""),
      };

      console.log("Service created:", cleanedData);

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/admin/services");
      }, 2000);
    } catch (error) {
      console.error("Error creating service:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof ServiceFormData,
    value: string | number | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const updateTag = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.map((tag, i) => (i === index ? value : tag)),
    }));
  };

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Xidmət uğurla yaradıldı!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Sizi xidmətlər siyahısına yönləndiririk...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/services")}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Yeni Xidmət Əlavə Et
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Sistemə yeni xidmət əlavə edin
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Əsas Məlumatlar
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Xidmət Adı *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Məsələn: Professional Web Development"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Şirkət *
              </label>
              <select
                value={formData.companyId}
                onChange={(e) => handleInputChange("companyId", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.companyId
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="">Şirkət seçin</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              {errors.companyId && (
                <p className="mt-1 text-sm text-red-600">{errors.companyId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kateqoriya *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.category
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="">Kateqoriya seçin</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alt Kateqoriya
              </label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) =>
                  handleInputChange("subcategory", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Məsələn: Web Development"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Qısa Təsvir *
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) =>
                handleInputChange("shortDescription", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                errors.shortDescription
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Xidmətin qısa təsviri (maksimum 100 simvol)"
              maxLength={100}
            />
            {errors.shortDescription && (
              <p className="mt-1 text-sm text-red-600">
                {errors.shortDescription}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ətraflı Təsvir *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Xidmətin ətraflı təsviri..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Pricing & Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Qiymət və Detallar
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Qiymət *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value) || 0)
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.price
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Valyuta
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="AZN">AZN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Müddət *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                  errors.duration
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Məsələn: 1 ay, 2 həftə, 1 saatı"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Xidmət Növü
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) =>
                  handleInputChange("serviceType", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="one-time">Birdəfəlik</option>
                <option value="subscription">Abunəlik</option>
                <option value="custom">Fərdi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Qaralama</option>
                <option value="pending">Gözləyir</option>
                <option value="active">Aktiv</option>
                <option value="inactive">Qeyri-aktiv</option>
              </select>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Xüsusiyyətlər *
            </h2>
            <Button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Xüsusiyyət Əlavə Et
            </Button>
          </div>

          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={`Xüsusiyyət ${index + 1}`}
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.features && (
            <p className="mt-2 text-sm text-red-600">{errors.features[0]}</p>
          )}
        </div>

        {/* Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Etiketlər
            </h2>
            <Button
              type="button"
              onClick={addTag}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Etiket Əlavə Et
            </Button>
          </div>

          <div className="space-y-3">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={`Etiket ${index + 1}`}
                />
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Əlavə Seçimlər
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPopular"
                checked={formData.isPopular}
                onChange={(e) =>
                  handleInputChange("isPopular", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="isPopular"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Populyar xidmət kimi qeyd et
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) =>
                  handleInputChange("isFeatured", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="isFeatured"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Təqdim edilən xidmət kimi qeyd et
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            onClick={() => navigate("/admin/services")}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Ləğv et
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Yaradılır...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Xidməti Yarat
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
