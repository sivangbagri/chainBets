import React from 'react';
import { useContractService } from '../hooks/useContractService';
import { useUserBets } from '../hooks/useUserBets';
import { formatEther } from 'ethers';
import { ContractAddresses } from '../types/Contracts';
import { useState } from 'react';
import Loader from '../components/Loader';
 
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

  if (serviceLoading || betsLoading) return <><Loader/></>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-black w-full h-screen">
    <h1 className="text-2xl font-bold text-white mb-8">My Bets</h1>
    
    <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl overflow-hidden">
      <table className="min-w-full divide-y divide-[#1C2127]">
        <thead className="bg-[#0F1418]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1A6]">MATCH</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1A6]">BET AMOUNT</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1A6]">PREDICTION</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1A6]">STATUS</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#A1A1A6]">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1C2127]">
          {bets.map((bet) => {
            const status = getBetStatus(bet);
            return (
              <tr key={bet.matchId} className="hover:bg-[#0F1418] transition-colors">
                <td className="px-6 py-4 text-sm text-white">{bet.matchName}</td>
                <td className=" flex px-6 py-4 text-sm text-[#C5FF32]">
                  {formatEther(bet.amount)} WETH
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  Team {bet.prediction === 1 ? 'A' : 'B'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${status.color === 'bg-green-200' ? 'bg-[#1C2127] text-green-500' : 
                      status.color === 'bg-yellow-200' ? 'bg-[#1C2127] text-[#FFB800]' :
                      'bg-[#1C2127] text-red-500'}`}>
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {bet.isFinalized && bet.winner === bet.prediction && !bet.claimed && (
                    <button
                      onClick={() => handleClaim(bet.matchId)}
                      disabled={claimingMatchId === bet.matchId}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer
                        ${claimingMatchId === bet.matchId 
                          ? 'bg-[#1C2127] text-[#A1A1A6] cursor-not-allowed'
                          : 'bg-[#C5FF32] text-black hover:bg-[#B2E62D]'}`}
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