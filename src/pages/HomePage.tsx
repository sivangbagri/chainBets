import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContractService } from "../hooks/useContractService";
import { ContractAddresses, Match } from "../types/Contracts";
import { SmallCard } from "../components/BettingInterface/SmallCard";
export const HomePage: React.FC<{ addresses: ContractAddresses }> = ({
  addresses,
}) => {
  const { service } = useContractService(addresses);
  const [ongoingMatches, setOngoingMatches] = useState<Match[]>([]);

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
          setOngoingMatches([]); // Important: Set matches to an empty array
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

        const ongoing = matches.filter(
          (match) =>
            match &&
            match.startTime &&
            match.endTime > currentTime &&
            match.startTime < currentTime
        );

        setOngoingMatches(ongoing);
        return true;
      } catch (err) {
        console.error("Failed to load matches:", err);
      }
    };
    loadMatches();
  }, [service]);
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to ChainBets
        </h1>
        <p className="text-[#A1A1A6] text-xl mb-12">
          Permissionless Esports Betting platform on Ancient8 Super Gaming Chain
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8 hover:border-[#2A2D2F] transition-all">
            <h2 className="text-2xl font-bold text-[#C5FF32] mb-6">
              Ongoing Matches
            </h2>
            <div className="bg-[#0F1418] rounded-lg p-1 text-[#A1A1A6]">
              {ongoingMatches.length === 0 ? (
                <div>No matches available yet.</div>
              ) : (
                <div className="bg-black p-5 grid gap-4">
                  {ongoingMatches.slice(0, 2).map((match) => (
                    <SmallCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Guide section */}
          <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8 hover:border-[#2A2D2F] transition-all">
            <h2 className="text-2xl font-bold text-[#C5FF32] mb-6">
              User Guide
            </h2>
            <div className="bg-[#0F1418] rounded-lg p-4 text-[#A1A1A6] space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#C5FF32] text-black font-bold">
                  1
                </div>
                <p>
                  Install MetaMask wallet extension from the official website.{" "}
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#C5FF32] text-black font-bold">
                  2
                </div>
                <p>
                  Switch to Ancient8 Super Gaming Chain network in MetaMask.{" "}
                  <a
                    className="text-[#C5FF32]"
                    href="https://docs.ancient8.gg/using-ancient8-chain/adding-network-to-metamask"
                  >
                    How ?{" "}
                  </a>{" "}
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#C5FF32] text-black font-bold">
                  3
                </div>
                <p>
                  Ensure you have sufficient WETH tokens in your wallet for
                  betting.
                </p>
              </div>
              <Link
                to="/matches"
                className="mt-8 inline-flex px-8 py-4 bg-[#C5FF32] text-black rounded-lg font-medium hover:bg-[#B2E62D] transition-all duration-200"
              >
                View All Matches
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
