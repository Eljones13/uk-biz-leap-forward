import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import WizardPage from "./pages/WizardPage";
import DocumentsPage from "./pages/DocumentsPage";
import CompliancePage from "./pages/CompliancePage";
import PricingPage from "./pages/PricingPage";
import BankingPage from "./pages/BankingPage";
import CreditFundingPage from "./pages/CreditFundingPage";

const queryClient = new QueryClient();

// Placeholder components for remaining missing routes
const SupportPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
      <p className="text-muted-foreground">Support center coming soon...</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <p className="text-muted-foreground">Settings page coming soon...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wizard/*" element={<WizardPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/banking/*" element={<BankingPage />} />
          <Route path="/credit-funding/*" element={<CreditFundingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
