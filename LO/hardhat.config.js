require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL 
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY



module.exports = {
  defaultNetwork : "hardhat",
  
  networks : {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 11155111,
  },
  hardhat: {
      chainId: 31337,
      
  },
  localhost: {
    chainId: 31337,
},


  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
        sepolia: ETHERSCAN_API_KEY,
    },
  },


  solidity: "0.8.18",


  namedAccounts: {

    deployer: {
        default: 0, // here this will by default take the first account as deployer   
    },
    player: {
        default: 1,
    },
},

mocha: {
  timeout: 500000, // 500 seconds max for running tests
},

};
