// src/pages/Register.tsx
import { useContractService } from '../hooks/useContractService';
import { useReferralLanding } from '../hooks/useReferralLanding';
import { useReferralRegistration } from '../hooks/useReferralRegistration';
import { ContractAddresses } from '../types/Contracts';
import { useState } from 'react';
export const RegisterPage:React.FC<{addresses:ContractAddresses}>=({addresses})=> {
  const { service, loading: serviceLoading } = useContractService(addresses);
  const { referrer, isValidReferrer } = useReferralLanding(service);
  const { registerReferral, registering, error } = useReferralRegistration(service);
  const [walletConnected, setWalletConnected] = useState(false);

  // Show benefits of registration with referral
  const benefits = [
    {
      title: "Initial Reputation Boost",
      description: "Get 5 reputation points immediately upon registration"
    },
    {
      title: "Betting Rewards",
      description: "Your referrer earns 5% of your betting rewards, encouraging them to help you succeed"
    },
    {
      title: "Community Access",
      description: "Join the betting community with a trusted sponsor"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to ChainBets</h1>
      
      {referrer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-800">
            You've been referred by
          </h2>
          <p className="text-blue-600 font-mono mt-1">
            {referrer}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Registration Benefits</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-medium">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Complete Registration</h2>
          
          {!walletConnected ? (
            <button
              onClick={() => /* Connect wallet logic */ setWalletConnected(true)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Connect Wallet to Continue
            </button>
          ) : (
            <>
              {isValidReferrer ? (
                <button
                  onClick={() => registerReferral(referrer!)}
                  disabled={registering}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                  {registering ? 'Registering...' : 'Complete Registration'}
                </button>
              ) : (
                <div className="text-red-600 text-sm">
                  Invalid referral link. Please get a valid referral from an existing member.
                </div>
              )}
            </>
          )}
          
          {error && (
            <div className="mt-2 text-red-600 text-sm">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}