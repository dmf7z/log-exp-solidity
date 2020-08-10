const LogExpMath = artifacts.require("LogExpMath");
const {
  Decimal,
  checkError,
  to18Decimals,
  createRandomNum,
  E,
  TOTAL_TEST_LOOP,
} = require("../helper");

const calculate = async (exponent) => {
  const instance = await LogExpMath.deployed();
  //Execute natural exp function
  const solution = await instance.n_exp.call(to18Decimals(exponent));
  //Calculate result with Decimal library
  const exact = Decimal(E).pow(new Decimal(exponent));
  return {
    solution,
    exact,
  };
};

contract("LogExpMath Natural Exponential", (accounts) => {
  it("should calculate random numbers between -41 and 130 correctly", async () => {
    for (let index = 0; index < TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomArg = createRandomNum(129, -41);
      //Get function result
      const result = await calculate(randomArg);
      //Check error
      checkError("exp", randomArg, result.solution, result.exact, 2);
    }
  });
  it("should fail for an exponent greater than 130.700829182905140221", async () => {
    const overflowArg = "130.700829182905140222";
    let error = null;
    try {
      await calculate(overflowArg);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should fail for an exponent lower than -41.446531673892822312", async () => {
    const underflowArg = "-41.446531673892822313";

    let error = null;
    try {
      await calculate(underflowArg);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate max exponent 130.700829182905140221 correctly", async () => {
    const maxArg = "130.700829182905140221";
    const result = await calculate(maxArg);
    //Check error
    checkError("exp", maxArg, result.solution, result.exact, 1);
  });
  it("should calculate min exponent -41.446531673892822312 correctly", async () => {
    const mingArg = "-41.446531673892822312";
    const result = await calculate(mingArg);
    //Check error
    checkError("exp", mingArg, result.solution, result.exact, 1);
  });
});
