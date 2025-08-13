
import { SecuritySettings } from "@/components/security/SecuritySettings";
import { AuditLog } from "@/components/security/AuditLog";
import { AuthenticatedLayout } from "@/components/AuthenticatedLayout";

const SecurityPage = () => {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Security Center</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account security and monitor activity
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SecuritySettings />
          <AuditLog />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SecurityPage;
