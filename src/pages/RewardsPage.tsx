import type React from "react"

const RewardsPage: React.FC = () => {
  // Mock data for user rewards and leaderboard
  const userRewards = [
    { id: 1, type: "Betting Bonus", amount: 100, date: "2025-03-01" },
    { id: 2, type: "Referral Reward", amount: 50, date: "2025-03-02" },
    // Add more mock rewards here
  ]

  const leaderboard = [
    { rank: 1, username: "user1", points: 1000 },
    { rank: 2, username: "user2", points: 950 },
    { rank: 3, username: "user3", points: 900 },
    // Add more mock leaderboard entries here
  ]

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Rewards & Community Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Your Rewards</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {userRewards.map((reward) => (
                <tr key={reward.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className="font-medium">{reward.type}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{reward.amount} WETH</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{reward.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Rank</th>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Points</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className="font-medium">{entry.rank}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{entry.username}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{entry.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RewardsPage

