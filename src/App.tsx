import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import MatchListingPage from "./pages/MatchListingPage"
import MatchDetailsPage from "./pages/MatchDetailsPage"
import TournamentPage from "./pages/TournamentPage"
import UserDashboardPage from "./pages/UserDashboardPage"
import AdminPanelPage from "./pages/AdminPanelPage"
import RewardsPage from "./pages/RewardsPage"
import EmergencySettingsPage from "./pages/EmergencySettingsPage"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/matches" element={<MatchListingPage />} />
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

