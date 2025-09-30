import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Badge from "../components/ui/badge/Badge";
import {
  GridIcon,
  UserIcon,
  DocsIcon,
  BoxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "../icons";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  subItems?: SubMenuItem[];
}

const AppSidebar: React.FC = () => {
  const { isExpanded } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Admin menu items
  const adminNavItems: MenuItem[] = [
    {
      icon: <GridIcon />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <UserIcon />,
      label: "Şirkətlər",
      href: "/companies",
    },
    {
      icon: <BoxIcon />,
      label: "Xidmətlər",
      subItems: [
        { label: "Bütün xidmətlər", href: "/services" },
        { label: "Xidməti əlavə et", href: "/services/add" },
      ],
    },
    {
      icon: <DocsIcon />,
      label: "Hesabatlar",
      subItems: [
        { label: "Hesabatların şablonları", href: "/reports/templates" },
        { label: "Şablon yarat", href: "/reports/create" },
        { label: "Şablonu göndər", href: "/reports/send" },
      ],
    },
    {
      icon: <UserIcon />,
      label: "İstifadəçilər",
      subItems: [
        { label: "Bütün istifadəçilər", href: "/users" },
        { label: "İstifadəçi əlavə et", href: "/users/add" },
      ],
    },
  ];

  // Client menu items
  const clientNavItems: MenuItem[] = [
    {
      icon: <GridIcon />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <BoxIcon />,
      label: "Xidmətlər",
      subItems: [
        { label: "Abonə olduğum xidmətlər", href: "/my-services" },
        { label: "Marketplace", href: "/marketplace" },
      ],
    },
    {
      icon: <DocsIcon />,
      label: "Hesabatlar",
      subItems: [{ label: "Hesabatlarıma bax", href: "/my-reports" }],
    },
  ];

  const getMenuItems = () => {
    if (!user) return [];
    return user.role === "admin" ? adminNavItems : clientNavItems;
  };

  const menuItems = getMenuItems();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isMenuOpen = (label: string) => openMenus.includes(label);

  const isActiveMenu = (item: MenuItem) => {
    if (item.href) {
      return location.pathname === item.href;
    }
    if (item.subItems) {
      return item.subItems.some(
        (subItem) => location.pathname === subItem.href
      );
    }
    return false;
  };

  if (!user) {
    return null;
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 transition-all duration-300 z-40 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div
          className={`flex items-center ${
            isExpanded ? "space-x-3" : "justify-center"
          }`}
        >
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          {isExpanded && (
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">UPID</h2>
              <div className="flex items-center space-x-2">
                <Badge
                  color={user.role === "admin" ? "primary" : "success"}
                  size="sm"
                >
                  {user.role === "admin" ? "Admin" : "Client"}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              {/* Main Menu Item */}
              {item.href ? (
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    location.pathname === item.href
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  } ${!isExpanded && "justify-center"}`}
                >
                  <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
                  {isExpanded && (
                    <span className="ml-3 font-medium text-sm">
                      {item.label}
                    </span>
                  )}
                  {!isExpanded && (
                    <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActiveMenu(item)
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  } ${!isExpanded && "justify-center"}`}
                >
                  <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
                  {isExpanded && (
                    <>
                      <span className="ml-3 font-medium text-sm flex-1 text-left">
                        {item.label}
                      </span>
                      <span className="ml-2 flex-shrink-0">
                        {isMenuOpen(item.label) ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </span>
                    </>
                  )}
                  {!isExpanded && (
                    <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              )}

              {/* Submenu Items */}
              {item.subItems && isExpanded && isMenuOpen(item.label) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                        location.pathname === subItem.href
                          ? "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span className="w-2 h-2 bg-current rounded-full mr-3 opacity-50"></span>
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User Info */}
      {isExpanded && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-100 dark:bg-brand-500/20 rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;
