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
  addresses: ContractAddresses; // Add addresses to props
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
        console.error('Error updating potential winnings:', error);
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
      const contracts = await service.getContracts();
      const amountBigInt = ethers.parseEther(amount);

      const tx = await contracts.bettingPool.placeBet(
        match.id,
        amountBigInt,
        prediction
      );
      await tx.wait();

      await refreshBalances();
    //   onBetPlaced();
      setAmount("");
    } catch (error) {
      console.error("Error placing bet:", error);
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
    <div className="p-6 border rounded-lg">
      <h3 className="text-xl font-bold mb-4">Place Your Bet</h3>
      <WETHApproval
        requiredAmount={amountBigInt}
        currentAllowance={wethAllowance}
        onApprovalComplete={refreshBalances}
        addresses={addresses}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select Team</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setPrediction(1)}
              className={`px-4 py-2 rounded ${
                prediction === 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              Team A
            </button>
            <button
              type="button"
              onClick={() => setPrediction(2)}
              className={`px-4 py-2 rounded ${
                prediction === 2 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              Team B{" "}
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-2">Bet Amount (WETH)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.000000000000000001"
            min={ethers.formatEther(match.minBet)}
            max={ethers.formatEther(match.maxBet)}
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
          />
          <div className="text-sm text-gray-500 mt-1">
            Balance: {ethers.formatEther(wethBalance)} WETH
          </div>
        </div>
        {amount && (
          <div className="p-4 bg-gray-50 rounded">
            <p>
              Potential Winnings: {ethers.formatEther(potentialWinnings)} WETH
            </p>
          </div>
        )}
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
          className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
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
  );
}
