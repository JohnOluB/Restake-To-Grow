"use client";

import { useState } from "react";
import { Lightbulb, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { GrowthProposal } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

const GlassCard = (props: React.ComponentProps<typeof Card>) => (
    <Card {...props} className="border-border/50 bg-card/60 backdrop-blur-sm" />
);

const ProposalItem = ({ title, description, goal, funded, status }: GrowthProposal) => {
  const { toast } = useToast();
  const [fundAmount, setFundAmount] = useState("");
  const [isFunding, setIsFunding] = useState(false);
  const progress = (funded / goal) * 100;

  const handleFund = () => {
    setIsFunding(true);
    setTimeout(() => {
      setIsFunding(false);
      toast({
        title: "Proposal Funded",
        description: `You successfully funded "${title}" with ${fundAmount} ASSET.`,
      });
      setFundAmount("");
    }, 1500);
  };
  
  const isCompleted = status === 'Completed';

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
        <Progress value={progress} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{funded.toLocaleString()} / {goal.toLocaleString()} ASSET</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
      </div>
      {!isCompleted && (
        <div className="flex gap-2">
            <Input 
              placeholder="Amount to fund" 
              value={fundAmount} 
              onChange={e => setFundAmount(e.target.value)}
              disabled={isFunding}
            />
            <Button onClick={handleFund} disabled={!fundAmount || isFunding}>
              {isFunding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Fund
            </Button>
        </div>
      )}
      {isCompleted && (
         <div className="text-sm font-medium text-accent">Funding Completed</div>
      )}
    </div>
  );
};

const ProposalSkeleton = () => (
  <div className="space-y-3">
    <div className="flex items-start gap-4">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-2 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/6" />
      </div>
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-10 flex-1" />
      <Skeleton className="h-10 w-20" />
    </div>
  </div>
);

export function GrowthPool({ proposals }: { proposals: GrowthProposal[] }) {
  const isLoading = proposals.length === 0;
  return (
    <GlassCard>
      <CardHeader>
        <CardTitle>GrowthPool Dashboard</CardTitle>
        <CardDescription>
          Fund proposals to grow the ecosystem and earn rewards.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <>
            <ProposalSkeleton />
            <Separator />
            <ProposalSkeleton />
          </>
        ) : (
          proposals.map((proposal, index) => (
            <div key={proposal.id}>
              <ProposalItem {...proposal} />
              {index < proposals.length - 1 && <Separator className="my-6" />}
            </div>
          ))
        )}
      </CardContent>
    </GlassCard>
  );
}
