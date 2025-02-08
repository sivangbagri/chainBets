import type React from "react"
import { Link } from "react-router-dom"

const MatchListingPage: React.FC = () => {
  // Mock data for matches
  const matches = [
    { id: 1, teamA: "Team A", teamB: "Team B", tournament: "Tournament 1", startTime: "2025-03-01T12:00:00Z" },
    { id: 2, teamA: "Team C", teamB: "Team D", tournament: "Tournament 2", startTime: "2025-03-02T14:00:00Z" },
    // Add more mock matches here
  ]

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Available Matches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <Link
            key={match.id}
            to={`/match/${match.id}`}
            className="bg-white shadow-md rounded p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">
              {match.teamA} vs {match.teamB}
            </h2>
            <p className="text-gray-600">Tournament: {match.tournament}</p>
            <p className="text-gray-600">Start Time: {new Date(match.startTime).toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MatchListingPage

