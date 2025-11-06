'use client';

import { AppHeader } from "@/components/dashboard/header";
import { MainActions } from "@/components/dashboard/main-actions";
import { VaultStats } from "@/components/dashboard/vault-stats";
import { YieldSplit } from "@/components/dashboard/yield-split";
import { GrowthPool } from "@/components/dashboard/growth-pool";
import { useAppContext } from "@/contexts/app-context";
import { mockGrowthProposals, mockVaultStats } from "@/lib/mock-data";

export default function Home() {
  const { isMock } = useAppContext();

  // In a real app, you would fetch this data from a contract
  const vaultStats = isMock ? mockVaultStats : [];
  const growthProposals = isMock ? mockGrowthProposals : [];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid gap-8">
          <VaultStats stats={vaultStats} />
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-8">
              <MainActions />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <YieldSplit />
              <GrowthPool proposals={growthProposals} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
