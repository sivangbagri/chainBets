import type React from "react"
import { useParams, Link } from "react-router-dom"

const TournamentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Mock data for a tournament
  const tournament = {
    id: Number.parseInt(id || "0"),
    name: "Tournament 1",
    matches: [
      { id: 1, teamA: "Team A", teamB: "Team B", startTime: "2025-03-01T12:00:00Z" },
      { id: 2, teamA: "Team C", teamB: "Team D", startTime: "2025-03-02T14:00:00Z" },
      // Add more mock matches here
    ],
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{tournament.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournament.matches.map((match) => (
          <Link
            key={match.id}
            to={`/match/${match.id}`}
            className="bg-white shadow-md rounded p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">
              {match.teamA} vs {match.teamB}
            </h2>
            <p className="text-gray-600">Start Time: {new Date(match.startTime).toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TournamentPage

