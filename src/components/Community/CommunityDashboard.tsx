 import { useContractService } from '../../hooks/useContractService';
import { useCommunityStats } from '../../hooks/useCommunityStats';
import { ContractAddresses } from '../../types/Contracts';
import { StatCard } from './StatCard';
import Loader from '../Loader';
 
/**
 * Displays user's community stats and achievements
 */
export function CommunityDashboard({ addresses }: { addresses: ContractAddresses }) {
  const { service } = useContractService(addresses);
  const { stats, loading, error } = useCommunityStats(service);

  if (loading) return <Loader/>
  if (error) return <div>Error: {error.message}</div>;
  if (!stats) return null;

  return (
    <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8">
  <h2 className="text-2xl font-bold text-white mb-6">Your Community Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Reputation Score"
          value={stats.reputation}
          description="Earned through betting and referrals"
        />
        <StatCard
          title="Referral Count"
          value={stats.referralCount}
          description="Users you've referred"
        />
        <StatCard
          title="Referral Rewards"
          value={`${stats.referralRewards} WETH`}
          description="Earned from referral activities"
        />
        {stats.referrer && (
          <StatCard
            title="Your Referrer"
            value={`${stats.referrer.slice(0, 6)}...${stats.referrer.slice(-4)}`}
            description="Who referred you"
          />
        )}
      </div>
    </div>
  );
}