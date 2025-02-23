import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {HomePage} from "./pages/HomePage";
import { MatchList } from "./pages/MatchListingPage";
import MatchDetailsPage from "./pages/MatchDetailsPage";
import { UserDashboardPage } from "./pages/UserDashboardPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import { CommunityPage } from "./pages/CommunityPage";
import { RegisterPage } from "./pages/Register";
  

function App() {
    const addresses = {
    bettingPool: "0x46257225Cc4b95661C0176162eB753120F1173f5",
    tournament: "0x824956E087c7e10891E66a7e718172C905364b60",
    communityHub: "0x6E66FeecAD0f3dCc3074f15C49cc46D7Eb5a4c8B",
    weth: "0x4200000000000000000000000000000000000006",
  };
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage addresses={addresses} />} />
            <Route path="/matches" element={<MatchList addresses={addresses} />}/>
            <Route path="/match/:id" element={<MatchDetailsPage addresses={addresses} />}/>
             <Route path="/my-bets" element={<UserDashboardPage addresses={addresses} />}/>
            <Route path="/admin" element={<AdminPanelPage addresses={addresses} />} />
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
