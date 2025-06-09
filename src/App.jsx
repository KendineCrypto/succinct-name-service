import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import './App.css'
import BackgroundAnimation from './components/BackgroundAnimation'
import Home from './pages/Home'

const { chains, publicClient } = configureChains(
  [baseSepolia],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Succinct Name Service',
  projectId: '296aab1b9fb87283ce50626caa01a0c6',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="min-h-screen relative">
          <BackgroundAnimation />
          <div className="relative z-10">
            <Home />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App