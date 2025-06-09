import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const WalletConnect = () => {
  const { isConnected, address } = useAccount()

  return (
    <div className="flex items-center space-x-4">
      {isConnected && (
        <span className="text-sm text-gray-600 hidden md:block">
          
        </span>
      )}
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="w-full max-w-xs bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 text-pink-900 font-extrabold py-3 px-8 rounded-full shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center gap-3 justify-center text-lg tracking-wide border-2 border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      🚀 Connect Wallet
                    </button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      className="w-full max-w-xs bg-gradient-to-r from-red-200 via-red-400 to-red-500 text-red-900 font-extrabold py-3 px-8 rounded-full shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center gap-3 justify-center text-lg tracking-wide border-2 border-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      ❌ Wrong Network
                    </button>
                  )
                }

                return (
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={openChainModal}
                      className="bg-gradient-to-r from-pink-100 via-pink-300 to-pink-400 text-pink-900 font-bold py-3 px-8 rounded-full shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center gap-2 text-lg border-2 border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    >
                      🌐 {chain.name}
                    </button>
                    <button
                      onClick={openAccountModal}
                      className="bg-gradient-to-r from-lime-100 via-green-200 to-green-400 text-green-900 font-bold py-3 px-8 rounded-full shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center gap-2 text-lg border-2 border-green-100 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                      👤 {account.displayName}
                    </button>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </div>
  )
}

export default WalletConnect 