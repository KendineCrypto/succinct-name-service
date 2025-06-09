import DomainSearch from '../components/DomainSearch';
import WalletConnect from '../components/WalletConnect';

const Home = () => {
  // Örnek NFT önizlemesi için bir domain adı (gerekirse state ile bağlayabilirsin)
  const previewDomain = 'yourdomain';

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      {/* Blockchain motifleri */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <circle cx="20%" cy="30%" r="120" fill="#fff" fillOpacity="0.07" />
          <circle cx="80%" cy="70%" r="100" fill="#fff" fillOpacity="0.04" />
          <rect x="60%" y="10%" width="180" height="180" rx="40" fill="#fff" fillOpacity="0.03" />
        </svg>
      </div>
      <div className="fixed inset-0 bg-gradient-to-br from-[#2a003f] via-[#43003f] to-[#630063] opacity-90 z-[-1]" />
      <div className="z-10 w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-6 border border-purple-100">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 drop-shadow-lg">
            Web3 Identity for Everyone
          </h1>
          <p className="text-lg mt-2 text-gray-200 font-medium">
            Simplify your crypto experience with <span className="font-bold text-pink-400">SNS</span>
          </p>
        </div>
        {/* NFT Önizlemesi */}
        <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-pink-300 via-purple-200 to-indigo-200 flex items-center justify-center shadow-lg border-4 border-white mb-4">
          <span className="text-2xl font-bold text-white drop-shadow-lg">.succ</span>
        </div>
        {/* Domain arama ve mint kartı */}
        <DomainSearch />
        {/* Wallet connect ve network kartı */}
        <WalletConnect />
      </div>
    </div>
  )
}

export default Home 