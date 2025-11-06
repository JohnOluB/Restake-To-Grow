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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const GlassCard = (props: React.ComponentProps<typeof Card>) => (
    <Card {...props} className="border-border/50 bg-card/60 backdrop-blur-sm" />
);

const FundSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be greater than 0" }),
});

const ProposalItem = ({ title, description, goal, funded, status }: GrowthProposal) => {
  const { toast } = useToast();
  const [isFunding, setIsFunding] = useState(false);
  const progress = (funded / goal) * 100;

  const form = useForm<z.infer<typeof FundSchema>>({
    resolver: zodResolver(FundSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof FundSchema>) => {
    setIsFunding(true);
    setTimeout(() => {
      setIsFunding(false);
      toast({
        title: "Proposal Funded",
        description: `You successfully funded "${title}" with ${values.amount} ASSET.`,
      });
      form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="Amount to fund" 
                      type="number"
                      step="any"
                      {...field}
                      disabled={isFunding}
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isFunding || !form.formState.isValid}>
              {isFunding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Fund
            </Button>
          </form>
        </Form>
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
