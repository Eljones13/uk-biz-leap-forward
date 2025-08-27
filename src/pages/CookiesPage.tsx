
import { SEO } from "@/components/seo/SEO";
import { SITE } from "@/config/site";
import { Link } from "react-router-dom";

const CookiesPage = () => {
  return (
    <>
      <SEO 
        title="Cookie Policy"
        description={`How ${SITE.legalName} uses cookies and how you can manage your preferences.`}
        url="/cookies"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl py-16 px-4">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            <p className="text-muted-foreground text-lg mb-8">
              How we use cookies and how you can manage your preferences.
            </p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">Types of cookies</h2>
                <ul className="space-y-2">
                  <li><strong>Essential (strictly necessary)</strong> — security, authentication, load balancing</li>
                  <li><strong>Analytics (optional)</strong> — understand usage and improve features</li>
                  <li><strong>Marketing (optional)</strong> — measure campaigns and partner referrals</li>
                </ul>
              </section>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">Consent Required</h3>
                <p>
                  Analytics/marketing cookies only load <strong>after consent</strong> from our banner. 
                  You can update choices anytime via <strong>Manage Preferences</strong> in the footer.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Managing cookies</h2>
                <p>
                  Most browsers let you control cookies. Blocking some cookies may affect core functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Technologies we use</h2>
                <ul className="space-y-2">
                  <li>Session cookies for authentication</li>
                  <li>Analytics tools that respect consent</li>
                  <li>Affiliate tracking parameters on outbound partner links (non-PII unless consented)</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                For broader privacy information, see our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
              <p className="text-sm mt-2">
                Contact: <a href={`mailto:${SITE.supportEmail}`} className="text-primary hover:underline">{SITE.supportEmail}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesPage;
