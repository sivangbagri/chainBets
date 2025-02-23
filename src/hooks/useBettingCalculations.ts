// hooks/useBettingCalculations.ts
import { useState, useEffect } from "react";
import { useContractService } from "./useContractService";
import { ContractAddresses } from "../types/Contracts";
export function useBettingCalculations(
  matchId: number,
  addresses: ContractAddresses
) {
  const { service } = useContractService(addresses);
  const [wethBalance, setWethBalance] = useState<bigint>(BigInt(0));
  const [wethAllowance, setWethAllowance] = useState<bigint>(BigInt(0));

  const loadBalanceAndAllowance = async () => {
    try {
      if (!service) {
        console.error("Service is not available");
        return;
      }
      const contracts = await service.getContracts();
      const address = await service.getSigner?.getAddress();
      console.log("Signer address from betting calc ", address);
      const [balance, allowance] = await Promise.all([
        contracts.wethToken.balanceOf(address),
        contracts.wethToken.allowance(address, addresses.bettingPool),
      ]);
      setWethBalance(balance);
      setWethAllowance(allowance);
    } catch (error) {
      console.error("Error loading balance:", error);
    }
  };

  const calculatePotentialWinnings = async (
    amount: bigint,
    prediction: 1 | 2
  ) => {
    try {
      const contracts = await service?.getContracts();
      const winnings = await contracts?.bettingPool.calculatePotentialWinnings(
        matchId,
        amount,
        prediction
      );
      return winnings;
    } catch (error) {
      console.error("Error calculating winnings:", error);
      return BigInt(0);
    }
  };

  useEffect(() => {
    console.log("wethBalance ", wethBalance);
    loadBalanceAndAllowance();
  }, [matchId]);

  return {
    wethBalance,
    wethAllowance,
    calculatePotentialWinnings,
    refreshBalances: loadBalanceAndAllowance,
  };
}
