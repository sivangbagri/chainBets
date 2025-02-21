// components/Community/ReferralRegistration.tsx
import React, { useState } from 'react';
import { useReferralRegistration } from '../../hooks/useReferralRegistration';
import { ContractService } from "../../utils/Contracts";

/**
 * Handles new user registration with referral
 */
export function ReferralRegistration({ contractService }: { contractService: ContractService | null }) {
  const [referrerAddress, setReferrerAddress] = useState('');
  const { registerReferral, registering, error } = useReferralRegistration(contractService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referrerAddress) return;

    try {
      await registerReferral(referrerAddress);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Register with Referral</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Referrer Address
          </label>
          <input
            type="text"
            value={referrerAddress}
            onChange={(e) => setReferrerAddress(e.target.value)}
            placeholder="0x..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        <button
          type="submit"
          disabled={registering || !referrerAddress}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {registering ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}