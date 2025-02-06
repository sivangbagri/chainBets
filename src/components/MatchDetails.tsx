"use client"

import { useState } from "react"
import PlaceBet from "./PlaceBet"

interface Match {
  id: number
  team1: string
  team2: string
  startTime: string
}

interface Bet {
  matchId: number
  team: string
  amount: number
}

interface MatchDetailsProps {
  match: Match
  onPlaceBet: (bet: Bet) => void
  onBack: () => void
}

export default function MatchDetails({ match, onPlaceBet, onBack }: MatchDetailsProps) {
  const [showPlaceBet, setShowPlaceBet] = useState(false)

  const handlePlaceBet = (betDetails: Omit<Bet, "matchId">) => {
    onPlaceBet({ ...betDetails, matchId: match.id })
    setShowPlaceBet(false)
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:text-blue-600">
        &larr; Back to matches
      </button>
      <h2 className="text-xl font-semibold mb-2">
        {match.team1} vs {match.team2}
      </h2>
      <p className="text-gray-500 mb-4">{new Date(match.startTime).toLocaleString()}</p>
      {showPlaceBet ? (
        <PlaceBet match={match} onPlaceBet={handlePlaceBet} onCancel={() => setShowPlaceBet(false)} />
      ) : (
        <button
          onClick={() => setShowPlaceBet(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Place Bet
        </button>
      )}
    </div>
  )
}

    