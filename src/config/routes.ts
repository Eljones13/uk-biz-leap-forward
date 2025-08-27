import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import LearnPage from "@/pages/LearnPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import BlogArticlePage from "@/pages/BlogArticlePage";
import LearnArticlePage from "@/pages/LearnArticlePage";
import ContentCheck from "@/pages/ContentCheck";

export const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/blog",
    component: BlogPage,
  },
  {
    path: "/blog/:slug",
    component: BlogArticlePage,
  },
  {
    path: "/learn",
    component: LearnPage,
  },
  {
    path: "/learn/:category/:slug",
    component: LearnArticlePage,
  },
  {
    path: "/contact",
    component: ContactPage,
  },
  {
    path: "/privacy",
    component: PrivacyPage,
  },
  {
    path: "/terms",
    component: TermsPage,
  },
  {
    path: "/404",
    component: NotFoundPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
  {
    path: "/content-check",
    component: ContentCheck,
  },
];
