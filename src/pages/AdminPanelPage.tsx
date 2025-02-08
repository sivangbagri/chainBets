import type React from "react"

const AdminPanelPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Update Match Results</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="matchId" className="block text-gray-700 text-sm font-bold mb-2">
                Match ID
              </label>
              <input
                type="number"
                id="matchId"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="winner" className="block text-gray-700 text-sm font-bold mb-2">
                Winner
              </label>
              <select
                id="winner"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>Select winner</option>
                <option value="teamA">Team A</option>
                <option value="teamB">Team B</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Result
            </button>
          </form>
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Configure Protocol Settings</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="protocolFee" className="block text-gray-700 text-sm font-bold mb-2">
                Protocol Fee (%)
              </label>
              <input
                type="number"
                id="protocolFee"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="oracleAddress" className="block text-gray-700 text-sm font-bold mb-2">
                Oracle Address
              </label>
              <input
                type="text"
                id="oracleAddress"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminPanelPage

