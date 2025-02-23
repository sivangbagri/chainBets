import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Match } from "../types/Contracts";
import { useContractService } from "../hooks/useContractService";
import { ContractAddresses } from "../types/Contracts";
import { useParams } from "react-router-dom";
import { BettingForm } from "../components/BettingInterface/BettingForm";
import Loader from "../components/Loader";
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

  const { service, loading } = useContractService(addresses);
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
 
  if (loading) return <><Loader/></>;
  return (
    <div className="  w-full px-6 py-12 text-white bg-black">
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">
          TeamA <span className="text-[#A1A1A6]">vs</span> TeamB
        </h1>
        <p className="text-[#C5FF32]">{currentMatch?.name}</p>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#0B0F13] border border-[#1C2127] rounded-2xl p-8">
        {/* Match Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <div>
              <p className="text-[#A1A1A6] text-sm mb-2">Start Time</p>
              <p className="text-white">
                {new Date(Number(currentMatch?.startTime)*1000).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[#A1A1A6] text-sm mb-2">End Time</p>
              <p className="text-white">
                {new Date(Number(currentMatch?.endTime)*1000).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[#A1A1A6] text-sm mb-2">Minimum Bet</p>
              <p className="text-[#C5FF32]">
                {currentMatch?.minBet ? ethers.formatEther(currentMatch.minBet) : "Loading..."} WETH
              </p>
            </div>
            <div>
              <p className="text-[#A1A1A6] text-sm mb-2">Maximum Bet</p>
              <p className="text-[#C5FF32]">
                {currentMatch?.maxBet ? ethers.formatEther(currentMatch.maxBet) : "Loading..."} WETH
              </p>
            </div>
          </div>
        </div>

        {/* Pool Statistics */}
        {/* <div className="bg-[#0F1418] rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#A1A1A6] text-sm mb-2">Pool A Total</p>
              <p className="text-xl font-medium">
                {ethers.formatEther(currentMatch.totalPoolA)} WETH
              </p>
            </div>
            <div>
              <p className="text-[#A1A1A6] text-sm mb-2">Pool B Total</p>
              <p className="text-xl font-medium">
                {ethers.formatEther(currentMatch.totalPoolB)} WETH
              </p>
            </div>
          </div>
        </div> */}

        {/* Betting Form Section */}
        <div className="border-t border-[#1C2127] pt-8">
          <h2 className="text-xl font-bold mb-6">Place Your Bet</h2>
          {currentMatch && <BettingForm match={currentMatch} addresses={addresses}/>}
        </div>
      </div>
    </div>
  </div>
  );
};

export default MatchDetailsPage;
