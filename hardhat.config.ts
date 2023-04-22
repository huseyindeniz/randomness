import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-solhint";
import "@primitivefi/hardhat-dodoc";
import "@dlsl/hardhat-markup";

dotenv.config();

const FUJIFORK = false;
const AVAMAINFORK = false;

const forkData = FUJIFORK
  ? {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      blockNumber: 12087277,
    }
  : AVAMAINFORK
  ? {
      url: "https://api.avax.network/ext/bc/C/rpc",
      blockNumber: 12087277,
    }
  : undefined;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  networks: {
    hardhat: {
      forking: forkData,
      //blockGasLimit: 99999943139445867,
    },
    ganache: {
      url: "http://localhost:7545",
    },
    avalancheTest: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      //gasPrice: 225000000000,
      chainId: 43113,
      accounts:
        process.env.AVALANCHE_TEST_PRIVATE_KEY !== undefined
          ? [`0x${process.env.AVALANCHE_TEST_PRIVATE_KEY}`]
          : [],
    },
    bscTest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      //gasPrice: 225000000000,
      chainId: 97,
      accounts:
        process.env.BSC_TEST_PRIVATE_KEY !== undefined
          ? [`0x${process.env.BSC_TEST_PRIVATE_KEY}`]
          : [],
    },
    polygonTest: {
      url: "https://rpc-mumbai.maticvigil.com",
      //gasPrice: 225000000000,
      chainId: 80001,
      accounts:
        process.env.POLYGON_TEST_PRIVATE_KEY !== undefined
          ? [`0x${process.env.POLYGON_TEST_PRIVATE_KEY}`]
          : [],
    },
    avalancheMain: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      //gasPrice: 225000000000,
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
    //coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  dodoc: {
    exclude: ["interfaces", "libraries", "elin"],
  },
};

export default config;
