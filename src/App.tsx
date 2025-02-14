import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import {MatchList} from "./pages/MatchListingPage"
import MatchDetailsPage from "./pages/MatchDetailsPage"
import TournamentPage from "./pages/TournamentPage"
import UserDashboardPage from "./pages/UserDashboardPage"
import AdminPanelPage from "./pages/AdminPanelPage"
import RewardsPage from "./pages/RewardsPage"
import EmergencySettingsPage from "./pages/EmergencySettingsPage"
import { CreateMatchForm } from "./components/admin/CreateMatchForm"

function App() {
  const addresses = {
    bettingPool: "0xB663dB61fa549daa00B27F225C2b8f66f672D1Ef",
    tournament: "0xbb1a9650c2E55b7c738B5B8E6e62c9bDb3489c7C",
    communityHub: "0xb2ffae1418Fcf1f82707f68FCAFdc9ab990b5D16",
    weth: "0x4200000000000000000000000000000000000006"
  };
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/matches" element={<MatchList addresses={addresses}/>} />
            <Route path="/create-match" element={<CreateMatchForm addresses={addresses}/>} />
            <Route path="/match/:id" element={<MatchDetailsPage />} />
            <Route path="/tournament/:id" element={<TournamentPage />} />
            <Route path="/my-bets" element={<UserDashboardPage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/emergency-settings" element={<EmergencySettingsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

