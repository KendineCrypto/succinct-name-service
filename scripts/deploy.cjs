const hre = require("hardhat");

async function main() {
  console.log("Deploying Succinct Name Service...");

  const SuccNameService = await hre.ethers.getContractFactory("SuccNameService");
  const sns = await SuccNameService.deploy();

  await sns.waitForDeployment();

  const address = await sns.getAddress();
  console.log(`Succinct Name Service deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 