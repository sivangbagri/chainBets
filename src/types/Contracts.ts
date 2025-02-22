export interface UserRankingData {
  address: string;
  reputation: number;
  referralCount: number;
  rank: number;
}
export interface ReputationUpdatedEvent {
  args: [string, bigint] & { user: string; newScore: bigint };
}
export interface Match {
    id: number;
    name: string;
    startTime: bigint;
    endTime: bigint;
    minBet: bigint;
    maxBet: bigint;
    isFinalized: boolean;
    winner: number;
    totalPoolA: bigint;
    totalPoolB: bigint;
  }
  
  export interface Bet {
    user: string;
    matchId: number;
    amount: bigint;
    prediction: number;
    claimed: boolean;
  }
  
  export interface Tournament {
    id: number;
    name: string;
    startTime: bigint;
    endTime: bigint;
    entryFee: bigint;
    prizePool: bigint;
    isActive: boolean;
    matchIds: number[];
  }
  
  export interface UserStats {
    reputation: number;
    referralCount: number;
    referralRewards: bigint;
  }
  
  export interface ContractAddresses {
    bettingPool: string;
    tournament: string;
    communityHub: string;
    weth: string;
  }
  export interface CommunityStats {
    reputation: number;
    referralCount: number;
    referralRewards: string;
    referrer: string | null;
  }