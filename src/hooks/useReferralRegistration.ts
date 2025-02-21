// hooks/useReferralRegistration.ts
import { useState } from 'react';
import { ContractService } from '../utils/Contracts';

/**
 * Hook to handle referral registration process
 */
export function useReferralRegistration(contractService: ContractService | null) {
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerReferral = async (referrerAddress: string) => {
    if (!contractService) throw new Error("Contract service not initialized");
    
    try {
      setRegistering(true);
      setError(null);
      
      const contracts = await contractService.getContracts();
       const signer = contractService?.getSigner;
      const userAddress =await signer?.getAddress();
      
      // Attempt to register the referral
      const tx = await contracts.communityHub.registerReferral(referrerAddress);
      await tx.wait();
      const refereeRepTx = await contracts.communityHub._updateReputation(userAddress, 5);
      await refereeRepTx.wait();
      
      const referrerRepTx = await contracts.communityHub._updateReputation(referrerAddress, 10);
      await referrerRepTx.wait();
      // Force page refresh to update stats
      window.location.reload();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setRegistering(false);
    }
  };

  return { registerReferral, registering, error };
}