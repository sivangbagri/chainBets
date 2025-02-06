"use client";

import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import MatchList from "./components/MatchList";
import ActiveBets from "./components/ActiveBets";

interface Bet {
  matchId: number;
  team: string;
  amount: number;
}

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeBets, setActiveBets] = useState<Bet[]>([]);

  const connectWallet = () => {
    // :: todo
    setWalletConnected(true);
  };

  const addBet = (bet: Bet) => {
    setActiveBets([...activeBets, bet]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Esports Betting</h1>
      </header>
      <main className="container mx-auto p-4">
        {!walletConnected ? (
          <WalletConnect onConnect={connectWallet} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Matches</h2>
              <MatchList onPlaceBet={addBet} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Bets</h2>
              <ActiveBets bets={activeBets} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
