// const LogExpMath = artifacts.require("LogExpMath");

// module.exports = function (deployer) {
//   deployer.deploy(LogExpMath);
// };


const LogExpMath = artifacts.require("LogExpMath");
const GasProfiler = artifacts.require("GasProfiler");

async function doDeploy(deployer) {
  await deployer.deploy(LogExpMath);
  await deployer.link(LogExpMath, GasProfiler);
  await deployer.deploy(GasProfiler);
}


module.exports = (deployer) => {
  deployer.then(async () => {
      await doDeploy(deployer);
  });
};