// hoolks/useReferralLink.ts
import { useEffect, useState } from 'react';
import { ContractService } from '../utils/Contracts';

/**
 * Hook to generate and manage referral links
 */
export function useReferralLink(contractService: ContractService | null) {
  const [referralLink, setReferralLink] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generateLink = async () => {
      if (!contractService) return;
      const signer = contractService.getSigner;
      if (!signer) return;
      
      const address = await signer.getAddress();
      setReferralLink(`${window.location.origin}/register?referrer=${address}`);
    };

    generateLink();
  }, [contractService]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { referralLink, copied, copyToClipboard };
}