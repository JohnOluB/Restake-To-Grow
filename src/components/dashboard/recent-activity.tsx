"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ExternalLink,
  HandCoins,
  Lightbulb,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Activity } from "@/lib/types";
import { cn } from "@/lib/utils";

const GlassCard = (props: React.ComponentProps<typeof Card>) => (
  <Card {...props} className="border-border/50 bg-card/60 backdrop-blur-sm" />
);

const iconMap = {
  Deposit: ArrowDownToLine,
  Withdraw: ArrowUpFromLine,
  Fund: Lightbulb,
  Claim: HandCoins,
};

const colorMap = {
  Deposit: "text-green-400",
  Withdraw: "text-yellow-400",
  Fund: "text-blue-400",
  Claim: "text-purple-400",
};

const ActivityItem = ({ type, description, value, timestamp, txHash }: Activity) => {
  const Icon = iconMap[type];

  return (
    <div className="flex items-center gap-4">
      <div className={cn("p-2 rounded-full bg-slate-800", colorMap[type])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{description}</p>
        <p className="text-sm text-muted-foreground">{timestamp}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{value}</p>
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:underline flex items-center gap-1 justify-end"
        >
          View Tx <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

const ActivitySkeleton = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="h-9 w-9 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
    <div className="text-right space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-20 ml-auto" />
    </div>
  </div>
);

export function RecentActivity({ activities }: { activities: Activity[] }) {
  const isLoading = activities.length === 0;

  return (
    <GlassCard>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          A real-time feed of vault and pool interactions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <>
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
          </>
        ) : (
          activities.map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))
        )}
      </CardContent>
    </GlassCard>
  );
}
