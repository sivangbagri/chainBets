import type React from "react"
import { useParams } from "react-router-dom"

const MatchDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Mock data for a match
  const match = {
    id: Number.parseInt(id || "0"),
    teamA: "Team A",
    teamB: "Team B",
    tournament: "Tournament 1",
    startTime: "2025-03-01T12:00:00Z",
    totalBets: 1000,
    minBet: 10,
    maxBet: 1000,
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">
        {match.teamA} vs {match.teamB}
      </h1>
      <div className="bg-white shadow-md rounded p-6">
        <p className="mb-2">
          <strong>Tournament:</strong> {match.tournament}
        </p>
        <p className="mb-2">
          <strong>Start Time:</strong> {new Date(match.startTime).toLocaleString()}
        </p>
        <p className="mb-2">
          <strong>Total Bets:</strong> {match.totalBets} WETH
        </p>
        <p className="mb-4">
          <strong>Bet Limits:</strong> Min {match.minBet} WETH - Max {match.maxBet} WETH
        </p>

        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">Bet on {match.teamA}</button>
          <button className="bg-red-500 text-white px-6 py-2 rounded">Bet on {match.teamB}</button>
        </div>
      </div>
    </div>
  )
}

export default MatchDetailsPage

