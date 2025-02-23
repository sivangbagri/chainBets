// components/BettingInterface/BettingForm.tsx
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useBettingCalculations } from "../../hooks/useBettingCalculations";
import { useContractService } from "../../hooks/useContractService";
import { Match } from "../../types/Contracts";
import { WETHApproval } from "./WETHApproval";
import { ContractAddresses } from "../../types/Contracts";

interface BettingFormProps {
  match: Match;
  onBetPlaced?: () => void;
  addresses: ContractAddresses;  
}

export function BettingForm({
  match,
  onBetPlaced,
  addresses,
}: BettingFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [prediction, setPrediction] = useState<1 | 2>(1);
  const [potentialWinnings, setPotentialWinnings] = useState<bigint>(BigInt(0));
  const [placingBet, setPlacingBet] = useState(false);
  // const [validationStatus, setValidationStatus] = useState<{
  //   isValid: boolean;
  //   message: string;
  // }>({ isValid: true, message: "" });
  // const [diagnosticReport, setDiagnosticReport] = useState("");

  const {
    wethBalance,
    wethAllowance,
    calculatePotentialWinnings,
    refreshBalances,
  } = useBettingCalculations(match.id, addresses);

  const {
    service,
    loading: serviceLoading,
    error,
  } = useContractService(addresses);

  useEffect(() => {
    const updatePotentialWinnings = async () => {
      try {
        if (amount) {
          const amountBigInt = ethers.parseEther(amount);
          const winnings = await calculatePotentialWinnings(
            amountBigInt,
            prediction
          );
          setPotentialWinnings(winnings ?? BigInt(0));
        } else {
          setPotentialWinnings(BigInt(0));
        }
      } catch (error) {
        console.error("Error updating potential winnings:", error);
        setPotentialWinnings(BigInt(0));
      }
    };
    updatePotentialWinnings();
  }, [amount, prediction, calculatePotentialWinnings]);

   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !service) return;

    try {
      setPlacingBet(true);
      // await debugContractCall();

      const amountBigInt = ethers.parseEther(amount);

      const contracts = await service.getContracts();
      if (!contracts) {
        throw new Error("Contracts are not available");
      }

      try {
        const txV = await contracts.bettingPool.validateBetParameters(
          match.id,
          amountBigInt,
          prediction,
          {
            gasLimit: 500000, // Explicit gas limit
          }
        );

        console.log(txV);
      } catch (e: any) {
        console.log("Validate errpr ", e);
      }

      const tx = await contracts.bettingPool.placeBet(
        match.id,
        amountBigInt,
        prediction
      );

      console.log("Transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      await refreshBalances();
      if (onBetPlaced) {
        onBetPlaced();
      }
      setAmount("");
    } catch (error: any) {
      console.error("Detailed error:", error);
        throw error;
    } finally {
      setPlacingBet(false);
    }
  };
  const amountBigInt = amount ? ethers.parseEther(amount) : BigInt(0);
  const insufficientBalance = amountBigInt > wethBalance;
  const belowMinBet = amountBigInt < match.minBet;
  const aboveMaxBet = amountBigInt > match.maxBet;

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">
          Error connecting to wallet: {error.message}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Place Your Bet</h3>

        <WETHApproval
          requiredAmount={amountBigInt}
          currentAllowance={wethAllowance}
          onApprovalComplete={refreshBalances}
          addresses={addresses}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Selection */}
          <div>
            <label className="block text-[#A1A1A6] mb-3">Select Team</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setPrediction(1)}
                className={`px-6 py-3 rounded-lg border transition-all duration-200 ${
                  prediction === 1
                    ? "bg-[#C5FF32] border-[#C5FF32] text-black font-medium"
                    : "bg-transparent border-[#1C2127] text-[#A1A1A6] hover:border-[#C5FF32]"
                }`}
              >
                Team A
              </button>
              <button
                type="button"
                onClick={() => setPrediction(2)}
                className={`px-6 py-3 rounded-lg border transition-all duration-200 ${
                  prediction === 2
                    ? "bg-[#C5FF32] border-[#C5FF32] text-black font-medium"
                    : "bg-transparent border-[#1C2127] text-[#A1A1A6] hover:border-[#C5FF32]"
                }`}
              >
                Team B
              </button>
            </div>
          </div>

          {/* Bet Amount Input */}
          <div>
            <label className="block text-[#A1A1A6] mb-3">
              Bet Amount (WETH)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.000000000000000001"
              min={ethers.formatEther(match.minBet)}
              max={ethers.formatEther(match.maxBet)}
              className="w-full p-4 bg-[#0F1418] border border-[#1C2127] rounded-lg text-white focus:border-[#C5FF32] focus:outline-none transition-colors"
              placeholder="Enter amount"
            />
            <div className="text-sm text-[#A1A1A6] mt-2">
              Balance: {ethers.formatEther(wethBalance)} WETH
            </div>
          </div>

          {/* Potential Winnings */}
          {amount && (
            <div className="p-4 bg-[#0F1418] border border-[#1C2127] rounded-lg">
              <p className="text-[#C5FF32]">
                Potential Winnings: {ethers.formatEther(potentialWinnings)} WETH
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              placingBet ||
              serviceLoading ||
              !amount ||
              insufficientBalance ||
              belowMinBet ||
              aboveMaxBet ||
              amountBigInt > wethAllowance
            }
            className={`w-full py-4 rounded-lg font-medium transition-all duration-200
        ${
          !placingBet &&
          !serviceLoading &&
          amount &&
          !insufficientBalance &&
          !belowMinBet &&
          !aboveMaxBet &&
          amountBigInt <= wethAllowance
            ? "bg-[#C5FF32] text-black hover:bg-[#B2E62D]"
            : "bg-[#1C2127] text-[#A1A1A6] cursor-not-allowed"
        }`}
          >
            {placingBet
              ? "Placing Bet..."
              : serviceLoading
              ? "Connecting..."
              : insufficientBalance
              ? "Insufficient Balance"
              : belowMinBet
              ? `Minimum bet is ${ethers.formatEther(match.minBet)} WETH`
              : aboveMaxBet
              ? `Maximum bet is ${ethers.formatEther(match.maxBet)} WETH`
              : "Place Bet"}
          </button>
        </form>
      </div>
    </>
  );
}
