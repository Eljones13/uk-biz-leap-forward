
import { SEO } from "@/components/seo/SEO";
import { useEffect, useState } from "react";
import { SITE } from "@/config/site";

const PrivacyPage = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import("../content/legal/privacy.mdx");
        setContent(module.default);
      } catch (error) {
        console.error("Failed to load privacy content:", error);
      }
    };
    loadContent();
  }, []);

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description={`How ${SITE.legalName} collects and uses your personal data, and your rights under UK GDPR.`}
        url="/privacy"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl py-16 px-4">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg mb-8">
              How {SITE.legalName} collects and uses your personal data, and your rights under UK GDPR.
            </p>
            
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Who we are</h2>
              <p className="mb-4">
                <strong>{SITE.legalName}</strong> ("we", "us") is registered in {SITE.jurisdiction} under company number {SITE.companyNumber}.
              </p>
              <p className="mb-4">
                Registered office: {SITE.registeredOffice}
              </p>
              <p>
                Contact: <a href={`mailto:${SITE.supportEmail}`} className="text-primary hover:underline">{SITE.supportEmail}</a>
              </p>
              {SITE.icoNumber && (
                <p>ICO registration: {SITE.icoNumber}</p>
              )}
            </div>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">What we collect</h2>
                <ul className="space-y-2">
                  <li><strong>Account & profile:</strong> name, email, phone, company details</li>
                  <li><strong>Formation details:</strong> directors, shareholders, registered office, SIC codes (entered by you)</li>
                  <li><strong>Usage & device:</strong> IP address, logs, pages viewed</li>
                  <li><strong>Billing:</strong> handled by Stripe (we don't store full card data)</li>
                  <li><strong>Support:</strong> messages and attachments you send us</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">How we use your data</h2>
                <ul className="space-y-2">
                  <li><strong>Provide the service</strong> (contract): account creation, Companies House filings, document generation</li>
                  <li><strong>Billing & fraud prevention</strong> (legal obligation / legitimate interests)</li>
                  <li><strong>Product analytics</strong> (consent if cookies; otherwise anonymised/aggregated)</li>
                  <li><strong>Communications</strong> (contract/legitimate interests; marketing only with consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Your rights</h2>
                <p>
                  You can request access, rectification, deletion, restriction, portability, and objection. 
                  Contact <a href={`mailto:${SITE.supportEmail}`} className="text-primary hover:underline">{SITE.supportEmail}</a>.
                </p>
                <p className="mt-2">
                  You also have the right to complain to the <strong>ICO</strong> (ico.org.uk).
                </p>
              </section>
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Last updated:</strong> 27 August 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
