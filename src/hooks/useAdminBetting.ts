import { useState } from "react";
import { useContractService } from "./useContractService";
 import { ContractAddresses } from "../types/Contracts";
import { AdminMatch } from "../types/Admin";
export function useAdminBetting(addresses: ContractAddresses) {
  const { service} = useContractService(addresses);
  const [loading, setLoading] = useState(false);

  const createMatch = async (match: AdminMatch) => {
    if (!service) return;

    try {
        setLoading(true);
      const contracts = await service.getContracts();

      const tx = await contracts.bettingPool.createMatch(
        match.name,
        match.startTime,
        match.endTime,
        match.minBet,
        match.maxBet
      );
      await tx.wait();

      return true;
    } catch (error) {
      console.error("Error creating match:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const finalizeMatch = async (matchId: number, winner: 1 | 2) => {
    if (!service) return;

    try {
      setLoading(true);
      const contracts = await service.getContracts();

      const tx = await contracts.bettingPool.finalizeMatch(matchId, winner);
      await tx.wait();

      return true;
    } catch (error) {
      console.error("Error finalizing match:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const setProtocolFee = async (newFee: number) => {
    if (!service) return;

    try {
      setLoading(true);
      const contracts = await service.getContracts();

      const tx = await contracts.bettingPool.setProtocolFee(newFee);
      await tx.wait();

      return true;
    } catch (error) {
      console.error("Error setting protocol fee:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const emergencyWithdraw = async (tokenAddress: string) => {
    if (!service) return;

    try {
      setLoading(true);
      const contracts = await service.getContracts();

      const tx = await contracts.bettingPool.emergencyWithdraw(tokenAddress);
      await tx.wait();

      return true;
    } catch (error) {
      console.error("Error emergency withdrawing:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const togglePause = async (shouldPause: boolean) => {
    if (!service) return;

    try {
      setLoading(true);
      const contracts = await service.getContracts();

      const tx = await contracts.bettingPool[shouldPause ? "pause" : "unpause"]();
      await tx.wait();

      return true;
    } catch (error) {
      console.error("Error toggling pause:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createMatch,
    finalizeMatch,
    setProtocolFee,
    emergencyWithdraw,
    togglePause,
    loading,
  };
}
