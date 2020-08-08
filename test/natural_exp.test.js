const LogExpMath = artifacts.require("LogExpMath");
const helper = require("./helper");

const calculate = async (exponent) => {
  const instance = await LogExpMath.deployed();

  //Execute natural exp function
  const solution = await instance.n_exp.call(
    exponent.toFixed(18, 1).replace(".", "")
  );

  //Calculate result with Decimal library
  const exact = helper.Decimal(helper.E).pow(exponent.toString());

  //Calculate the relative error
  const relativeError = new helper.BigNumber(1)
    .minus(
      new helper.BigNumber(solution.toString())
        .div("1000000000000000000")
        .div(exact.toFixed(18, 1))
    )
    .absoluteValue()
    .toNumber();

  return {
    solution,
    exact,
    relativeError,
  };
};

contract("LogExpMath Natural Exponential", (accounts) => {
  it("should calculate 100 random numbers between -41 and 130 correctly", async () => {
    for (let index = 0; index < helper.TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomExp = helper.createRandomExponent(
        helper.MAX_EXPONENT,
        helper.MIN_EXPONENT
      );

      //Get function result
      const result = await calculate(randomExp);

      //Check relative error is less or equal to 2e-18
      assert.isAtMost(
        result.relativeError,
        2e-18,
        `Relative error is not less or equal than 2e-18 for ${randomExp.toString()} exp.
         Reports ${result.solution.toString()} instead of ${result.exact.toString()}`
      );
    }
  });
  it("should fail for an exponent greater than 130.700829182905140221", async () => {
    const overflowExp = new helper.Decimal("130.700829182905140222");

    let error = null;
    try {
      await calculate(overflowExp);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should fail for an exponent lower than -41.446531673892822312", async () => {
    const underflowExp = new helper.Decimal("-41.446531673892822313");

    let error = null;
    try {
      await calculate(underflowExp);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate max exponent 130.700829182905140221 correctly", async () => {
    const maxExp = new helper.Decimal("130.700829182905140221");

    const result = await calculate(maxExp);

    //Check relative error is less or equal to 2e-18
    assert.isAtMost(
      result.relativeError,
      2e-18,
      `Relative error is not less or equal than 2e-18 for ${maxExp.toString()} exp.
       Reports ${result.solution.toString()} instead of ${result.exact.toString()}`
    );
  });
  it("should calculate min exponent -41.446531673892822312 correctly", async () => {
    const minExp = new helper.Decimal("-41.446531673892822312");

    const result = await calculate(minExp);

    //Check relative error is less or equal to 2e-18
    assert.isAtMost(
      result.relativeError,
      2e-18,
      `Relative error is not less or equal than 2e-18 for ${minExp.toString()} exp.
       Reports ${result.solution.toString()} instead of ${result.exact.toString()}`
    );
  });
});
