
import { SEO } from "@/components/seo/SEO";

const SettingsPage = () => {
  return (
    <>
      <SEO 
        title="Settings"
        description="Manage your BusinessBuilder Pro account settings and preferences."
        url="/settings"
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl py-16 px-4">
          <h1 className="text-4xl font-bold mb-8">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
