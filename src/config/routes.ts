
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

// Route categories for footer
export const getRoutesByCategory = (category: string) => {
  const routeCategories = {
    "Product": [
      { path: "/", name: "Home" },
      { path: "/dashboard", name: "Dashboard" },
      { path: "/wizard", name: "Company Setup" },
      { path: "/banking", name: "Banking" },
    ],
    "Resources": [
      { path: "/blog", name: "Blog" },
      { path: "/learn", name: "Learn" },
      { path: "/support", name: "Support" },
    ],
    "Company": [
      { path: "/contact", name: "Contact" },
      { path: "/pricing", name: "Pricing" },
    ],
    "Legal": [
      { path: "/privacy", name: "Privacy Policy" },
      { path: "/terms", name: "Terms of Service" },
    ]
  };

  return routeCategories[category as keyof typeof routeCategories] || [];
};
