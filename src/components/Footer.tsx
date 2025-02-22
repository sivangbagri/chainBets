import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] py-2">
      <div className="container mx-auto px-6">
        
        <div className="my-2 pt-2 text-center">
          <p className="text-gray-400">
            <span className="bg-gradient-to-r from-[#9dff2c] to-[#7fff00] bg-clip-text text-transparent">
              ChainBets
            </span>
            &nbsp;&copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
