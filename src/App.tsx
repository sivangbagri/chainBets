import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { MatchList } from "./pages/MatchListingPage";
import MatchDetailsPage from "./pages/MatchDetailsPage";
import TournamentPage from "./pages/TournamentPage";
import { UserDashboardPage } from "./pages/UserDashboardPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import RewardsPage from "./pages/RewardsPage";
import EmergencySettingsPage from "./pages/EmergencySettingsPage";
import { CreateMatchForm } from "./components/admin/CreateMatchForm";
import { CommunityPage } from "./pages/CommunityPage";
import { RegisterPage } from "./pages/Register";
import { FinalizeMatchForm } from "./components/admin/FinalizeMatchForm";

function App() {
  const addresses = {
    bettingPool: "0xdeE81605375942895d01c030a39E4F54B6D8b015",
    tournament: "0x989843eF8A89F9F8A55835b535B1775409FDBEbc",
    communityHub: "0x149A3dbb7C92DF2341845e495950EF91E461FbE3",
    weth: "0x4200000000000000000000000000000000000006",
  };
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/matches" element={<MatchList addresses={addresses} />}
            />
            <Route path="/create-match" element={<CreateMatchForm addresses={addresses} />}
            />
            <Route path="/finalize-match" element={<FinalizeMatchForm addresses={addresses} />}
            />
            <Route path="/match/:id" element={<MatchDetailsPage addresses={addresses} />}
            />
            <Route path="/tournament/:id" element={<TournamentPage />} />
            <Route path="/my-bets" element={<UserDashboardPage addresses={addresses} />}/>
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/emergency-settings" element={<EmergencySettingsPage />}/>
            <Route path="/community" element={<CommunityPage addresses={addresses} />}/>
            <Route path="/register" element={<RegisterPage addresses={addresses} />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
