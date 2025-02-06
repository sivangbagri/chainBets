"use client";

import { useState, type FormEvent } from "react";

interface Match {
  id: number;
  team1: string;
  team2: string;
  startTime: string;
}

interface Bet {
  matchId: number;
  team: string;
  amount: number;
}

interface PlaceBetProps {
  match: Match;
  onPlaceBet: (bet: Omit<Bet, "matchId">) => void;
  onCancel: () => void;
}

export default function PlaceBet({
  match,
  onPlaceBet,
  onCancel,
}: PlaceBetProps) {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPlaceBet({ team: selectedTeam, amount: Number.parseFloat(amount) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Select Team:</label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a team</option>
          <option value={match.team1}>{match.team1}</option>
          <option value={match.team2}>{match.team2}</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Bet Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Place Bet
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
