var UpgradebleSender = artifacts.require("UpgradebleSender");
var EternalStorageProxyForBulkTokenSending = artifacts.require("EternalStorageProxyForBulkTokenSending");

module.exports = function(deployer, network, accounts) {
  let owner = '0x1f0cf7afa0161b0d8e9ec076fb62bb00742d314a';

  if(network == "testganache") {
    owner   = '0x2e47e6e0bf4fafd4ea361a8a3d2f88f68624624c';
  }

  deployer.deploy(EternalStorageProxyForBulkTokenSending, owner);
  deployer.deploy(UpgradebleSender).then(() => {
    return EternalStorageProxyForBulkTokenSending.deployed();
  }).then((p) => {
    proxy = p;
    return UpgradebleSender.deployed();
  }).then(s => {
    sender = s;
    return proxy.upgradeTo("1.0.0", sender.address);
  }).then(() => {
    senderViaProxy = UpgradebleSender.at(proxy.address);
    return senderViaProxy.initialize(owner);
  });
};
