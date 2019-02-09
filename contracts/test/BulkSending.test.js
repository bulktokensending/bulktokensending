var abi = require("ethereumjs-abi");
const assertJump = require('./helpers/assertJump');
const assertGas = require('./helpers/assertGas');
const ether = require('./helpers/ether');
const UpgradebleSender = artifacts.require("UpgradebleSender");
const EternalStorageProxyForBulkTokenSending = artifacts.require("EternalStorageProxyForBulkTokenSending");

contract('UpgradebleSender', function(accounts) {
  const ONEETHER  = 1000000000000000000;
  let senderImpl, senderViaProxy, proxy;
  beforeEach(async () => {
    proxy = await EternalStorageProxyForBulkTokenSending.new(accounts[0]);
    senderImpl = await UpgradebleSender.new();
    await proxy.upgradeTo('1.0.0', senderImpl.address);
    senderViaProxy = UpgradebleSender.at(proxy.address);
    await senderViaProxy.initialize(accounts[0]);
  })

  it("should return the correct version for Proxy after construction", async function() {
    assert.equal(await proxy.version(), '1.0.0');
  })

  it("should return the correct implementation for Sender after construction", async function() {
    assert.equal(await proxy.implementation(), senderImpl.address);
  })

  it("should return that initialized for Sender after construction", async function() {
    assert.equal(await senderViaProxy.initialized(), true);
  })

  it("should return the correct owner for Sender after construction", async function() {
    assert.equal(await senderViaProxy.owner(), accounts[0]);
  })

  it("should return the correct upgradeabilityOwner for Sender after construction", async function() {
    assert.equal(await senderViaProxy.upgradeabilityOwner(), accounts[0]);
  })

  it("should allow set arrayLimit only via Proxy", async function() {
    await senderViaProxy.setArrayLimit(100, {from: accounts[0]});
    assert.equal(await senderViaProxy.arrayLimit(), 100);
  })

  it("should return the correct fee for common customer", async function() {
    assert.equal(await senderViaProxy.currentFee(accounts[0]), 0.05 * ONEETHER);
  });

  it("should return the correct, then the zero, then the correct fee (after removing) for vip customer", async function() {
    assert.equal(await senderViaProxy.currentFee(accounts[0]), 0.05 * ONEETHER);
    await senderViaProxy.addVipCustomer(accounts[0], {from: accounts[0]});
    assert.equal(await senderViaProxy.currentFee(accounts[0]), 0);
    await senderViaProxy.removeVipCustomer(accounts[0], {from: accounts[0]});
    assert.equal(await senderViaProxy.currentFee(accounts[0]), 0.05 * ONEETHER);
  });

  it("should return the correct balance after ETH bulk sending", async function() {
    let accounts_2_before = await web3.eth.getBalance(accounts[2]).toNumber();
    let accounts_3_before = await web3.eth.getBalance(accounts[3]).toNumber();
    await senderViaProxy.multisendEther([accounts[2], accounts[3]], [1 * ONEETHER, 1 * ONEETHER], {"value" : 2.1 * ONEETHER, from: accounts[0]});
    assert.equal(await web3.eth.getBalance(accounts[2]).toNumber(), accounts_2_before + 1 * ONEETHER, "accounts 2 added balance on 1 ETH");
    assert.equal(await web3.eth.getBalance(accounts[3]).toNumber(), accounts_3_before + 1 * ONEETHER, "accounts 3 added balance on 1 ETH");
  });

  //@TODO test when not enough due to fee
});
