import { useState, useEffect } from "react";
import { useContractService } from "../../hooks/useContractService";
import { ContractAddresses } from "../../types/Contracts";
import { ethers } from "ethers";

interface WETHApprovalProps {
  requiredAmount: bigint;
  currentAllowance: bigint;
  onApprovalComplete: () => void;
  addresses: ContractAddresses;
}

export function WETHApproval({
  requiredAmount,
  currentAllowance,
  onApprovalComplete,
  addresses,
}: WETHApprovalProps) {
  const {
    service,
    loading: serviceLoading,
    error,
  } = useContractService(addresses);
  const [loading, setLoading] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("");

  // Function to check if approval is needed
  const needsApproval = currentAllowance < requiredAmount;

  const handleApprove = async () => {
    if (!service || !requiredAmount) return;

    try {
      setLoading(true);
      setApprovalStatus("Initiating approval...");

      const contracts = await service.getContracts();
      if (!contracts?.wethToken || !addresses.bettingPool) {
        throw new Error("Contract initialization failed");
      }

      // We'll approve for a large amount to avoid frequent approvals
      const approvalAmount = ethers.parseEther("1000000"); // 1M WETH approval

      

      // First, check if we need to reset allowance
      if (currentAllowance > BigInt(0) && currentAllowance < requiredAmount) {
        setApprovalStatus("Resetting previous approval...");
        const resetTx = await contracts.wethToken.approve(addresses.bettingPool, BigInt(0));
        await resetTx.wait();
      }

      // Now set the new approval
      setApprovalStatus("Waiting for approval confirmation...");
      const tx = await contracts.wethToken.approve(addresses.bettingPool, approvalAmount);
      
      setApprovalStatus("Confirming approval transaction...");
      await tx.wait();

      // Verify the approval was successful
      const newAllowance = await contracts.wethToken.allowance(
        await service.getSigner?.getAddress(),
        addresses.bettingPool
      );

      if (newAllowance < requiredAmount) {
        throw new Error("Approval failed - allowance not set correctly");
      }

      setApprovalStatus("Approval successful!");
      onApprovalComplete();
      // console.log("Current allowance:", newAllowance.toString());
      // console.log("Required amount:", requiredAmount.toString());
      // console.log("Approving amount:", approvalAmount.toString());
    } catch (error: any) {
      console.error("Approval error:", error);
      setApprovalStatus(`Approval failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!needsApproval) {
    return null;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
        <p className="text-red-600">Error connecting to wallet: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#1A1D1F] border border-[#2A2D2F] rounded-xl mb-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[#E5E7EB] mb-2">
          Approve WETH spending before placing bet
          {approvalStatus && (
            <span className="block text-sm text-[#9CA3AF] mt-1">
              {approvalStatus}
            </span>
          )}
        </p>
      </div>
      
      <button
        onClick={handleApprove}
        disabled={loading || serviceLoading}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 
          ${loading || serviceLoading 
            ? "bg-[#1C2127] text-[#9CA3AF] cursor-not-allowed"
            : "bg-[#C5FF32] text-black hover:bg-[#B2E62D]"
          }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Approving...
          </span>
        ) : (
          "Approve WETH"
        )}
      </button>
    </div>
  </div>
  
  );
}