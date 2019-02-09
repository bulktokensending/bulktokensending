require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = process.env.TEST_MNEMONIC || 'wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet';
const apiKey = process.env.TEST_APIKEY || 000000000;
const kovanProvider = new HDWalletProvider(mnemonic, 'https://kovan.infura.io/' + apiKey);

const mnemonicMain = process.env.MNEMONIC || 'wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet';
const apiKeyMain = process.env.APIKEY || 000000000;
const mainProvider = new HDWalletProvider(mnemonicMain, 'https://mainnet.infura.io/' + apiKeyMain);

module.exports = {
  networks: {
    testganache: {
      //provider: require("ganache-cli").provider({ gasLimit: 100000000000, from: '0x2e47e6e0bf4fafd4ea361a8a3d2f88f68624624c' }),
      gas: 10000000000,
      from: '0x2e47e6e0bf4fafd4ea361a8a3d2f88f68624624c',
      network_id: "*",
      host: 'localhost',
      port: 8545
    },
    mainnet: {
      network_id: 1,
      provider: mainProvider,
      gas: 5999999,
      gasPrice: 9000000000,
      nonce: 22
    },
    kovan: {
      network_id: 42,
      provider: kovanProvider,
      gas: 4999999
    },
  }
}
