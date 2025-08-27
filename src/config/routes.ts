
export interface RouteConfig {
  name: string;
  path: string;
  showInNav: boolean;
  showInFooter: boolean;
  category?: string;
  lastUpdated?: string;
}

export const routes: RouteConfig[] = [
  { name: "Home", path: "/", showInNav: true, showInFooter: false, lastUpdated: "2024-01-15" },
  { name: "Company Formation", path: "/wizard", showInNav: true, showInFooter: true, category: "Product", lastUpdated: "2024-01-15" },
  { name: "Banking", path: "/banking", showInNav: true, showInFooter: true, category: "Product", lastUpdated: "2024-01-15" },
  { name: "Credit & Funding", path: "/credit-funding", showInNav: true, showInFooter: true, category: "Product", lastUpdated: "2024-01-15" },
  { name: "Documents", path: "/documents", showInNav: true, showInFooter: true, category: "Product", lastUpdated: "2024-01-15" },
  { name: "Compliance", path: "/compliance", showInNav: true, showInFooter: true, category: "Product", lastUpdated: "2024-01-15" },
  { name: "Pricing", path: "/pricing", showInNav: true, showInFooter: true, category: "Product", lastUpdated: "2024-01-15" },
  { name: "Blog", path: "/blog", showInNav: true, showInFooter: true, category: "Resources", lastUpdated: "2024-01-15" },
  { name: "Learn", path: "/learn", showInNav: true, showInFooter: true, category: "Resources", lastUpdated: "2024-01-15" },
  { name: "Contact", path: "/contact", showInNav: true, showInFooter: true, category: "Company", lastUpdated: "2024-01-15" },
  
  // Footer-only routes
  { name: "Banking Setup", path: "/banking/setup", showInNav: false, showInFooter: true, category: "Product", lastUpdated: "2024-01-15" },
  { name: "Guides", path: "/guides", showInNav: false, showInFooter: true, category: "Resources", lastUpdated: "2024-01-15" },
  { name: "Templates", path: "/templates", showInNav: false, showInFooter: true, category: "Resources", lastUpdated: "2024-01-15" },
  { name: "Help Center", path: "/help", showInNav: false, showInFooter: true, category: "Resources", lastUpdated: "2024-01-15" },
  { name: "API Status", path: "/status", showInNav: false, showInFooter: true, category: "Resources", lastUpdated: "2024-01-15" },
  { name: "About", path: "/about", showInNav: false, showInFooter: true, category: "Company", lastUpdated: "2024-01-15" },
  { name: "Partnerships", path: "/partnerships", showInNav: false, showInFooter: true, category: "Company", lastUpdated: "2024-01-15" },
  { name: "Careers", path: "/careers", showInNav: false, showInFooter: true, category: "Company", lastUpdated: "2024-01-15" },
  { name: "Press", path: "/press", showInNav: false, showInFooter: true, category: "Company", lastUpdated: "2024-01-15" },
  { name: "Privacy Policy", path: "/privacy", showInNav: false, showInFooter: true, category: "Legal", lastUpdated: "2024-01-15" },
  { name: "Terms of Service", path: "/terms", showInNav: false, showInFooter: true, category: "Legal", lastUpdated: "2024-01-15" },
  { name: "Data Processing Addendum", path: "/dpa", showInNav: false, showInFooter: true, category: "Legal", lastUpdated: "2024-01-15" },
  { name: "Cookie Policy", path: "/cookies", showInNav: false, showInFooter: true, category: "Legal", lastUpdated: "2024-01-15" },
  
  // Utility pages
  { name: "Dashboard", path: "/dashboard", showInNav: false, showInFooter: false, lastUpdated: "2024-01-15" },
  { name: "Support", path: "/support", showInNav: false, showInFooter: false, lastUpdated: "2024-01-15" },
  { name: "Settings", path: "/settings", showInNav: false, showInFooter: false, lastUpdated: "2024-01-15" },
];

export const getNavRoutes = () => routes.filter(route => route.showInNav);
export const getFooterRoutes = () => routes.filter(route => route.showInFooter);
export const getRoutesByCategory = (category: string) => routes.filter(route => route.category === category);
