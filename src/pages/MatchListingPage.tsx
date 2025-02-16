// MatchListingPage.tsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Match } from "../types/Contracts";
import { useContractService } from "../hooks/useContractService";
import { ContractAddresses } from "../types/Contracts";
import { Link } from "react-router";
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

    // const fetchMatch = async () => {
    //   if (loading) {
    //     return <div>Loading contracts...</div>;
    //   }

    //   if (error) {
    //     console.log(error);
    //     return;
    //   }

    //   if (!service) return;

    //   try {
    //     const contracts = await service.getContracts();
    //     console.log("Contract Address:", contracts);
    //     if (typeof contracts.bettingPool.nextMatchId !== 'function') {
    //       console.error("nextMatchId method is not available");
    //       return;
    //     }
    //     const nextMatchId = await contracts.bettingPool.getNextMatchId();
    //     console.log("Next Match ID:", Number(nextMatchId));
    //     // const match = await contracts.bettingPool.getMatch(1);
    //     // console.log("Match Data:", match);

    //   } catch (error) {
    //     console.error("Error fetching match:", error);
    //   }
    // };

    // fetchMatch();
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
    <div className="m-5">
      <div className="p-6 border rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12" />
          <h3 className="text-xl font-semibold text-gray-800">{match.name}</h3>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-2">
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
            <p className="text-gray-700">
              Start: {new Date(Number(match.startTime) * 1000).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
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
            <p className="text-gray-700">
              Min Bet: {ethers.formatEther(match.minBet)} WETH
            </p>
          </div>
          <div className="flex items-center space-x-2">
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
            <p className="text-gray-700">
              Max Bet: {ethers.formatEther(match.maxBet)} WETH
            </p>
          </div>
        </div>
        <div className="mt-6">
           
          <Link
            // onClick={() => onSelect?.(match.id)}
            to={`/match/${match.id}`}
            className="p-3 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-semibold transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
