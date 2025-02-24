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
    bettingPool: "0x7de40c5d75a80167FA9F5b2057E7Efb7745a42e7",
    tournament: "0xE0D3484017edE44614ae58621df055c078F3F719",
    communityHub: "0x5e526D7921654AC7C190547053bD906fCbe1944a",
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
