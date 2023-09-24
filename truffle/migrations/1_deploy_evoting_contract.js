const EvotingContract = artifacts.require("EvotingContract");

module.exports = function (deployer) {
  deployer.deploy(EvotingContract);
};
