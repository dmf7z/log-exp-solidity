const LogExpMath = artifacts.require("LogExpMath");
const {
  Decimal,
  checkError,
  to18Decimals,
  createRandomNumGreaterThanOne,
  TOTAL_TEST_LOOP,
  createRandomNum,
  updateGasInfo,
} = require("../helper");

const gasResults = {
  minGas: null,
  maxGas: null,
};

const calculate = async (num) => {
  const instance = await LogExpMath.deployed();
  //Execute natural log function
  const solution = await instance.n_log.call(to18Decimals(num));
  updateGasInfo(
    instance.n_log.estimateGas(to18Decimals(num)),
    "n_log: " + num,
    gasResults
  );
  //Calculate log with Decimal library
  const exact = Decimal.ln(new Decimal(num));
  return {
    solution,
    exact,
  };
};

contract("LogExpMath Natural Logarithm", (accounts) => {
  after(function () {
    console.log(`minGas: ${gasResults.minGas.gas.toString()} for ${gasResults.minGas.info}`);
    console.log(`maxGas: ${gasResults.maxGas.gas.toString()} for ${gasResults.maxGas.info}`);
  });
  it("should calculate random numbers between 1 and (2ˆ256 - 1) / 10ˆ18 correctly", async () => {
    for (let index = 0; index < TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomArg = createRandomNum(
        "1",
        "578960446186580977117854925043439539266"
      ); //MAX: (2^255 -1) / (10^20 * 10^18)
      //Get function result
      const result = await calculate(randomArg);
      //Check error
      checkError("n_log", randomArg, result.solution, result.exact, 1);
    }
  });
  it("should calculate random numbers between 0 an 1 correctly", async () => {
    for (let index = 0; index < TOTAL_TEST_LOOP; index++) {
      //Create random num
      const randomArg = Decimal.random().toFixed(18, 1);
      //Get function result
      const result = await calculate(randomArg);
      //Check error
      checkError("n_log", randomArg, result.solution, result.exact, 1);
    }
  });
  it("should fail for an argument greater than max int256", async () => {
    const overflowArg  = "57896044618658097711785492504343953926634992332820282019728.792003956564819968";

    let error = null;
    try {
      console.log( await calculate(overflowArg) );
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should fail for an argument equal to 0", async () => {
    const underflowArg = "0";
    let error = null;
    try {
      await calculate(underflowArg);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should fail for an argument less than 0", async () => {
    const underflowArg = "-1";

    let error = null;
    try {
      await calculate(underflowArg);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate max int256 argument correctly", async () => {
    const maxArg = "57896044618658097711785492504343953926634992332820282019728.792003956564819967";
    const result = await calculate(maxArg);
    //Check error
    checkError("n_log", maxArg, result.solution, result.exact, 1);
  });
  it("should calculate min argument 0.000000000000000001 correctly", async () => {
    const minArg = "0.000000000000000001";
    const result = await calculate(minArg);
    //Check error
    checkError("n_log", minArg, result.solution, result.exact, 1);
  });
});
