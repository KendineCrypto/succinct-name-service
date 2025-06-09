import DomainSearch from '../components/DomainSearch';
import WalletConnect from '../components/WalletConnect';

const Home = () => {
  // Örnek NFT önizlemesi için bir domain adı (gerekirse state ile bağlayabilirsin)
  const previewDomain = 'yourdomain';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center font-sans relative overflow-hidden" style={{ background: 'transparent' }}>
      <div
        className="z-10 w-full max-w-md rounded-2xl p-8 flex flex-col items-center space-y-6 border-2 border-pink-200"
        style={{
          boxShadow: '0 8px 32px 0 rgba(255, 0, 128, 0.18), 0 1.5rem 3rem rgba(255, 0, 128, 0.1)',
          background: 'linear-gradient(135deg, #fff0fa 0%, #ffe0f6 100%)',
        }}
      >
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-pink-400 to-fuchsia-400 drop-shadow-lg">
            Web3 Identity for Everyone
          </h1>
          <p className="text-lg mt-2 text-pink-500 font-medium">
            Simplify your crypto experience with <span className="font-bold text-pink-600">SNS</span>
          </p>
        </div>
        {/* NFT Önizlemesi */}
        <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-pink-400 via-pink-200 to-fuchsia-200 flex items-center justify-center shadow-lg border-4 border-pink-200 mb-4">
          <span className="text-2xl font-bold text-pink-600 drop-shadow-lg">.succ</span>
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