import React from 'react';
import { useContractService } from '../hooks/useContractService';
import { CommunityDashboard } from "../components/Community/CommunityDashboard"
import { ReferralRegistration } from "../components/Community/ReferralRegistration";
import { ReferralLinkShare } from '../components/Community/ReferralLinkShare';
import { ContractAddresses } from '../types/Contracts';

export const CommunityPage:React.FC<{addresses:ContractAddresses}>=({addresses})=> {
  
  
  const { service, loading } = useContractService(addresses);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <CommunityDashboard addresses={addresses} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReferralRegistration contractService={service} />
        <ReferralLinkShare contractService={service} />
      </div>
    </div>
  );
}