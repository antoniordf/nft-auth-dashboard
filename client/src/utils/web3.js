import Web3 from "web3";

let web3;
let contractInstance;

// Initialize Web3 and connect to MetaMask or another provider
export async function initWeb3() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
  }
}

// Initialize the smart contract instance
export async function initContract(abi, contractAddress) {
  contractInstance = new web3.eth.Contract(abi, contractAddress);
}

// Utility function to interact with the smart contract
export async function userHasNFT(userAddress) {
  const hasNFT = await contractInstance.methods.userHasNFT(userAddress).call();
  return hasNFT;
}
