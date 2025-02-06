interface ActiveBetsProps {
    bets: any[]
  }
  
  export default function ActiveBets({ bets }: ActiveBetsProps) {
    return (
      <div>
        {bets.length === 0 ? (
          <p>No active bets</p>
        ) : (
          <ul className="space-y-4">
            {bets.map((bet, index) => (
              <li key={index} className="bg-white shadow rounded-lg p-4">
                <h3 className="font-semibold">Match ID: {bet.matchId}</h3>
                <p>Team: {bet.team}</p>
                <p>Amount: ${bet.amount.toFixed(2)}</p>
                <button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm">
                  Check Result
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
  
  