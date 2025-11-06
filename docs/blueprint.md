# **App Name**: RestakeToGrow

## Core Features:

- Vault Stats Overview: Display key metrics such as Total Value Locked (TVL), user deposited amount, total yield generated, and claimable yield, with optional USD equivalents and 24h change percentage.
- Deposit/Withdraw Interface: Tabbed interface for depositing and withdrawing assets from the vault, including input validation, balance display, approval workflow, and transaction feedback.
- GrowthPool Dashboard: Interface for viewing and managing GrowthPool proposals, including proposal details, funding status, and admin controls for funding proposals.
- Yield Split Visualization: Visual representation of the 70/30 yield split between the treasury and the GrowthPool, using a donut chart or horizontal bar.
- Wallet Connection: Enable users to connect their wallets, switch networks, and view account information in the navigation bar, with network guard to ensure correct network usage.
- Transaction Management: Implement transaction error handling, loading states, and notifications for deposit, withdraw, and fund proposal actions.
- Mock Data Toggle: Implement a development mode toggle in the UI to switch between using mock data and real contract calls for UI development and testing.

## Style Guidelines:

- Primary color: Purple (#8B5CF6) for a DeFi aesthetic and strong visual presence.
- Background color: Dark blue-gray (#0F172A) for a modern and sophisticated feel.
- Accent color: Green (#10B981) to indicate success and positive actions.
- Body and headline font: 'Inter' for a modern and neutral aesthetic; a sans-serif providing great readability for both headlines and body text.
- Card-based layout with glassmorphism effects for a modern and clean user interface.
- Subtle animations and transitions to enhance user experience, including hover effects, loading states, and transaction feedback.
- Use lucide-react icons for clear and consistent visual representation of data and actions.