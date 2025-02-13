export interface AdminMatch {
  name: string;
  startTime: number;
  endTime: number;
  minBet: bigint;
  maxBet: bigint;
}

export interface AdminTournament {
  name: string;
  startTime: number;
  endTime: number;
  entryFee: bigint;
  matchIds: number[];
}
