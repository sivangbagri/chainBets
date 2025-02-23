//hooks/useReferralLanding.ts
import { useEffect, useState } from "react";
import { getReferrerFromURL } from "../utils/Referral";
import { ContractService } from "../utils/Contracts";
// import { useRoutes } from 'react-router';
 export function useReferralLanding(contractService: ContractService | null) {
  const [referrer, setReferrer] = useState<string | null>(null);
  const [isValidReferrer, setIsValidReferrer] = useState<boolean>(false);
  //   const router = useRouter();

  useEffect(() => {
    const checkReferrer = async () => {
      const referrerAddress = getReferrerFromURL();
      if (!referrerAddress || !contractService) return;

      try {
        const contracts = await contractService.getContracts();

        // Check if referrer has valid referral count (means they're a user)
        const referralCount = await contracts.communityHub.getReferralCount(
          referrerAddress
        );
      
        setReferrer(referrerAddress);
        setIsValidReferrer(Number(referralCount) >= 0);
      } catch (error) {
        console.error("Error validating referrer:", error);
        setIsValidReferrer(false);
      }
    };

    checkReferrer();
  }, [contractService]);

  return { referrer, isValidReferrer };
}
