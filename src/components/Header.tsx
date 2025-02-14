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
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ChainBets
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/matches">Matches</Link>
            </li>
            <li>
              <Link to="/my-bets">My Bets</Link>
            </li>
            <li>
              <Link to="/rewards">Rewards</Link>
            </li>
            <li>
              {!walletConnected ? (
                <button
                  className="bg-blue-500 px-4 py-2 rounded"
                  onClick={WalletConnect}
                >
                  Connect Wallet
                </button>
              ) : (
                `${address}`
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;