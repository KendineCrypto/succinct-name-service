require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    baseSepolia: {
      url: "https://base-sepolia.rpc.url",  // Base Sepolia RPC URL'sini buraya yazın
      accounts: ["9189440e0761fd82010b26025dbb1833b426aca79aadc0cd2f24f73819666a82"]            // Deploy için kullanacağınız özel anahtarınızı buraya yazın
    },
    // diğer ağ tanımları...
  },
};
