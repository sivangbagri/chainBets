import { useEffect, useState } from 'react';
import { ContractService } from '../utils/Contracts';
import { BigNumberish } from 'ethers';

interface Bet {
  matchId: number;
  matchName: string;
  amount: string;
  prediction: number;
  claimed: boolean;
  isFinalized: boolean;
  winner: number;
}

export function useUserBets(contractService: ContractService | null) {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBets = async () => {
      if (!contractService) return;

      try {
        setLoading(true);
        const contracts = await contractService.getContracts();
        const signer = contractService.getSigner;
        if (!signer) throw new Error("No signer available");

        const userAddress = await signer.getAddress();
        const betHistory = await contracts.bettingPool.getUserBetHistory(userAddress);

        const betsPromises = betHistory.map(async (matchId: BigNumberish) => {
          const [match, bet] = await Promise.all([
            contracts.bettingPool.getMatch(matchId),
            contracts.bettingPool.getUserBet(matchId, userAddress)
          ]);

          return {
            matchId: Number(matchId),
            matchName: match.name,
            amount: bet.amount.toString(),
            prediction: Number(bet.prediction),
            claimed: bet.claimed,
            isFinalized: match.isFinalized,
            winner: Number(match.winner)
          };
        });

        const userBets = await Promise.all(betsPromises);
        setBets(userBets);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch bets"));
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, [contractService]);

  return { bets, loading, error };
}