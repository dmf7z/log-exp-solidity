const GasProfiler = artifacts.require("GasProfiler");
const { to18Decimals } = require("../helper");

contract("LogExpMath Gas Profiling", () => {
  after("write coverage/profiler output", async () => {});
  it("log gas profiler", async () => {
    const instance = await GasProfiler.deployed();

    //Profile gas
    global.profilerSubprovider.start();
    //await instance.n_exp(to18Decimals("99.700829182905140222"));
    //await instance.n_log(to18Decimals("81.716982335689463286"));
    //await instance.power(to18Decimals("0.32232323"), to18Decimals("4.0000321"));
    await instance.log(to18Decimals("15.392283"), to18Decimals("7.38291"));
    global.profilerSubprovider.stop();

    await global.profilerSubprovider.writeProfilerOutputAsync();
  });
});
