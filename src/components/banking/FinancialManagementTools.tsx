
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PiggyBank, 
  TrendingUp, 
  CreditCard, 
  Users, 
  FileText, 
  Calculator,
  Target,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface FinancialPot {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  priority: "high" | "medium" | "low";
  icon: any;
  category: "savings" | "expenses" | "tax" | "payroll";
}

const financialPots: FinancialPot[] = [
  {
    id: "tax-reserve",
    name: "Tax Reserve Pot",
    description: "Corporation Tax & VAT savings",
    targetAmount: 5000,
    currentAmount: 1250,
    monthlyContribution: 800,
    priority: "high",
    icon: FileText,
    category: "tax"
  },
  {
    id: "emergency-fund",
    name: "Emergency Fund",
    description: "3-6 months operating expenses",
    targetAmount: 15000,
    currentAmount: 3000,
    monthlyContribution: 500,
    priority: "high",
    icon: PiggyBank,
    category: "savings"
  },
  {
    id: "payroll-pot",
    name: "Payroll Pot",
    description: "Employee salaries & benefits",
    targetAmount: 8000,
    currentAmount: 6500,
    monthlyContribution: 2000,
    priority: "high",
    icon: Users,
    category: "payroll"
  },
  {
    id: "business-investment",
    name: "Growth Investment",
    description: "Equipment, marketing, expansion",
    targetAmount: 10000,
    currentAmount: 2500,
    monthlyContribution: 300,
    priority: "medium",
    icon: TrendingUp,
    category: "savings"
  },
  {
    id: "bill-payments",
    name: "Monthly Bills Pot",
    description: "Rent, utilities, subscriptions",
    targetAmount: 3000,
    currentAmount: 2800,
    monthlyContribution: 1200,
    priority: "high",
    icon: CreditCard,
    category: "expenses"
  }
];

interface DirectDebit {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  nextPayment: string;
  category: string;
  status: "active" | "pending" | "failed";
}

const directDebits: DirectDebit[] = [
  {
    id: "hmrc-vat",
    name: "HMRC VAT Payment",
    amount: 2500,
    frequency: "Quarterly",
    nextPayment: "2024-01-31",
    category: "Tax",
    status: "active"
  },
  {
    id: "office-rent",
    name: "Office Rent",
    amount: 1200,
    frequency: "Monthly",
    nextPayment: "2024-01-01",
    category: "Property",
    status: "active"
  },
  {
    id: "business-insurance",
    name: "Business Insurance",
    amount: 150,
    frequency: "Monthly",
    nextPayment: "2024-01-15",
    category: "Insurance",
    status: "active"
  },
  {
    id: "software-subscriptions",
    name: "Software Subscriptions",
    amount: 89,
    frequency: "Monthly",
    nextPayment: "2024-01-10",
    category: "Technology",
    status: "pending"
  }
];

export const FinancialManagementTools = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Financial Pots Overview */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Financial Management Pots</h2>
            <p className="text-muted-foreground">
              Organize your business finances with smart savings pots
            </p>
          </div>
          <Button>
            <PiggyBank className="h-4 w-4 mr-2" />
            Create New Pot
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {financialPots.map((pot) => {
            const Icon = pot.icon;
            const progress = (pot.currentAmount / pot.targetAmount) * 100;
            
            return (
              <Card key={pot.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <Badge variant={getPriorityColor(pot.priority)}>
                        {pot.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg">{pot.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{pot.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">
                        £{pot.currentAmount.toLocaleString()} / £{pot.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {progress.toFixed(1)}% complete
                    </p>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly contribution:</span>
                    <span className="font-medium">£{pot.monthlyContribution}</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    Manage Pot
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Direct Debits Management */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Direct Debits & Standing Orders</h2>
            <p className="text-muted-foreground">
              Manage your automatic payments and subscriptions
            </p>
          </div>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Add New Payment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Direct Debits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {directDebits.map((debit) => (
                <div key={debit.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(debit.status)}
                    <div>
                      <h4 className="font-medium">{debit.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {debit.category} • {debit.frequency}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium">£{debit.amount}</div>
                    <div className="text-sm text-muted-foreground">
                      Next: {debit.nextPayment}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Financial Health Dashboard */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Financial Health Overview</h2>
          <p className="text-muted-foreground">
            Monitor your business financial health and bookkeeping status
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£24,750</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Monthly Outgoings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£8,450</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-yellow-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Tax Reserve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£1,250</div>
              <p className="text-xs text-muted-foreground">
                25% of target amount
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Investment Pot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£2,500</div>
              <p className="text-xs text-muted-foreground">
                Ready for growth opportunities
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <p className="text-muted-foreground">
            Common financial management tasks
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Calculator className="h-5 w-5" />
            <span>VAT Calculator</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <FileText className="h-5 w-5" />
            <span>Generate Invoice</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Target className="h-5 w-5" />
            <span>Set Budget Goals</span>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <TrendingUp className="h-5 w-5" />
            <span>Financial Report</span>
          </Button>
        </div>
      </section>
    </div>
  );
};
