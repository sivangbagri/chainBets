import type React from "react";
import { FinalizeMatchForm } from "../components/admin/FinalizeMatchForm";
import { CreateMatchForm } from "../components/admin/CreateMatchForm";
import { ContractAddresses } from "../types/Contracts";
import { useState } from "react";
const AdminPanelPage: React.FC<{ addresses: ContractAddresses }> = ({
  addresses,
}) => {
  const [password, setPassword] = useState("");
  const [isadmin, setIsadmin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "chain26") {
      alert("Login Successful");
      setIsadmin(true);

    } else {
      alert("Wrong password.")
      setIsadmin(false);
    }
  };
  return (
    <>
      {!isadmin ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center">Admin Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <button type="submit" className="w-full">
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-2xl font-bold mb-4">
                Finalize Match Results
              </h2>
              <FinalizeMatchForm addresses={addresses} />
            </div>
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-2xl font-bold mb-4">Create New Match</h2>
              <CreateMatchForm addresses={addresses} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanelPage;
