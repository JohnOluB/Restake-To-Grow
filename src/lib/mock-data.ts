import { Coins, DollarSign, HandCoins, TrendingUp } from "lucide-react";
import type { GrowthProposal, VaultStat } from "./types";

export const mockVaultStats: VaultStat[] = [
  {
    label: "Total Value Locked",
    value: 1234567.89,
    usdValue: 1234567.89,
    change: 1.23,
    icon: DollarSign,
  },
  {
    label: "Your Deposits",
    value: 5000.00,
    usdValue: 5000.00,
    change: 0,
    icon: Coins,
  },
  {
    label: "Total Yield Generated",
    value: 25000.50,
    usdValue: 25000.50,
    change: 5.78,
    icon: TrendingUp,
  },
  {
    label: "Claimable Yield",
    value: 250.75,
    usdValue: 250.75,
    change: -0.5,
    icon: HandCoins,
  },
];

export const mockGrowthProposals: GrowthProposal[] = [
  {
    id: "prop-1",
    title: "Launch New Yield Strategy",
    description: "Develop and deploy a new strategy leveraging cross-chain liquidity.",
    goal: 50000,
    funded: 27500,
    status: 'Funding',
  },
  {
    id: "prop-2",
    title: "Community Marketing Campaign",
    description: "Expand our reach through targeted social media and influencer marketing.",
    goal: 15000,
    funded: 15000,
    status: 'Completed',
  },
  {
    id: "prop-3",
    title: "Integrate with L2 Solution",
    description: "Reduce gas fees and improve transaction speed by integrating with Arbitrum.",
    goal: 75000,
    funded: 12000,
    status: 'Funding',
  },
];
