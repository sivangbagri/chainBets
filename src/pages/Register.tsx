// src/pages/Register.tsx
import { useContractService } from "../hooks/useContractService";
import { useReferralLanding } from "../hooks/useReferralLanding";
import { useReferralRegistration } from "../hooks/useReferralRegistration";
import { ContractAddresses } from "../types/Contracts";
import { useState } from "react";
export const RegisterPage: React.FC<{ addresses: ContractAddresses }> = ({
  addresses,
}) => {
  const { service, loading: serviceLoading } = useContractService(addresses);
  const { referrer, isValidReferrer } = useReferralLanding(service);
  const { registerReferral, registering, error } =
    useReferralRegistration(service);
  const [walletConnected, setWalletConnected] = useState(false);

  // Show benefits of registration with referral
  const benefits = [
    {
      title: "Initial Reputation Boost",
      description: "Get 5 reputation points immediately upon registration",
    },
    {
      title: "Betting Rewards",
      description:
        "Your referrer earns 5% of your betting rewards, encouraging them to help you succeed",
    },
    {
      title: "Community Access",
      description: "Join the betting community with a trusted sponsor",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Welcome to ChainBets
      </h1>

      {referrer && (
        <div className="bg-[#0F1418] border border-[#1C2127] rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium text-[#C5FF32]">
            You've been referred by
          </h2>
          <p className="font-mono text-[#A1A1A6] mt-2">{referrer}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Benefits Section */}
        <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Registration Benefits
          </h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1C2127] rounded-lg flex items-center justify-center">
                  <span className="text-[#C5FF32] font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-[#808080]">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Section */}
        <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Complete Registration
          </h2>

          {!walletConnected ? (
            <button
              onClick={() => setWalletConnected(true)}
              className="w-full py-4 bg-[#C5FF32] text-black rounded-lg font-medium hover:bg-[#B2E62D] transition-all duration-200"
            >
              Connect Wallet to Continue
            </button>
          ) : (
            <>
              {isValidReferrer ? (
                <button
                  onClick={() => registerReferral(referrer!)}
                  disabled={registering}
                  className={`w-full py-4 rounded-lg font-medium transition-all duration-200
                  ${
                    registering
                      ? "bg-[#1C2127] text-[#A1A1A6] cursor-not-allowed"
                      : "bg-[#C5FF32] text-black hover:bg-[#B2E62D]"
                  }`}
                >
                  {registering ? "Registering..." : "Complete Registration"}
                </button>
              ) : (
                <div className="p-4 bg-[#1C2127] text-[#FF4D4D] rounded-lg">
                  Invalid referral link. Please get a valid referral from an
                  existing member.
                </div>
              )}
            </>
          )}

          {error && (
            <div className="mt-4 p-4 bg-[#1C2127] text-[#FF4D4D] rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
