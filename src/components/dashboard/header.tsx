"use client";

import { useState } from "react";
import { Rocket, Wallet, ChevronDown, LogOut, Network, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/contexts/app-context";
import { cn } from "@/lib/utils";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-muted-foreground"
    )}>
      {children}
    </Link>
  );
};


export function AppHeader() {
  const { isMock, setIsMock } = useAppContext();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const userAddress = "0x1234...AbCd";
  const currentNetwork = "Ethereum";

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const WalletButton = () => {
    if (isConnecting) {
      return (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </Button>
      );
    }

    if (isConnected) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Wallet className="mr-2 h-4 w-4" />
              <span>{userAddress}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Network className="mr-2 h-4 w-4" />
              <span>{currentNetwork}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDisconnect}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button onClick={handleConnect}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">RestakeToGrow</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/proposals">Proposals</NavLink>
            <NavLink href="/docs">Docs</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="dev-mode"
              checked={isMock}
              onCheckedChange={setIsMock}
            />
            <Label htmlFor="dev-mode">Dev Mode</Label>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
