// MatchListingPage.tsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Match } from "../types/Contracts";
import { useContractService } from "../hooks/useContractService";
import { ContractAddresses } from "../types/Contracts";
import { Link } from "react-router";
import Loader from "../components/Loader";
import weth from "../assets/weth.png";
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

        setMatches(matches);
        return true;
      } catch (err) {
        console.error("Failed to load matches:", err);
      }
    };

    loadMatches();
  }, [service]);

  if (loading)
    return (
      <>
        <Loader />
      </>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {matches.length === 0 ? (
        <div>No matches available yet.</div>
      ) : (
        <div className="bg-black p-10 grid gap-4">
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
    <div className="bg-[#0B0F13] border border-[#1C2127] rounded-md p-6 hover:border-[#9dff2c] transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-[#1C2127] rounded-full border-2 size-10 border-dashed p-3"></div>
          <h3 className="text-white text-xl font-medium">{match.name}</h3>
        </div>
      </div>

      <div className="space-y-4 text-[#A1A1A6]">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h3a.75.75 0 0 0 0-1.5h-2.25V6Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">Start Time:</span>
          <span>
            {new Date(Number(match.startTime) * 1000).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 1.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM8.75 6a.75.75 0 0 0-1.5 0v2.5c0 .414.336.75.75.75h2a.75.75 0 0 0 0-1.5h-1.25V6Zm5.75 0a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h2a.75.75 0 0 0 0-1.5h-1.25V6Zm-3 5.25a.75.75 0 0 0-1.5 0v2.5c0 .414.336.75.75.75h2a.75.75 0 0 0 0-1.5H10V11.25Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">Min Bet:</span>

          <span>{ethers.formatEther(match.minBet)}</span>  <img className="size-8 " src={weth}/>
        </div>

        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 1.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM8.75 6a.75.75 0 0 0-1.5 0v2.5c0 .414.336.75.75.75h2a.75.75 0 0 0 0-1.5h-1.25V6Zm5.75 0a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h2a.75.75 0 0 0 0-1.5h-1.25V6Zm-3 5.25a.75.75 0 0 0-1.5 0v2.5c0 .414.336.75.75.75h2a.75.75 0 0 0 0-1.5H10V11.25Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">Max Bet:</span>
          <span>{ethers.formatEther(match.maxBet)}  </span> <img className="size-8 " src={weth}/>
        </div>
      </div>

      <Link
        to={`/match/${match.id}`}
        className="mt-6 block w-full text-center py-3 px-6 bg-[#1C2127] text-white rounded-lg hover:bg-[#2A3038] transition-colors duration-200"
      >
        View Details
      </Link>
    </div>
  );
};
