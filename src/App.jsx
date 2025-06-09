import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { useEffect, useState } from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import './App.css'
import Home from './pages/Home'

const { chains, publicClient } = configureChains(
  [baseSepolia],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Succinct Name Service',
  projectId: '296aab1b9fb87283ce50626caa01a0c6', // WalletConnect için bir project ID almanız gerekiyor
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="min-h-screen relative">
          {/* Floating cubes */}
          <div className="cubes">
            <div className="cube cube1"></div>
            <div className="cube cube2"></div>
            <div className="cube cube3"></div>
            <div className="cube cube4"></div>
            <div className="cube cube5"></div>
            <div className="cube cube6"></div>
            <div className="cube cube7"></div>
            <div className="cube cube8"></div>
            <div className="cube cube9"></div>
            <div className="cube cube10"></div>
            <div className="cube cube11"></div>
            <div className="cube cube12"></div>
          </div>

          {/* Mouse follower light effect */}
          <div 
            className="mouse-follower"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
            }}
          />

          {/* Main content */}
          <div className="relative z-10">
            <Home />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App