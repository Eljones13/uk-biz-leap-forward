
import { SEO } from "@/components/seo/SEO";

const SupportPage = () => {
  return (
    <>
      <SEO 
        title="Support"
        description="Get help with BusinessBuilder Pro. Contact our support team for assistance with company formation and compliance."
        url="/support"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl py-16 px-4">
          <h1 className="text-4xl font-bold mb-8">Support</h1>
          <p className="text-muted-foreground">
            Need help? Contact our support team for assistance with your business formation journey.
          </p>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
