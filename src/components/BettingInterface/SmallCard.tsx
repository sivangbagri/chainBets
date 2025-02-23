import { Link } from "react-router";
import { Match } from "../../types/Contracts";
import { ethers } from "ethers";
interface MatchCardProps {
  match: Match;
  onSelect?: (matchId: number) => void;
}
const getTimeRemaining = (endTime: number): string => {
    const now = new Date().getTime();
    const end = new Date(endTime * 1000).getTime();
    const diff = end - now;
  
    if (diff <= 0) {
      return "Ended";
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} days ${hours} hours`;
    } else if (hours > 0) {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours} hours ${minutes} minutes`;
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${minutes} minutes`;
    }
};

export const SmallCard: React.FC<MatchCardProps> = ({ match}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-start space-x-3">
        {/* <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#1C2127] text-[#C5FF32]">
          🎮
        </div> */}
        <div className="flex-grow">
          <h3 className="text-white font-medium">{match.name}</h3>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        {/* <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#1C2127] text-[#C5FF32]">
          💰
        </div> */}
        <div className="flex-grow">
          <p className="text-[#A1A1A6]">
            Min Bet : <span className="text-white">{ethers.formatEther(match.minBet)} WETH</span>
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        {/* <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#1C2127] text-[#C5FF32]">
          ⏰
        </div> */}
        <div className="flex-grow">
          <p className="text-[#A1A1A6]">
            Ends in : <span className="text-white">{getTimeRemaining(Number(match.endTime))}</span>
          </p>
        </div>
      </div>

      <Link
        to={`/match/${match.id}`}
        className="mt-2 w-full px-4 py-2 bg-[#1C2127] text-[#C5FF32] rounded-lg text-center hover:bg-[#2A2D2F] transition-all duration-200"
      >
        Place Bet
      </Link>
    </div>
  );
};
