// hooks/useCommunityStats.ts
import { useEffect, useState } from 'react';
import { ContractService } from '../utils/Contracts';
import { formatEther } from 'ethers';
import { CommunityStats } from '../types/Contracts';

/**
 * Hook to manage community stats including reputation, referrals, and rewards
 */
export function useCommunityStats(contractService: ContractService | null) {
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!contractService) return;

      try {
        setLoading(true);
        const contracts = await contractService.getContracts();
        const signer = contractService.getSigner;
        if (!signer) throw new Error("No signer available");

        const userAddress = await signer.getAddress();
        
        // Fetch all community stats in parallel
        const [reputation, referralCount, referralRewards, referrer] = await Promise.all([
          contracts.communityHub.getReputation(userAddress),
          contracts.communityHub.getReferralCount(userAddress),
          contracts.communityHub.referralRewards(userAddress),
          contracts.communityHub.referrers(userAddress)
        ]);

        setStats({
          reputation: Number(reputation),
          referralCount: Number(referralCount),
          referralRewards: formatEther(referralRewards),
          referrer: referrer === "0x0000000000000000000000000000000000000000" ? null : referrer
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch community stats"));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [contractService]);

  return { stats, loading, error };
}