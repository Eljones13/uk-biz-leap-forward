
import { Link } from "react-router-dom";
import { Building2, Linkedin, Twitter, Youtube } from "lucide-react";
import { getRoutesByCategory } from "@/config/routes";
import { CookieSettingsLink } from "../cookies/CookieSettingsLink";
import { SITE } from "@/config/site";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const productRoutes = getRoutesByCategory("Product");
  const resourceRoutes = getRoutesByCategory("Resources");
  const companyRoutes = getRoutesByCategory("Company");

  return (
    <footer className="bg-[#0B2447] text-[#F8FAFC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5" />
              <span className="font-semibold text-white">{SITE.name}</span>
            </div>
            <div className="text-sm text-[#94A3B8] space-y-2">
              <p>© {currentYear} {SITE.legalName}</p>
              <p>
                {SITE.legalName} — Company No. {SITE.companyNumber} ({SITE.jurisdiction})
              </p>
              <p>Registered Office: {SITE.registeredOffice}</p>
              {SITE.icoNumber && <p>ICO Reg: {SITE.icoNumber}</p>}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Product</h4>
            <ul className="space-y-3">
              {productRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Resources</h4>
            <ul className="space-y-3">
              {resourceRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <CookieSettingsLink />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E3A8A] pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Contact Info */}
            <div className="flex flex-col lg:flex-row items-center gap-4 text-sm text-[#94A3B8]">
              <span>Support: <a href={`mailto:${SITE.supportEmail}`} className="text-white hover:underline">{SITE.supportEmail}</a></span>
            </div>

            {/* Social Links and Sitemap */}
            <div className="flex items-center gap-4">
              <Link
                to="/sitemap"
                className="text-[#94A3B8] hover:text-white transition-colors text-sm"
              >
                Sitemap
              </Link>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/company/businessbuilder-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-white transition-colors"
                  aria-label="Follow us on LinkedIn (opens in new tab)"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/businessbuilder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-white transition-colors"
                  aria-label="Follow us on Twitter (opens in new tab)"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/@businessbuilder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-white transition-colors"
                  aria-label="Subscribe to our YouTube channel (opens in new tab)"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
