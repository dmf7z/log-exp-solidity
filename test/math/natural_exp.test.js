const LogExpMath = artifacts.require("LogExpMath");
const helper = require("../helper");

const calculate = async (exponent) => {
  const instance = await LogExpMath.deployed();
  //Execute natural exp function
  const solution = await instance.n_exp.call(
    exponent.toFixed(18, 1).replace(".", "")
  );
  //Calculate result with Decimal library
  const exact = helper.Decimal(helper.E).pow(exponent.toString());
  return {
    solution,
    exact,
  };
};

contract("LogExpMath Natural Exponential", (accounts) => {
  it("should calculate random numbers between -41 and 130 correctly", async () => {
    for (let index = 0; index < helper.TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomArg = helper.createRandomNum(129, -41);
      //Get function result
      const result = await calculate(randomArg);
      //Check error
      helper.checkError("exp", randomArg, result.solution, result.exact, 2);
    }
  });
  it("should fail for an exponent greater than 130.700829182905140221", async () => {
    const overflowArg = new helper.Decimal("130.700829182905140222");
    let error = null;
    try {
      await calculate(overflowArg);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should fail for an exponent lower than -41.446531673892822312", async () => {
    const underflowArg = new helper.Decimal("-41.446531673892822313");

    let error = null;
    try {
      await calculate(underflowArg);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate max exponent 130.700829182905140221 correctly", async () => {
    const maxArg = new helper.Decimal("130.700829182905140221");
    const result = await calculate(maxArg);
    //Check error
    helper.checkError("exp", maxArg, result.solution, result.exact, 1);
  });
  it("should calculate min exponent -41.446531673892822312 correctly", async () => {
    const mingArg = new helper.Decimal("-41.446531673892822312");
    const result = await calculate(mingArg);
    //Check error
    helper.checkError("exp", mingArg, result.solution, result.exact, 1);
  });
});
