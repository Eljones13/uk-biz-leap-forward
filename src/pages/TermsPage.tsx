
import { SEO } from "@/components/seo/SEO";
import { SITE } from "@/config/site";
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <>
      <SEO 
        title="Terms of Service"
        description={`Terms that govern your use of ${SITE.legalName}.`}
        url="/terms"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl py-16 px-4">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Terms that govern your use of {SITE.legalName}.
            </p>
            
            <div className="bg-card p-6 rounded-lg border mb-8">
              <h2 className="text-xl font-semibold mb-3">About us</h2>
              <p>
                {SITE.legalName} (Company No. {SITE.companyNumber}, {SITE.jurisdiction}) provides software 
                that helps you register a UK company, generate documents, and manage related workflows.
              </p>
              <p className="mt-2">
                Contact: <a href={`mailto:${SITE.supportEmail}`} className="text-primary hover:underline">{SITE.supportEmail}</a>
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-3">No legal, tax, or financial advice</h2>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-yellow-800">
                    <strong>Important:</strong> Information provided is general guidance only. 
                    We are not a law firm or regulated advisor. You should obtain professional advice for your circumstances.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Companies House filings</h2>
                <p>
                  When you submit a filing through our platform you authorise us (or our provider) to transmit 
                  your data to <strong>Companies House</strong>. You are responsible for the accuracy of all information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Banking & partners</h2>
                <p>
                  We may show banking products or partner links. Some links are <strong>affiliate links</strong> and 
                  we may earn a commission. We do <strong>not</strong> provide regulated credit advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Plans, fees, and billing</h2>
                <p>
                  Prices are shown <strong>exclusive of VAT</strong> unless stated otherwise. 
                  Subscriptions renew until cancelled. Billing is handled by <strong>Stripe</strong>. 
                  If a payment fails, we may suspend access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Liability</h2>
                <p>
                  To the fullest extent permitted by law, we exclude implied warranties and limit total liability 
                  to the greater of <strong>(a) £100</strong> or <strong>(b) amounts paid in the 12 months</strong> before the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Governing law</h2>
                <p>
                  These terms are governed by the laws of <strong>England & Wales</strong>, 
                  and the courts of England have exclusive jurisdiction.
                </p>
              </section>
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Last updated:</strong> 27 August 2025
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

export default TermsPage;
