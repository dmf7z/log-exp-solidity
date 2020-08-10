const GasProfiler = artifacts.require("GasProfiler");
const helper = require("../helper");

contract("LogExpMath Gas Profiling", () => {
  after("write coverage/profiler output", async () => {
    await global.profilerSubprovider.writeProfilerOutputAsync();
  });
  it("log gas profiler for 3 numbers", async () => {
    const instance = await GasProfiler.deployed();
    //Profile gas
    const expArg = new helper.Decimal("99.700829182905140222");
    const logArg = new helper.Decimal("81.716982335689463286");
    global.profilerSubprovider.start();
    await instance.n_exp(expArg.toFixed(18, 1).replace(".", ""));
    await instance.n_log(logArg.toFixed(18, 1).replace(".", ""));
    global.profilerSubprovider.stop();
  });
});
