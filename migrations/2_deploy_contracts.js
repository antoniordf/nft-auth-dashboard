// migrating the appropriate contracts
const DApp = artifacts.require("./DApp.sol");

module.exports = function (deployer) {
  deployer.deploy(DApp);
};
