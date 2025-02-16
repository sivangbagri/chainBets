import React from 'react';
import { useContractService } from '../hooks/useContractService';
import { useUserBets } from '../hooks/useUserBets';
import { formatEther } from 'ethers';
import { ContractAddresses } from '../types/Contracts';
import { useState } from 'react';
  
export const UserDashboardPage:React.FC<{addresses:ContractAddresses}>=({ addresses } )=> {
  const { service, loading: serviceLoading } = useContractService(addresses);
  const { bets, loading: betsLoading, error } = useUserBets(service);
  const [claimingMatchId, setClaimingMatchId] = useState<number | null>(null);

  const handleClaim = async (matchId: number) => {
    if (!service) return;

    try {
      setClaimingMatchId(matchId);
      const contracts = await service.getContracts();
      const tx = await contracts.bettingPool.claimWinnings(matchId);
      await tx.wait();
      
      // Refresh bets after successful claim
      window.location.reload();
    } catch (err) {
      console.error("Failed to claim winnings:", err);
      alert("Failed to claim winnings. Please try again.");
    } finally {
      setClaimingMatchId(null);
    }
  };  

  const getBetStatus = (bet: typeof bets[0]) => {
    if (!bet.isFinalized) return { label: "pending", color: "bg-yellow-200" };
    if (bet.claimed) return { label: "claimed", color: "bg-gray-200" };
    if (bet.winner === bet.prediction) return { label: "won", color: "bg-green-200" };
    return { label: "lost", color: "bg-red-200" };
  };

  if (serviceLoading || betsLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Bets</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">MATCH</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">BET AMOUNT</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">PREDICTION</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">STATUS</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bets.map((bet) => {
              const status = getBetStatus(bet);
              return (
                <tr key={bet.matchId}>
                  <td className="px-6 py-4 text-sm text-gray-900">{bet.matchName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatEther(bet.amount)} WETH
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Team {bet.prediction === 1 ? 'A' : 'B'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`${status.color} px-2 py-1 rounded-full text-xs`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {bet.isFinalized && bet.winner === bet.prediction && !bet.claimed && (
                      <button
                        onClick={() => handleClaim(bet.matchId)}
                        disabled={claimingMatchId === bet.matchId}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                      >
                        {claimingMatchId === bet.matchId ? 'Claiming...' : 'Claim'}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}