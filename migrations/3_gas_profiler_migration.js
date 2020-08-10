const GasProfiler = artifacts.require("GasProfiler");

module.exports = function (deployer) {
  deployer.deploy(GasProfiler);
};
