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
    return "Approval not needed";
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
        <p className="text-red-600">Error connecting to wallet: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
      <p className="mb-2">
        Approve WETH spending before placing bet
        {approvalStatus && (
          <span className="block text-sm text-gray-600 mt-1">{approvalStatus}</span>
        )}
      </p>
      <button
        onClick={handleApprove}
        disabled={loading || serviceLoading}
        className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Approving..." : "Approve WETH"}
      </button>
    </div>
  );
}