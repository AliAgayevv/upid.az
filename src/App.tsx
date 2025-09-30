import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import AppLayout from "./layout/AppLayout";
import SignInForm from "./components/auth/SignInForm";

// Pages
import Home from "./pages/Dashboard/Home";
import Companies from "./pages/Companies/Companies";
import CompanyDetail from "./pages/Companies/CompanyDetail";
import ServiceDetail from "./pages/Companies/ServiceDetail";
import Marketplace from "./pages/Marketplace/Marketplace";
import MyServices from "./pages/MyServices/MyServices";
import AllServices from "./pages/AdminServices/AllServices";
import AddService from "./pages/AdminServices/AddService";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Login Route Component
const LoginRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <SidebarProvider>
            <Routes>
              <Route
                path="/login"
                element={
                  <LoginRoute>
                    <SignInForm />
                  </LoginRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Home />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companies"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Companies />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companies/:id"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <CompanyDetail />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companies/:companyId/services/:serviceId"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <ServiceDetail />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Marketplace />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-services"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <MyServices />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/services"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <AllServices />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/services/add"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <AddService />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </SidebarProvider>
        </Router>
      </AuthProvider>
    </>
  );
}
