import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const randomnessContractFactory = await ethers.getContractFactory(
    "Randomness"
  );
  const randomnessContract = await randomnessContractFactory.deploy();

  await randomnessContract.deployed();
  console.log("Randomness deployed to:", randomnessContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Avalanche Testnet: 0xf4FF6bd06181f7893BFb5dD49aBe9566ae37C736
// BSC Testnet: 0x177ABa2ADb7570c70ca3E2760cd89E1823c29450
// Polygon Testnet: 0x177ABa2ADb7570c70ca3E2760cd89E1823c29450
