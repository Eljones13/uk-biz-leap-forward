
import { SEO } from "@/components/seo/SEO";

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact"
        description="Get in touch with BusinessBuilder Pro. Contact us for support, partnerships, or general inquiries."
        url="/contact"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl py-16 px-4">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <p className="text-muted-foreground">
            Get in touch with our team for support, partnerships, or general inquiries.
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
