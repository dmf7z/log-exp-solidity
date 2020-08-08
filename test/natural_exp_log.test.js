const LogExpMath = artifacts.require("LogExpMath");
const helper = require("./helper");

const calculateExpLog = async (exponent) => {
  const instance = await LogExpMath.deployed();

  //Execute natural exp function
  const solutionExp = await instance.n_exp.call(
    exponent.toFixed(18, 1).replace(".", "")
  );

  //Execute natural log function
  const solution = await instance.n_log.call(solutionExp);

  //Calculate relative error
  const relativeError = new helper.BigNumber(1)
    .minus(
      new helper.BigNumber(solution.toString())
        .div("1000000000000000000")
        .div(exponent.toFixed(18, 1))
    )
    .absoluteValue()
    .toNumber();

  return {
    solution,
    exact: exponent,
    relativeError,
  };
};

const calculateLogExp = async (num) => {
  const instance = await LogExpMath.deployed();

  //Execute natural log function
  const solutionLog = await instance.n_log.call(
    num.toFixed(18, 1).replace(".", "")
  );

  //Execute natural exp function
  const solution = await instance.n_exp.call(solutionLog);

  //Calculate relative error
  const relativeError = new helper.BigNumber(1)
    .minus(
      new helper.BigNumber(solution.toString())
        .div("1000000000000000000")
        .div(num.toFixed(18, 1))
    )
    .absoluteValue()
    .toNumber();

  return {
    solution,
    exact: num,
    relativeError,
  };
};

contract("LogExpMath Natural Logarithm and Exponential", (accounts) => {
  it("should calculate log(exp(x)) for random numbers between 0 and 88 correctly", async () => {
    for (let index = 0; index < helper.TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomExp = helper.createRandomExponent(helper.MAX_EXPONENT_LOGEXP);

      //Get function result
      const result = await calculateExpLog(randomExp);

      //Check error es +2 or -2 difference
      expect(
        new helper.Decimal(result.solution.toString())
          .minus(result.exact.times(helper.PRECISION).toFixed(0, 1))
          .absoluteValue()
          .toNumber(),
        `Reported ${result.solution.toString()} vs ${result.exact.toFixed(
          18,
          1
        )} do not have a +3 or -3 difference.`
      ).to.be.within(0, 3);
    }
  });
  it("should calculate exp(log(x)) for random numbers between 1 and (2ˆ256 - 1) / 10ˆ18 correctly", async () => {
    for (let index = 0; index < helper.TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomNum = helper.createRandomNumGreaterThanOne(helper.MAX_WHOLE_LOG);

      //Get function result
      const result = await calculateLogExp(randomNum);

      //Check relative error is less or equal to 1e-18
      assert.isAtMost(
        result.relativeError,
        3e-18,
        `Relative error is not less or equal than 1e-18 for ${randomNum.toString()} exp.
         Reports ${result.solution.toString()} instead of ${result.exact.toString()}`
      );
    }
  });
  it("should calculate exp(log(x)) for random numbers between 0 and 1 correctly", async () => {
    for (let index = 0; index < helper.TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomNum = helper.BigNumber.random();

      //Get function result
      const result = await calculateLogExp(randomNum);

      //Check relative error is less or equal to 1e-18
      assert.isAtMost(
        result.relativeError,
        3e-18,
        `Relative error is not less or equal than 1e-18 for ${randomNum.toString()} exp.
         Reports ${result.solution.toString()} instead of ${result.exact.toString()}`
      );
    }
  });
});
