// migrating the appropriate contracts
const DApp = artifacts.require("DApp");
const TestERC721 = artifacts.require("TestERC721");

module.exports = async function (deployer) {
  // Deploy the TestERC721 contract
  await deployer.deploy(TestERC721);
  const testERC721 = await TestERC721.deployed();

  // Deploy the DApp contract with the TestERC721 contract address as a parameter
  await deployer.deploy(DApp, testERC721.address);
};
