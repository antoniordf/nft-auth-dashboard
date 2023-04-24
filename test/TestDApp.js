const assert = require("assert");
const DApp = artifacts.require("DApp");
const TestERC721 = artifacts.require("TestERC721");

contract("DApp", function (accounts) {
  let dApp, testERC721;

  before(async function () {
    // Deploy a test ERC721 token
    testERC721 = await TestERC721.new();
    await testERC721.mint(accounts[0], 1);

    // Deploy the DApp contract
    dApp = await DApp.new(testERC721.address);
  });

  it("should correctly check if a user has an NFT", async function () {
    // Check if the owner has an NFT
    const ownerHasNFT = await dApp.userHasNFT(accounts[0]);
    assert.equal(ownerHasNFT, true, "Owner should have an NFT");

    // Check if addr1 has no NFT
    const addr1HasNFT = await dApp.userHasNFT(accounts[1]);
    assert.equal(addr1HasNFT, false, "Addr1 should not have an NFT");
  });
});
