// hooks/useContractService.ts
import { useEffect, useState } from "react";
import { ContractService } from "../utils/Contracts";
import { ContractAddresses } from "../types/Contracts";

export function useContractService(addresses: ContractAddresses) {
  const [service, setService] = useState<ContractService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initService = async () => {
      try {
        const service = new ContractService(addresses);
        console.log("servie:" , service)
        await service.init();
        
        setService(service);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to initialize contracts")
        );
      } finally {
        setLoading(false);
      }
    };

    initService();
  }, [addresses]);

  return { service, loading, error };
}
