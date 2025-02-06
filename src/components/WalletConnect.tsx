interface WalletConnectProps {
    onConnect: () => void
  }
  
  export default function WalletConnect({ onConnect }: WalletConnectProps) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
        <button onClick={onConnect} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Connect Wallet
        </button>
      </div>
    )
  }
  
  