const GasProfiler = artifacts.require("GasProfiler");
const { to18Decimals } = require("../helper");

contract("LogExpMath Gas Profiling", () => {
  after("write coverage/profiler output", async () => {});
  it("log gas profiler", async () => {
    const instance = await GasProfiler.deployed();

    //Profile gas
    global.profilerSubprovider.start();
   // await instance.n_exp(to18Decimals("-31.820108607490815508"));
    //await instance.n_log(to18Decimals("57896044618658097711785492504343953926634992332820282019728.792003956564819967"));
    //await instance.exp(to18Decimals("0.32232323"), to18Decimals("4.0000321"));
   //643102961492159229685123454361267877069693275046736482.439086190222406507, 82003137640949373632027531041988350108147929669637655.181663505773223411
    await instance.log(to18Decimals("643102961492159229685123454361267877069693275046736482.439086190222406507"),to18Decimals("82003137640949373632027531041988350108147929669637655.181663505773223411")); 
    global.profilerSubprovider.stop();

    await global.profilerSubprovider.writeProfilerOutputAsync();
  });
});
