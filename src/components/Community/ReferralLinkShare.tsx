// components/ReferralLinkShare.tsx
 import { useReferralLink } from '../../hooks/useReferralLink';
import { ContractService } from '../../utils/Contracts';

/**
 * Allows users to share their referral link
 */
export function ReferralLinkShare({ contractService }: { contractService: ContractService | null }) {
  const { referralLink, copied, copyToClipboard } = useReferralLink(contractService);

  return (
    <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8">
  <h2 className="text-2xl font-bold text-white mb-6">Share Your Referral Link</h2>
  
  <div className="flex space-x-3">
    <input
      type="text"
      value={referralLink}
      readOnly
      className="flex-1 px-4 py-3 bg-[#0F1418] border border-[#1C2127] rounded-lg text-[#A1A1A6] focus:outline-none"
    />
    <button
      onClick={copyToClipboard}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 
        ${copied 
          ? 'bg-[#1C2127] text-[#C5FF32]' 
          : 'bg-[#C5FF32] text-black hover:bg-[#B2E62D]'
        }`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  </div>

  <p className="mt-4 text-sm text-[#808080]">
    Share this link to earn rewards when others join and bet
  </p>
</div>

  );
}