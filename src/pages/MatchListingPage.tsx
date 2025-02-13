// MatchListingPage.tsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Match } from "../types/Contracts";
import { useContractService } from "../hooks/useContractService";
import { ContractAddresses } from "../types/Contracts";
interface MatchListProps {
  addresses: ContractAddresses;
  onMatchSelect?: (matchId: number) => void;
}

export const MatchList: React.FC<MatchListProps> = ({
  addresses,
  onMatchSelect,
}) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const { service, loading, error } = useContractService(addresses);

  useEffect(() => {
    const loadMatches = async () => {
      if (!service) {
        console.error("Service is not available");
        return;
      }

      try {
        const contracts = await service.getContracts();
        if (!contracts?.bettingPool) {
          console.error("Failed to load contracts");
          return;
        }

        const nextMatchId = await contracts.bettingPool.getNextMatchId();
        if (nextMatchId <= 1) {
          console.log("No matches created yet.");
          setMatches([]); // Important: Set matches to an empty array
          return; // Or display a message to the user
        }
        if (nextMatchId == null) {
          console.error("Failed to load next match ID");
          return;
        }
        console.log("match id: ", nextMatchId);

        const currentTime = BigInt(Math.floor(Date.now() / 1000));

        const matchPromises = [...Array(Number(nextMatchId) - 1)].map((_, i) =>
          contracts.bettingPool.getMatch(i + 1)
        );
        const matches = await Promise.all(matchPromises);
        if (!matches) {
          console.error("Failed to load matches");
          return;
        }

        const activeMatches = matches.filter(
          (match) => match && match.startTime && match.startTime > currentTime
        );

        setMatches(activeMatches);
        return true;
      } catch (err) {
        console.error("Failed to load matches:", err);
      }
    };

    const fetchMatch = async () => {
      if (loading) {
        return <div>Loading contracts...</div>;
      }

      if (error) {
        console.log(error);
        return;
      }

      if (!service) return;  

      try {
        const contracts = await service.getContracts();
        console.log("Contract Address:", contracts);
        if (typeof contracts.bettingPool.nextMatchId !== 'function') {
          console.error("nextMatchId method is not available");
          return;
        }
        const nextMatchId = await contracts.bettingPool.getNextMatchId();
        console.log("Next Match ID:", Number(nextMatchId));
        // const match = await contracts.bettingPool.getMatch(1);
        // console.log("Match Data:", match);
         
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
     loadMatches();
  }, [service]);

  if (loading) return <div>Loading matches...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {matches.length === 0 ? (
        <div>No matches available yet.</div>
      ) : (
        <div className="grid gap-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} onSelect={onMatchSelect} />
          ))}
        </div>
      )}
    </>
  );
};
interface MatchCardProps {
  match: Match;
  onSelect?: (matchId: number) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onSelect }) => {
  return (
    <div className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{match.name}</h3>
      <div className="mt-2 space-y-1">
        <p>
          Start: {new Date(Number(match.startTime) * 1000).toLocaleString()}
        </p>
        <p>Min Bet: {ethers.formatEther(match.minBet)} WETH</p>
        <p>Max Bet: {ethers.formatEther(match.maxBet)} WETH</p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => onSelect?.(match.id)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Place Bet
        </button>
      </div>
    </div>
  );
};
export default MatchList;
