import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import MatchList from "./pages/MatchListingPage"
import MatchDetailsPage from "./pages/MatchDetailsPage"
import TournamentPage from "./pages/TournamentPage"
import UserDashboardPage from "./pages/UserDashboardPage"
import AdminPanelPage from "./pages/AdminPanelPage"
import RewardsPage from "./pages/RewardsPage"
import EmergencySettingsPage from "./pages/EmergencySettingsPage"
import { CreateMatchForm } from "./components/admin/CreateMatchForm"

function App() {
  const addresses = {
    bettingPool: "0x8e65D16397142D7a3bD88f90dE7Ee85a8BC34F99",
    tournament: "0x1DE896368E19709A754b581B8aAf1DC4343F96BB",
    communityHub: "0x13887316610221D0dFB5f0F07E3bBaC33ac5EDCB",
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

