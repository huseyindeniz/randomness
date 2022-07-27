import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const FUJIFORK = true;
const AVAMAINFORK = false;

const forkData = FUJIFORK
  ? {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      blockNumber: 11986818,
    }
  : AVAMAINFORK
  ? {
      url: "https://api.avax.network/ext/bc/C/rpc",
      blockNumber: 11986818,
    }
  : undefined;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      forking: forkData,
    },
    avalancheTest: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts:
        process.env.AVALANCHE_TEST_PRIVATE_KEY !== undefined
          ? [`0x${process.env.AVALANCHE_TEST_PRIVATE_KEY}`]
          : [],
    },
    avalancheMain: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts:
        process.env.AVALANCHE_MAIN_PRIVATE_KEY !== undefined
          ? [`0x${process.env.AVALANCHE_MAIN_PRIVATE_KEY}`]
          : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    token: "AVAX",
    //gasPrice: 110,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    //gasPriceApi:
    //  "https://api.snowtrace.io/api?module=proxy&action=eth_gasPrice",
  },
};

export default config;
