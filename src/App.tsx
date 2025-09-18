import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import CitizenDashboardPage from "./pages/CitizenDashboardPage";
import DepartmentDashboardPage from "./pages/DepartmentDashboardPage";
import HealthDepartmentDashboardPage from "./pages/HealthDepartmentDashboardPage";
import WorkerDashboardPage from "./pages/WorkerDashboardPage";
import MunicipalDashboardPage from "./pages/MunicipalDashboardPage";
import NotFound from "./pages/NotFound";
import WaterDepartmentDashboardPage from "./pages/WaterDepartmentDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/citizen" element={<CitizenDashboardPage />} />
            <Route path="/department" element={<DepartmentDashboardPage />} />
            <Route path="/department/health" element={<HealthDepartmentDashboardPage />} />
            <Route path="/worker" element={<WorkerDashboardPage />} />
            <Route path="/municipal" element={<MunicipalDashboardPage />} />
            <Route path="/state" element={<MunicipalDashboardPage />} />
            <Route path="/department/water" element={<WaterDepartmentDashboardPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
