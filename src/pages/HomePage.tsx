import type React from "react"
import { Link } from "react-router-dom"

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to ChainBets</h1>
      <p className="mb-4">Decentralized esports betting platform on Ancient8 Chain</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-2xl font-bold mb-2">Ongoing Matches</h2>
          {/* Add ongoing matches list here */}
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-2xl font-bold mb-2">Upcoming Matches</h2>
          {/* Add upcoming matches list here */}
        </div>
      </div>
      <Link to="/matches" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        View All Matches
      </Link>
    </div>
  )
}

export default HomePage

