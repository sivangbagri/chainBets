// components/Community/ReferralRegistration.tsx
import React, { useState } from "react";
import { useReferralRegistration } from "../../hooks/useReferralRegistration";
import { ContractService } from "../../utils/Contracts";

/**
 * Handles new user registration with referral
 */
export function ReferralRegistration({
  contractService,
}: {
  contractService: ContractService | null;
}) {
  const [referrerAddress, setReferrerAddress] = useState("");
  const { registerReferral, registering, error } =
    useReferralRegistration(contractService);

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
    <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Register with Referral
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#A1A1A6] text-sm mb-3">
            Referrer Address
          </label>
          <input
            type="text"
            value={referrerAddress}
            onChange={(e) => setReferrerAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-4 bg-[#0F1418] border border-[#1C2127] rounded-lg text-white placeholder-[#4D4D4D] focus:border-[#C5FF32] focus:outline-none transition-colors"
          />
        </div>

        {error && (
          <div className="text-[#FF4D4D] text-sm bg-[#1C2127] p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={registering || !referrerAddress}
          className={`w-full py-4 rounded-lg font-medium transition-all duration-200
          ${
            registering || !referrerAddress
              ? "bg-[#1C2127] text-[#A1A1A6] cursor-not-allowed"
              : "bg-[#C5FF32] text-black hover:bg-[#B2E62D]"
          }`}
        >
          {registering ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
