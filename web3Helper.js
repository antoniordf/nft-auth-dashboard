const { PROJECT_ID } = process.env;
const Web3 = require("web3");
const DApp = require("./build/contracts/DApp.json");

const providerUrl = `https://sepolia.infura.io/v3/${PROJECT_ID}`;
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

async function userHasAnyNFT(userAddress, contractAddress) {
  dappInstance = new web3.eth.Contract(DApp.abi, contractAddress);

  const result = await dappInstance.methods.userHasNFT(userAddress);
  return result;
}

module.exports = { userHasAnyNFT };
