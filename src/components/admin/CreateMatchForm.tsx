import { useState } from "react";
import { useAdminBetting } from "../../hooks/useAdminBetting";
import { ContractAddresses } from "../../types/Contracts";
import { AdminMatch } from "../../types/Admin";
interface MatchListProps {
  addresses: ContractAddresses;
  onMatchSelect?: (matchId: number) => void;
}
export const CreateMatchForm: React.FC<MatchListProps> = ({ addresses }) => {
  const [match, setMatch] = useState<AdminMatch>({
    name: "",
    startTime: 0,
    endTime: 0,
    minBet: BigInt(0),
    maxBet: BigInt(0),
  });

  const { createMatch, loading } = useAdminBetting(addresses);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMatch(match);
      // Handle success
    } catch (error) {
      // Handle error
      console.error("Error creating match:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a Match
        </h1>

        <div className="mb-4">
          <label
            htmlFor="matchName"
            className="block text-gray-700 font-medium mb-2"
          >
            Match Name
          </label>
          <input
            id="matchName"
            type="text"
            value={match.name}
            onChange={(e) =>
              setMatch((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Match Name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="startTime"
            className="block text-gray-700 font-medium mb-2"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="datetime-local"
            onChange={(e) =>
              setMatch((prev) => ({
                ...prev,
                startTime: new Date(e.target.value).getTime() / 1000,
              }))
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="endTime"
            className="block text-gray-700 font-medium mb-2"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="datetime-local"
            onChange={(e) =>
              setMatch((prev) => ({
                ...prev,
                endTime: new Date(e.target.value).getTime() / 1000,
              }))
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="minBet"
            className="block text-gray-700 font-medium mb-2"
          >
            Minimum Bet
          </label>
          <input
            id="minBet"
            type="number"
            onChange={(e) =>
              setMatch((prev) => ({
                ...prev,
                minBet: BigInt(e.target.value),
              }))
            }
            placeholder="Minimum Bet"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="maxBet"
            className="block text-gray-700 font-medium mb-2"
          >
            Maximum Bet
          </label>
          <input
            id="maxBet"
            type="number"
            onChange={(e) =>
              setMatch((prev) => ({
                ...prev,
                maxBet: BigInt(e.target.value),
              }))
            }
            placeholder="Maximum Bet"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Match"}
        </button>
      </form>
    </div>
  );
};
