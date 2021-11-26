var Election = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(Election);
};
