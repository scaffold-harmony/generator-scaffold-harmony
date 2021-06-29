require('dotenv').config()

const path = require("path");
const config = require("./package.json").config;

const PrivateKeyProvider = require('./private-provider')

const networkId = {
  Mainnet: 1666600000,
  Testnet: 1666700000
}

module.exports = {
  contracts_build_directory: path.join(__dirname, config.contracts_build_directory),
  networks: {
    devnet: {
      provider: () => {
        return new PrivateKeyProvider(process.env.LOCALNET_PRIVATE_KEY, 'http://localhost:9500', networkId.Testnet)
      },
      network_id: networkId.Testnet
    },

    testnet: {
      provider: () => {
        return new PrivateKeyProvider(process.env.TESTNET_PRIVATE_KEY, 'https://api.s0.b.hmny.io', networkId.Testnet)
      },
      network_id: networkId.Testnet,
      networkCheckTimeout: 30000,
    },

    mainnet: {
      provider: () => {
        return new PrivateKeyProvider(process.env.MAINNET_PRIVATE_KEY, 'https://api.s0.t.hmny.io', networkId.Mainnet)
      },
      network_id: networkId.Mainnet,
      networkCheckTimeout: 30000,
    }
  },

  compilers: {
    solc: {
      version: '0.7.6'
    },
  }
}
