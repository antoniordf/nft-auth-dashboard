# NFT Auth Dashboard

This project demonstrates how to create a token-gated web application using Ethereum, NFTs (Non-Fungible Tokens), and the Truffle framework. Users are granted access to the content of the application only if they possess a specific NFT from a designated collection.

# Table of Contents

Prerequisites

- Installation
- Usage
- License

# Prerequisites

Before you begin, make sure you have the following installed:

- Node.js v12.x or later
- Truffle v5.x or later
- Metamask browser extension

# Installation

1. Clone the repository:
   git clone https://github.com/yourusername/nft_auth_dashboard.git

2. Change into the project directory:
   cd nft_auth_dashboard

3. Install the dependencies:
   npm install

4. Install the client dependencies:
   cd client && npm install

5. Create a .env file in the root directory of the project to store your mnemonic phrase and Infura ID (obtained from Infura):
   MNEMONIC="your mnemonic phrase"
   INFURA_ID="your infura id"

# Usage

1. Start your local Ethereum network, such as Ganache or Truffle Develop.
2. Deploy the contracts to your local network:
   truffle migrate --network development

3. Update the contract address in the `App.js` file:
   After deploying the contract, take note of the deployed contract address and update the `contractAddress` variable in the `src/App.js` file with the new address.

```javascript
const contractAddress = "0xYourDeployedContractAddress";
```

4. In the client directory, start the frontend server:
   npm start

5. Visit the application in your browser at http://localhost:3000.
6. Connect your Metamask wallet to the local Ethereum network.
7. To simulate owning an NFT from the designated collection, mint an NFT to your wallet address using the Truffle console:

```javascript
   truffle console --network development
   const TestERC721 = artifacts.require("TestERC721");
   const testERC721 = await TestERC721.deployed();
   const accounts = await web3.eth.getAccounts();
   await testERC721.mint(accounts[0], 1);
```

8. Refresh the application in your browser. If you have the specified NFT in your wallet, you will be granted access to the content.

# License

This project is licensed under the MIT License.
