import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { VaultStat } from "@/lib/types";
import { cn } from "@/lib/utils";

const StatCard = ({ label, value, usdValue, change, icon: Icon }: VaultStat) => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(usdValue);

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-sm transition-all hover:border-primary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <span
            className={cn(
              "flex items-center gap-1",
              change >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(change)}%
          </span>
          <span className="ml-1">24h change</span>
        </div>
      </CardContent>
    </Card>
  );
};

const StatCardSkeleton = () => (
    <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-2/4" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
)

export function VaultStats({ stats }: { stats: VaultStat[] }) {
  const isLoading = stats.length === 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
        <>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </>
      ) : (
        stats.map((stat) => <StatCard key={stat.label} {...stat} />)
      )}
    </div>
  );
}
