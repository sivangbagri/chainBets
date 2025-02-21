import type React from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useState } from "react";

const Header: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");

  const WalletConnect = async () => {
    try {
      if (window.ethereum == null) {
        alert("Please install metamask first");
      } else {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log("Connected Address:", await signer.getAddress());
        setWalletConnected(true);
        setAddress(await signer.getAddress());
        return signer;
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <header className="bg-[#0a0a0a] text-white border-b border-[#2a2a2a]">
    <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-[#9dff2c] to-[#7fff00] bg-clip-text text-transparent hover:opacity-80 transition-all"
        >
          ChainBets
        </Link>
        
        <nav className="flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                to="/matches" 
                className="text-gray-300 hover:text-[#9dff2c] transition-colors duration-300"
              >
                Matches
              </Link>
            </li>
            <li>
              <Link 
                to="/my-bets" 
                className="text-gray-300 hover:text-[#9dff2c] transition-colors duration-300"
              >
                My Bets
              </Link>
            </li>
            <li>
              <Link 
                to="/community" 
                className="text-gray-300 hover:text-[#9dff2c] transition-colors duration-300"
              >
                Rewards
              </Link>
            </li>
          </ul>
          
          <div>
            {!walletConnected ? (
              <button
                onClick={WalletConnect}
                className="bg-[#9dff2c] text-black px-6 py-2 rounded-full font-medium hover:bg-[#8aef19] transition-all duration-300 shadow-[0_0_15px_rgba(157,255,44,0.3)] hover:shadow-[0_0_20px_rgba(157,255,44,0.5)]"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#2a2a2a] text-sm">
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  </header>
);

};

export default Header;