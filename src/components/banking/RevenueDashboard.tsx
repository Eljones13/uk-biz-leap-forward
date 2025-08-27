
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, MousePointer, DollarSign, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ClickStats {
  bank_name: string;
  click_count: number;
  estimated_revenue: number;
  last_click: string;
}

export const RevenueDashboard = () => {
  const [clickStats, setClickStats] = useState<ClickStats[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClickStats();
  }, []);

  const fetchClickStats = async () => {
    try {
      // Fetch affiliate clicks from audit_logs where event_type = 'affiliate_click'
      const { data, error } = await supabase
        .from('audit_logs')
        .select('event_data, created_at')
        .eq('event_type', 'affiliate_click')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process the data to get stats by bank
      const bankStats = new Map<string, { count: number; lastClick: string; revenue: number }>();
      
      // Commission rates (mock data)
      const commissionRates: Record<string, number> = {
        'Starling Bank': 50,
        'Tide': 75,
        'Monzo Business': 40,
        'HSBC': 30,
        'Lloyds Bank': 25,
        'Revolut Business': 60
      };

      data?.forEach(click => {
        const eventData = click.event_data as any;
        const bankName = eventData?.bank_name;
        
        if (bankName) {
          const current = bankStats.get(bankName) || { count: 0, lastClick: click.created_at, revenue: 0 };
          bankStats.set(bankName, {
            count: current.count + 1,
            lastClick: current.lastClick > click.created_at ? current.lastClick : click.created_at,
            revenue: current.revenue + (commissionRates[bankName] || 0)
          });
        }
      });

      const statsArray = Array.from(bankStats.entries()).map(([bank, stats]) => ({
        bank_name: bank,
        click_count: stats.count,
        estimated_revenue: stats.revenue,
        last_click: stats.lastClick
      }));

      setClickStats(statsArray);
      setTotalClicks(data?.length || 0);
      setTotalRevenue(statsArray.reduce((sum, stat) => sum + stat.estimated_revenue, 0));
    } catch (error) {
      console.error('Error fetching click stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <MousePointer className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Clicks</p>
                <p className="text-2xl font-bold">{totalClicks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Estimated Revenue</p>
                <p className="text-2xl font-bold">£{totalRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Conversion Rate</p>
                <p className="text-2xl font-bold">Est. 5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bank Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clickStats.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No affiliate clicks yet. Try clicking "Apply Now" on any bank above!
              </p>
            ) : (
              clickStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{stat.bank_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Last click: {formatDistanceToNow(new Date(stat.last_click))} ago
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      {stat.click_count} clicks
                    </Badge>
                    <div className="text-right">
                      <p className="font-medium">£{stat.estimated_revenue}</p>
                      <p className="text-xs text-muted-foreground">revenue</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
