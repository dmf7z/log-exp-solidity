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

    x = to18Decimals("1.00001");
    y = to18Decimals("12900000");

//    x = to18Decimals("2");
//    y = to18Decimals("4");
    await instance.power(x,y);
//    var showResult = instance.showResult();
//    showResult.get(function(error, result) {instance.power(x,y)} ); 
    
    global.profilerSubprovider.stop();

    await global.profilerSubprovider.writeProfilerOutputAsync();
  });
});
