var ETHWallet = require('ethereumjs-wallet');

self.onmessage = function(e) {
  try {
    const personal_wallet = ETHWallet.fromV3(e.data.json, e.data.password);
    postMessage({"privateKey": personal_wallet.getPrivateKey()});
  } catch(error) {
    console.log(error.message);
    postMessage({"error": error.message});
  }
}
