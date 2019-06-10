const Migrations = artifacts.require("smartGrid");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
