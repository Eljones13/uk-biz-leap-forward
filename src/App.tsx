
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MDXProvider } from '@mdx-js/react';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from "@/components/layout/Layout";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import WizardPage from "./pages/WizardPage";
import DocumentsPage from "./pages/DocumentsPage";
import CompliancePage from "./pages/CompliancePage";
import PricingPage from "./pages/PricingPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import BankingPage from "./pages/BankingPage";
import CreditFundingPage from "./pages/CreditFundingPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogTagPage from "./pages/BlogTagPage";
import BlogAuthorPage from "./pages/BlogAuthorPage";
import LearnPage from "./pages/LearnPage";
import LearnTutorialPage from "./pages/LearnTutorialPage";
import ContactPage from "./pages/ContactPage";
import SitemapPage from "./pages/SitemapPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MDXProvider components={mdxComponents}>
            <Layout>
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
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/tag/:tag" element={<BlogTagPage />} />
                <Route path="/blog/author/:slug" element={<BlogAuthorPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/learn/:category/:slug" element={<LearnTutorialPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </MDXProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
