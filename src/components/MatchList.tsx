"use client"

import { useState } from "react"
import MatchDetails from "./MatchDetails"

interface Match {
  id: number
  team1: string
  team2: string
  startTime: string
}

// Mock data for matches
const mockMatches: Match[] = [
  { id: 1, team1: "Team A", team2: "Team B", startTime: "2023-05-20T15:00:00Z" },
  { id: 2, team1: "Team C", team2: "Team D", startTime: "2023-05-21T18:00:00Z" },
  { id: 3, team1: "Team E", team2: "Team F", startTime: "2023-05-22T20:00:00Z" },
]

interface Bet {
  matchId: number
  team: string
  amount: number
}

interface MatchListProps {
  onPlaceBet: (bet: Bet) => void
}

export default function MatchList({ onPlaceBet }: MatchListProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  return (
    <div>
      {selectedMatch ? (
        <MatchDetails match={selectedMatch} onPlaceBet={onPlaceBet} onBack={() => setSelectedMatch(null)} />
      ) : (
        <ul className="space-y-4">
          {mockMatches.map((match) => (
            <li key={match.id} className="bg-white shadow rounded-lg p-4">
              <h3 className="font-semibold">
                {match.team1} vs {match.team2}
              </h3>
              <p className="text-sm text-gray-500">{new Date(match.startTime).toLocaleString()}</p>
              <button
                onClick={() => setSelectedMatch(match)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

