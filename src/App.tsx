import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import { CookieBanner } from "@/components/cookies/CookieBanner";

// Layout Components
import Layout from "@/components/layout/Layout";
import { AuthenticatedLayout } from "@/components/AuthenticatedLayout";

// Public Pages
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import BlogAuthorPage from "@/pages/BlogAuthorPage";
import BlogTagPage from "@/pages/BlogTagPage";
import LearnPage from "@/pages/LearnPage";
import LearnTutorialPage from "@/pages/LearnTutorialPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PricingPage from "@/pages/PricingPage";
import NotFound from "@/pages/NotFound";

// Legal Pages
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import CookiesPage from "@/pages/CookiesPage";

// Authenticated Pages
import Dashboard from "@/pages/Dashboard";
import WizardPage from "@/pages/WizardPage";
import BankingPage from "@/pages/BankingPage";
import EnhancedBankingPage from "@/pages/EnhancedBankingPage";
import CreditFundingPage from "@/pages/CreditFundingPage";
import DocumentsPage from "@/pages/DocumentsPage";
import CompliancePage from "@/pages/CompliancePage";
import SettingsPage from "@/pages/SettingsPage";
import SecurityPage from "@/pages/SecurityPage";
import SupportPage from "@/pages/SupportPage";

// Admin Pages
import BlogAdminPage from "@/pages/admin/BlogAdminPage";
import LearnAdminPage from "@/pages/admin/LearnAdminPage";
import ImportMDXPage from "@/pages/admin/ImportMDXPage";

// Utility Pages
import ContentCheck from "@/pages/ContentCheck";
import SitemapPage from "@/pages/SitemapPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public routes with Layout */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="auth" element={<AuthPage />} />
                    <Route path="blog" element={<BlogPage />} />
                    <Route path="blog/:slug" element={<BlogPostPage />} />
                    <Route path="blog/author/:authorSlug" element={<BlogAuthorPage />} />
                    <Route path="blog/tag/:tag" element={<BlogTagPage />} />
                    <Route path="learn" element={<LearnPage />} />
                    <Route path="learn/:category/:slug" element={<LearnTutorialPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="pricing" element={<PricingPage />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="cookies" element={<CookiesPage />} />
                    <Route path="content-check" element={<ContentCheck />} />
                    <Route path="sitemap" element={<SitemapPage />} />
                  </Route>

                  {/* Authenticated routes with AuthenticatedLayout */}
                  <Route path="/" element={
                    <ProtectedRoute>
                      <AuthenticatedLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="wizard" element={<WizardPage />} />
                    <Route path="banking" element={<BankingPage />} />
                    <Route path="enhanced-banking" element={<EnhancedBankingPage />} />
                    <Route path="credit-funding" element={<CreditFundingPage />} />
                    <Route path="documents" element={<DocumentsPage />} />
                    <Route path="compliance" element={<CompliancePage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="security" element={<SecurityPage />} />
                    <Route path="support" element={<SupportPage />} />
                    
                    {/* Admin routes */}
                    <Route path="admin/blog" element={<BlogAdminPage />} />
                    <Route path="admin/learn" element={<LearnAdminPage />} />
                    <Route path="admin/import" element={<ImportMDXPage />} />
                  </Route>

                  {/* 404 page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CookieBanner />
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
