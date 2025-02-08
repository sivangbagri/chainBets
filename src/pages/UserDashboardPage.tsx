import type React from "react"

const UserDashboardPage: React.FC = () => {
  // Mock data for user bets
  const userBets = [
    { id: 1, matchId: 1, teamA: "Team A", teamB: "Team B", betAmount: 100, prediction: "Team A", status: "pending" },
    { id: 2, matchId: 2, teamA: "Team C", teamB: "Team D", betAmount: 50, prediction: "Team D", status: "won" },
    // Add more mock bets here
  ]

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">My Bets</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Match</th>
              <th className="py-3 px-6 text-left">Bet Amount</th>
              <th className="py-3 px-6 text-left">Prediction</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {userBets.map((bet) => (
              <tr key={bet.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">
                    {bet.teamA} vs {bet.teamB}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{bet.betAmount} WETH</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{bet.prediction}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      bet.status === "pending"
                        ? "bg-yellow-200 text-yellow-600"
                        : bet.status === "won"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                    }`}
                  >
                    {bet.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserDashboardPage

