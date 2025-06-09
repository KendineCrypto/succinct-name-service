# Succinct Name Service (SNS)

A Web3 Name Service built on Base Sepolia testnet, inspired by ENS and SNS. This project provides a decentralized way to register and manage .succ domains as NFTs.

## Features

- 🎨 Beautiful pink-themed UI with responsive design
- 🔍 Real-time domain availability checking
- 🎯 Domain registration as NFTs (ERC721)
- 👛 Wallet integration with RainbowKit
- 🌐 Base Sepolia testnet support
- 📱 Mobile-responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or any Web3 wallet
- Base Sepolia testnet configured in your wallet

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/succinct-name-service.git
cd succinct-name-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
```

4. Start the development server:
```bash
npm run dev
```

## Smart Contract Deployment

1. Install Hardhat:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Deploy the contract to Base Sepolia:
```bash
npx hardhat run scripts/deploy.js --network base-sepolia
```

3. Update the contract address in your `.env` file.

## Usage

1. Connect your wallet using the "Connect Wallet" button
2. Enter a domain name in the search box
3. Check if the domain is available
4. If available, click "Mint Domain" to register it as an NFT
5. View your registered domains in your wallet or on OpenSea Testnet

## Technologies Used

- React + Vite
- TailwindCSS
- Solidity
- Hardhat
- RainbowKit + Wagmi
- Pinata IPFS
- Base Sepolia Testnet

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
