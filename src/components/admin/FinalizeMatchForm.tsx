// src/components/admin/FinalizeMatchForm.tsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAdminBetting } from "../../hooks/useAdminBetting";
import { ContractAddresses, Match } from "../../types/Contracts";
import { useContractService } from "../../hooks/useContractService";

interface FinalizeMatchFormProps {
  addresses: ContractAddresses;
}

export const FinalizeMatchForm: React.FC<FinalizeMatchFormProps> = ({ addresses }) => {
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMatches, setLoadingMatches] = useState(true);

  const { finalizeMatch } = useAdminBetting(addresses);
  const { service } = useContractService(addresses);

  // Optimized function to load finalizable matches
  const loadFinalizableMatches = useCallback(async () => {
    if (!service) return;

    setLoadingMatches(true);
    try {
      const contracts = await service.getContracts();
      const nextMatchId = await contracts.bettingPool.getNextMatchId();
      const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));

      // Fetch all matches in parallel and filter in one step
      const finalizableMatches = await Promise.all(
        Array.from({ length: Number(nextMatchId) - 1 }, (_, i) => i + 1).map(async (id) => {
          console.log(`Fetching match ID: ${id}`);
          const match = await contracts.bettingPool.getMatch(id);
          console.log(`Match ${id} data:`, match);
          
          // Check if this is a valid match that can be finalized
          const isValid = match.id !== 0 && currentTimestamp > match.endTime && !match.isFinalized;
          console.log(`Match ${id} valid for finalization: ${isValid}`);
          
          return isValid ? match : null;
        })
      );

      const filteredMatches = finalizableMatches.filter(Boolean) as Match[];
    console.log("Filtered matches:", filteredMatches);
    setMatches(filteredMatches);
    } catch (error) {
      console.error("Error loading finalizable matches:", error);
    } finally {
      setLoadingMatches(false);
    }
  }, [service]); // Memoized function to avoid unnecessary re-fetches

  useEffect(() => {
    loadFinalizableMatches();
  }, [addresses, loadFinalizableMatches]); // Ensure matches reload when addresses change

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatchId || !winner) return;

    setLoading(true);
    try {
      await finalizeMatch(selectedMatchId, winner);
      setSelectedMatchId(null);
      setWinner(null);
      await loadFinalizableMatches(); // Refresh matches after finalization
      alert(`Match #${selectedMatchId} successfully finalized with winner ${winner}`);
    } catch (error) {
      console.error("Error finalizing match:", error);
      alert(`Failed to finalize match: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  // Optimized: Memoize the selected match lookup to prevent unnecessary calculations
  const selectedMatch = useMemo(() => matches.find((m) => m.id === selectedMatchId), [matches, selectedMatchId]);
   

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Finalize Match</h1>

        {loadingMatches ? (
          <div className="text-center py-4">Loading matches...</div>
        ) : matches.length === 0 ? (
          <div className="text-center py-4 text-gray-600">No matches available for finalization</div>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="matchSelect" className="block text-gray-700 font-medium mb-2">Select Match</label>
               
              <select
                id="matchSelect"
                value={selectedMatchId || ""}
                onChange={(e) => setSelectedMatchId(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
              >
                <option value="">-- Select a match --</option>
                {matches?.map((match) => (
                    <>
                    
                  <option key={match.id} value={Number(match.id)}>
                    #{Number(match.id)} - {match.name} (Ended: {new Date(Number(match.endTime) * 1000).toLocaleString()})
                  </option>
                  </>
                ))}
              </select>
            </div>

            {selectedMatchId && (
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Select Winner</label>
                <div className="flex space-x-4">
                  {[1, 2].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="winner"
                        value={option}
                        checked={winner === option}
                        onChange={() => setWinner(option as 1 | 2)}
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Option {option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedMatchId || winner === null}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
            >
              {loading ? "Finalizing..." : "Finalize Match"}
            </button>
          </>
        )}

        {selectedMatch && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Match Details</h3>
            <div className="text-sm">
              <p><span className="font-medium">Name:</span> {selectedMatch.name}</p>
              <p><span className="font-medium">Pool A:</span> {Number(selectedMatch.totalPoolA) / 10 ** 18} tokens</p>
              <p><span className="font-medium">Pool B:</span> {Number(selectedMatch.totalPoolB) / 10 ** 18} tokens</p>
              <p><span className="font-medium">Start:</span> {new Date(Number(selectedMatch.startTime) * 1000).toLocaleString()}</p>
              <p><span className="font-medium">End:</span> {new Date(Number(selectedMatch.endTime) * 1000).toLocaleString()}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
