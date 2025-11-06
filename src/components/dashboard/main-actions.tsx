"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const GlassCard = (props: React.ComponentProps<typeof Card>) => (
    <Card {...props} className="border-border/50 bg-card/60 backdrop-blur-sm" />
);

export function MainActions() {
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  // Mock data
  const walletBalance = 1250.5;
  const depositedBalance = 5000;

  const handleAction = (
    action: 'approve' | 'deposit' | 'withdraw',
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    successStateSetter?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(true);
    setTimeout(() => {
      setter(false);
      if (successStateSetter) {
        successStateSetter(true);
      }
      toast({
        title: `Transaction Successful`,
        description: `Your ${action} of ${action === 'withdraw' ? withdrawAmount : depositAmount} ASSET was successful.`,
        variant: "default",
      });
      if(action === 'deposit') setDepositAmount("");
      if(action === 'withdraw') setWithdrawAmount("");
    }, 2000);
  };


  return (
    <GlassCard>
      <CardHeader>
        <CardTitle>Vault Actions</CardTitle>
        <CardDescription>
          Deposit your assets to start earning yield or withdraw your staked assets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deposit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">
              <ArrowDownToLine className="mr-2 h-4 w-4" /> Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw">
              <ArrowUpFromLine className="mr-2 h-4 w-4" /> Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="deposit-amount">Amount</label>
                <span className="text-muted-foreground">Balance: {walletBalance.toFixed(2)} ASSET</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="deposit-amount"
                  placeholder="0.0"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <Button variant="outline" onClick={() => setDepositAmount(walletBalance.toString())}>Max</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                disabled={isApproving || isApproved}
                onClick={() => handleAction('approve', setIsApproving, setIsApproved)}
              >
                {isApproving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isApproved ? 'Approved' : '1. Approve'}
              </Button>
              <Button
                disabled={!isApproved || isDepositing || !depositAmount}
                onClick={() => handleAction('deposit', setIsDepositing)}
              >
                {isDepositing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                2. Deposit
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="withdraw" className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="withdraw-amount">Amount</label>
                <span className="text-muted-foreground">Deposited: {depositedBalance.toFixed(2)} ASSET</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="withdraw-amount"
                  placeholder="0.0"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <Button variant="outline" onClick={() => setWithdrawAmount(depositedBalance.toString())}>Max</Button>
              </div>
            </div>
            <Button
              className="w-full"
              disabled={isWithdrawing || !withdrawAmount}
              onClick={() => handleAction('withdraw', setIsWithdrawing)}
            >
              {isWithdrawing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Withdraw
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </GlassCard>
  );
}
