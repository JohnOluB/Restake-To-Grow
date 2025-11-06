export interface VaultStat {
  label: string;
  value: number;
  usdValue: number;
  change: number;
  icon: React.ElementType;
}

export interface GrowthProposal {
  id: string;
  title: string;
  description: string;
  goal: number;
  funded: number;
  status: 'Funding' | 'Completed' | 'Expired';
}

export interface Activity {
  id: string;
  type: 'Deposit' | 'Withdraw' | 'Fund' | 'Claim';
  description: string;
  value: string;
  timestamp: string;
  txHash: string;
}
