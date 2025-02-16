import { useState } from 'react';
import { useContractService } from '../../hooks/useContractService';
 import { ContractAddresses } from '../../types/Contracts';

interface WETHApprovalProps {
  requiredAmount: bigint;
  currentAllowance: bigint;
  onApprovalComplete: () => void;
  addresses: ContractAddresses; // Added addresses to props
}

export function WETHApproval({ 
  requiredAmount, 
  currentAllowance,
  onApprovalComplete,
  addresses 
}: WETHApprovalProps) {
  const { service, loading: serviceLoading, error } = useContractService(addresses);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    try {
      if (!service) {
        console.error("Service is not available");
        return;
      }

      setLoading(true);
      const contracts = await service.getContracts();
      
      const tx = await contracts.wethToken.approve(
        addresses.bettingPool,
        requiredAmount
      );
      
      await tx.wait();
      onApprovalComplete();
    } catch (error) {
      console.error('Error approving WETH:', error);
    } finally {
      setLoading(false);
    }
  };

  if (currentAllowance >= requiredAmount) {
    return null;
  }

  // Added error handling for service
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
        <p className="text-red-600">Error connecting to wallet: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
      <p className="mb-2">Approve WETH spending before placing bet</p>
      <button
        onClick={handleApprove}
        disabled={loading || serviceLoading}
        className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Approving...' : 'Approve WETH'}
      </button>
    </div>
  );
}