import type React from "react"
import { Link } from "react-router-dom"

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-white mb-4">Welcome to ChainBets</h1>
      <p className="text-[#A1A1A6] text-xl mb-12">Decentralized esports betting platform on Ancient8 Chain</p>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8 hover:border-[#2A2D2F] transition-all">
          <h2 className="text-2xl font-bold text-[#C5FF32] mb-6">Ongoing Matches</h2>
          <div className="bg-[#0F1418] rounded-lg p-4 text-[#A1A1A6]">
            {/* Add ongoing matches list here */}
            No ongoing matches
          </div>
        </div>
  
        <div className="bg-[#0B0F13] border border-[#1C2127] rounded-xl p-8 hover:border-[#2A2D2F] transition-all">
          <h2 className="text-2xl font-bold text-[#C5FF32] mb-6">Upcoming Matches</h2>
          <div className="bg-[#0F1418] rounded-lg p-4 text-[#A1A1A6]">
            {/* Add upcoming matches list here */}
            No upcoming matches
          </div>
        </div>
      </div>
  
      <Link 
        to="/matches" 
        className="mt-8 inline-flex px-8 py-4 bg-[#C5FF32] text-black rounded-lg font-medium hover:bg-[#B2E62D] transition-all duration-200"
      >
        View All Matches
      </Link>
    </div>
  </div>
  
  )
}

export default HomePage

