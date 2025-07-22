
import { NavigateFunction } from "react-router-dom";

export const navigationRoutes = {
  // Core wizard flows
  wizard: "/wizard",
  companyDetails: "/wizard/company-details",
  directors: "/wizard/directors",
  address: "/wizard/address",
  review: "/wizard/review",
  
  // Feature pages
  banking: "/banking",
  bankingSetup: "/banking/setup",
  documents: "/documents",
  compliance: "/compliance",
  pricing: "/pricing",
  support: "/support",
  settings: "/settings",
  
  // Dashboard sections
  dashboard: "/dashboard",
  progress: "/dashboard/progress",
  tasks: "/dashboard/tasks",
  
  // Account management
  profile: "/profile",
  billing: "/billing",
  notifications: "/notifications"
};

export const createNavigationHandler = (navigate: NavigateFunction) => ({
  goToWizard: () => navigate(navigationRoutes.wizard),
  goToCompanyDetails: () => navigate(navigationRoutes.companyDetails),
  goToDirectors: () => navigate(navigationRoutes.directors),
  goToBanking: () => navigate(navigationRoutes.banking),
  goToDocuments: () => navigate(navigationRoutes.documents),
  goToCompliance: () => navigate(navigationRoutes.compliance),
  goToPricing: () => navigate(navigationRoutes.pricing),
  goToSupport: () => navigate(navigationRoutes.support),
  goToSettings: () => navigate(navigationRoutes.settings),
  goToDashboard: () => navigate(navigationRoutes.dashboard)
});

export const getTaskActionUrl = (taskId: number, category: string): string => {
  switch (taskId) {
    case 1:
      return navigationRoutes.companyDetails;
    case 2:
      return navigationRoutes.directors;
    case 3:
      return navigationRoutes.bankingSetup;
    default:
      return navigationRoutes.wizard;
  }
};
