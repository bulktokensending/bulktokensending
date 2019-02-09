![Logo](/public\favicon\ms-icon-150x150.png)

# Description
This DApp can help you in the conducting Airdrop on Ethereum network via mass sender, multi sender, bulk token sending features.

# Problem 1:
Previously in Ethereum Network, additional tools were required in order to transfer many ERC20 tokens at once.
Many people still do this manually, one transaction at a time. This process is time consuming and prone to an error.

# Solution 1:
This Dapp allows a user to send thousands of token transfers in a very efficient way by batching them in groups of 145 token transfers per Ethereum transaction. This automation saves time by automatically generating transactions to MetaMask. Finally, this tool allows a user to maintain security of their account by delegating the trust of their private keys to a secure MetaMask wallet.

# Problem 2:
Many people still generate Ethereum address manually, one Ethereum wallet address at a time. This process is time consuming and prone to an error.

# Solution 2:
This Dapp allows a user to generate thousands of Ethereum addresses in a very efficient  way.
Create new Ethereum addresses in the bulk operation mode.

# How to use for bulk sending:
1. Install [Metamask](https://metamask.io).
2. Make sure you have an account in MetaMask which has a token balance.
3. Make sure your MetaMask is pointed to the network that you would like to use.
4. Make sure your MetaMask account is unlocked.
5. Go to https://bulktokensending.site/#/
6. Wait for the full page to load.
7. Select a token from the dropdown that you would like to send.
8. Provide either JSON or CSV text in the textarea (see example below).
9. Set up needed chunk per transaction. The chunk by default is 145, but if you send a big token amount per an address, you will be forced decrease the chunk, because each transaction will demand critical gas amount. Leave it as is and test at first time, then adjust if will be occurred with a error.
10. Click next.
11. If everything looks good, click next once again.
12. Wait for MetaMask to generate an approval transaction.
13. Once the approval transaction is mined, MetaMask will generate as many transactions as needed for your token transfers (145 addresses per tx).
14. Done!

![DemoBulk](/public/demo/bulk.gif)

# How to use for bulk ETH addresses generating:
1. Go to https://bulktokensending.site/app.html#/NewStack
2. Enter the needed address count.
3. Provide strong common password for addresses. Keep in mind that you must store this password securely.
4. Click generate and wait while you won't see the button "New Stack".
5. You will see two textareas. The first textarea will have new addresses in JSON format: {"address": "0x0", "v3json": "..."}. The second will have only addresses for using in bulk sending tokens operations. Please keep in mind that <b>you must store the first textarea data for using  v3json in MetaMask software with common password to access for a wallet</b>. The second textarea is created only for quick operations with addresses.
6. Done!

![DemoNewStack](/public/demo/newStack.gif)

You can test this tool on any test network, if you want to make sure that everything will work as expected.

Contracts deployed on Mainnet by addresses:

ProxyStorage: https://etherscan.io/address/0x4126632bd44dd9c82604252e3466e5766e266b0e

Implementation: https://etherscan.io/address/0xbd6cdc706a6086e6dde892f0e767a4ec053b5d0b

Example JSON:
```json

[
  {"0xCBA5018De6b2b6F89d84A1F5A68953f07554765e":"12"},
  {"0xa6Bf70bd230867c870eF13631D7EFf1AE8Ab85c9":"1123.45645"},
  {"0x00b5F428905DEA1a67940093fFeaCeee58cA91Ae":"1.049"},
  {"0x00fC79F38bAf0dE21E1fee5AC4648Bc885c1d774":"14546"}
]
```
Example CSV:
```csv
0xCBA5018De6b2b6F89d84A1F5A68953f07554765e,12
0xa6Bf70bd230867c870eF13631D7EFf1AE8Ab85c9,1123.45645
0x00b5F428905DEA1a67940093fFeaCeee58cA91Ae,1.049
0x00fC79F38bAf0dE21E1fee5AC4648Bc885c1d774,14546
```

# Disclaimer
Author is not responsible for any loss from transactions derived by BulkTokenSending.

Some of the underlying JavaScript libraries and Ethereum tools that were used are under active development.

The website and smart contract has been thoroughly tested, there is always the possibility something unexpected happens resulting in losses of Ethereum and/or tokens.

Any ERC20 tokens you transfer to the BulkTokenSending will be sent out to the addresses that you provided.

The smart contract source code can be audited by anyone in this repository.

Author encourages you to assess its security before using the BulkTokenSending Dapp.

Initial code based on the project Roman Storm https://github.com/rstormsf/multisender with GNU 3 license.
