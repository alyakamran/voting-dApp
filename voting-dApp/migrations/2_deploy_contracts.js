// migrations/2_deploy_contracts.js
const Election = artifacts.require("Election");

module.exports = function (deployer) {
  deployer.deploy(Election);
};
