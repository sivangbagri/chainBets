// components/ReferralLinkShare.tsx
import React from 'react';
import { useReferralLink } from '../../hooks/useReferralLink';
import { ContractService } from '../../utils/Contracts';

/**
 * Allows users to share their referral link
 */
export function ReferralLinkShare({ contractService }: { contractService: ContractService | null }) {
  const { referralLink, copied, copyToClipboard } = useReferralLink(contractService);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Share Your Referral Link</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Share this link to earn rewards when others join and bet
      </p>
    </div>
  );
}