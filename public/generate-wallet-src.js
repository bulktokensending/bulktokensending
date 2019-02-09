var ETHWallet = require('ethereumjs-wallet');

self.onmessage = function(e) {
  const personal_wallet = ETHWallet.generate(false);
  const v3json = personal_wallet.toV3String(e.data.newPassword, {kdf: "scrypt",n: "1024"});
  postMessage({"address": personal_wallet.getAddressString(), "privateKey": personal_wallet.getPrivateKeyString(), "v3json": v3json});
}
