const LogExpMath = artifacts.require("LogExpMath");
const {
  Decimal,
  checkError,
  to18Decimals,
  createRandomNum,
  updateGasInfo,
  E,
  TOTAL_TEST_LOOP,
} = require("../helper");

const gasResults = {
  minGas: null,
  maxGas: null,
};

const calculate = async (x, y) => {
  const instance = await LogExpMath.deployed();
  //Execute log function
  const solution = await instance.log.call(to18Decimals(x), to18Decimals(y));
  updateGasInfo(
    instance.log.estimateGas(to18Decimals(x), to18Decimals(y)),
    "log: " + x + ", " + y,
    gasResults
  );
  //Calculate result with Decimal library
  const exact = Decimal.log(x, y);
  return {
    solution,
    exact,
  };
};

contract("LogExpMath Logarithm", (accounts) => {
  after(function () {
    console.log(
      `minGas: ${gasResults.minGas.gas.toString()} for ${
        gasResults.minGas.info
      }`
    );
    console.log(
      `maxGas: ${gasResults.maxGas.gas.toString()} for ${
        gasResults.maxGas.info
      }`
    );
  });
  it("should calculate random numbers for x between 0 and max int256 correctly", async () => {
    for (let index = 0; index < TOTAL_TEST_LOOP; index++) {
      //Create random x
      const randomX = createRandomNum(
        "0",
        "57896044618658097711785492504343953926634992332820282019728.792003956564819967"
      );
      const randomY = createRandomNum(
        "0",
        "57896044618658097711785492504343953926634992332820282019728.792003956564819967"
      );
      //Get function result
      const result = await calculate(randomX, randomY);
      //Check error
      checkError(
        "log",
        `(${randomX}, ${randomY})`,
        result.solution,
        result.exact,
        1
      );
    }
  });
  it("should fail x > [max int256]", async () => {
    const x =
      "57896044618658097711785492504343953926634992332820282019728.792003956564819968";
    const randomY = createRandomNum(
      "0",
      "57896044618658097711785492504343953926634992332820282019728.792003956564819967"
    );
    let error = null;
    try {
      await calculate(x, randomY);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate x=[max int256] and y=[max int256] correctly", async () => {
    const x =
      "57896044618658097711785492504343953926634992332820282019728.792003956564819967";
    const y =
      "57896044618658097711785492504343953926634992332820282019728.792003956564819967";
    const result = await calculate(x, y);

    //Check error
    checkError("log", `(${x}, ${y})`, result.solution, result.exact, 1);
  });
});
