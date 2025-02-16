import React, { useState, useEffect } from "react";
import { ethers, formatEther } from 'ethers';
import { Match } from "../types/Contracts";
import { useContractService } from "../hooks/useContractService";
import { ContractAddresses } from "../types/Contracts";
import { useParams } from "react-router-dom";
import { BettingForm } from "../components/BettingInterface/BettingForm";
interface MatchDetailsProp {
  addresses: ContractAddresses;
}

const MatchDetailsPage: React.FC<MatchDetailsProp> = ({ addresses }) => {
  const [currentMatch, setCurrentMatch] = useState<Match>({
    id: 0,
    name: "",
    startTime: BigInt(0),
    endTime: BigInt(0),
    minBet: BigInt(0),
    maxBet: BigInt(0),
    isFinalized: false,
    winner: 0,
    totalPoolA: BigInt(0),
    totalPoolB: BigInt(0),
  });

  const { service, loading, error } = useContractService(addresses);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getMatchDetails = async () => {
      try {
        const contracts = await service?.getContracts();
        const match = await contracts?.bettingPool.getMatch(id);
        setCurrentMatch(match)
        // console.log(match.name)
        
        
      } catch (e) {
        console.log("Match details ", e);
      }
    };
    console.log("match array",currentMatch)
    getMatchDetails();
  }, [id,service]);
  // const match = {
  //   id: Number.parseInt(id || "0"),
  //   teamA: "Team A",
  //   teamB: "Team B",
  //   tournament: "Tournament 1",
  //   startTime: "2025-03-01T12:00:00Z",
  //   totalBets: 1000,
  //   minBet: 10,
  //   maxBet: 1000,
  // };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">
        
        TeamA v TeamB
      </h1>
      <div className="bg-white shadow-md rounded p-6">
        <p className="mb-2">
          <strong>Tournament:</strong> {currentMatch?.name}
        </p>
        <p className="mb-2">
          <strong>Start Time:</strong>{" "}
          {new Date(Number(currentMatch?.startTime)*1000).toLocaleString()}
        </p>
        {/* <p className="mb-2">
          <strong>Total Bets:</strong> {currentMatch?.totalBets} WETH
        </p> */}
        <p className="mb-4">
          <strong>Bet Limits:</strong> Min {currentMatch?.minBet ? ethers.formatEther(currentMatch.minBet) : "Loading..."} WETH - Max{" "}
          {currentMatch?.maxBet ? ethers.formatEther(currentMatch.maxBet) : "Loading..."} WETH
        </p>

        <div className="flex space-x-4">
           
          {currentMatch && <BettingForm match={currentMatch} addresses={addresses}/>}
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsPage;
