'use client';

import { AppHeader } from "@/components/dashboard/header";
import { GrowthPool } from "@/components/dashboard/growth-pool";
import { useAppContext } from "@/contexts/app-context";
import { mockGrowthProposals } from "@/lib/mock-data";

export default function ProposalsPage() {
  const { isMock } = useAppContext();

  // In a real app, you would fetch this data from a contract or API
  const growthProposals = isMock ? mockGrowthProposals : [];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto grid gap-8">
          <h2 className="text-3xl font-bold tracking-tight">All Proposals</h2>
          <GrowthPool proposals={growthProposals} />
        </div>
      </main>
    </div>
  );
}
