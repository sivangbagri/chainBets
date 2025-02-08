import type React from "react"

const EmergencySettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Emergency & Settings</h1>
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Emergency Controls</h2>
        <div className="flex space-x-4 mb-8">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Pause Betting
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Resume Betting
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Protocol Settings</h2>
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Protocol Fee
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmergencySettingsPage

