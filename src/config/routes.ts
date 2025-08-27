
import Index from "@/pages/Index";
import BlogPage from "@/pages/BlogPage";
import LearnPage from "@/pages/LearnPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import BlogPostPage from "@/pages/BlogPostPage";
import LearnTutorialPage from "@/pages/LearnTutorialPage";
import ContentCheck from "@/pages/ContentCheck";
import SitemapPage from "@/pages/SitemapPage";

export const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/blog",
    component: BlogPage,
  },
  {
    path: "/blog/:slug",
    component: BlogPostPage,
  },
  {
    path: "/learn",
    component: LearnPage,
  },
  {
    path: "/learn/:category/:slug",
    component: LearnTutorialPage,
  },
  {
    path: "/contact",
    component: ContactPage,
  },
  {
    path: "/sitemap",
    component: SitemapPage,
  },
  {
    path: "/404",
    component: NotFound,
  },
  {
    path: "*",
    component: NotFound,
  },
  {
    path: "/content-check",
    component: ContentCheck,
  },
];

// Navigation routes for header
export const getNavRoutes = () => [
  { path: "/", name: "Home" },
  { path: "/blog", name: "Blog" },
  { path: "/learn", name: "Learn" },
  { path: "/contact", name: "Contact" },
];

// Route categories for footer and sitemap
export const getRoutesByCategory = (category: string) => {
  const routeCategories = {
    "Product": [
      { path: "/", name: "Home", lastUpdated: "2024-01-15" },
      { path: "/dashboard", name: "Dashboard", lastUpdated: "2024-01-10" },
      { path: "/wizard", name: "Company Setup", lastUpdated: "2024-01-08" },
      { path: "/banking", name: "Banking", lastUpdated: "2024-01-05" },
    ],
    "Resources": [
      { path: "/blog", name: "Blog", lastUpdated: "2024-01-12" },
      { path: "/learn", name: "Learn", lastUpdated: "2024-01-10" },
      { path: "/support", name: "Support", lastUpdated: "2024-01-08" },
    ],
    "Company": [
      { path: "/contact", name: "Contact", lastUpdated: "2024-01-06" },
      { path: "/pricing", name: "Pricing", lastUpdated: "2024-01-04" },
    ],
    "Legal": [
      { path: "/privacy", name: "Privacy Policy", lastUpdated: "2023-12-20" },
      { path: "/terms", name: "Terms of Service", lastUpdated: "2023-12-20" },
    ]
  };

  return routeCategories[category as keyof typeof routeCategories] || [];
};
