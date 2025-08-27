
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from "./components/layout/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SecureMDXProvider } from "./components/mdx/SecureMDXProvider";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const WizardPage = lazy(() => import("./pages/WizardPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const BankingPage = lazy(() => import("./pages/BankingPage"));
const CreditFundingPage = lazy(() => import("./pages/CreditFundingPage"));
const DocumentsPage = lazy(() => import("./pages/DocumentsPage"));
const CompliancePage = lazy(() => import("./pages/CompliancePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const BlogTagPage = lazy(() => import("./pages/BlogTagPage"));
const BlogAuthorPage = lazy(() => import("./pages/BlogAuthorPage"));
const LearnPage = lazy(() => import("./pages/LearnPage"));
const LearnTutorialPage = lazy(() => import("./pages/LearnTutorialPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <SecureMDXProvider>
              <BrowserRouter>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading...</p>
                      </div>
                    </div>
                  }>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/wizard" element={<WizardPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/banking" element={<BankingPage />} />
                        <Route path="/credit-funding" element={<CreditFundingPage />} />
                        <Route path="/documents" element={<DocumentsPage />} />
                        <Route path="/compliance" element={<CompliancePage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:slug" element={<BlogPostPage />} />
                        <Route path="/blog/tag/:tag" element={<BlogTagPage />} />
                        <Route path="/blog/author/:slug" element={<BlogAuthorPage />} />
                        <Route path="/learn" element={<LearnPage />} />
                        <Route path="/learn/:category/:slug" element={<LearnTutorialPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Layout>
                  </Suspense>
                  <Toaster />
                </div>
              </BrowserRouter>
            </SecureMDXProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
