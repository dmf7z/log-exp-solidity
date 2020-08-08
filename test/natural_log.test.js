const LogExpMath = artifacts.require("LogExpMath");
const helper = require("./helper");

const calculate = async (num) => {
  const instance = await LogExpMath.deployed();

  //Execute natural log function
  const solution = await instance.n_log.call(num.toFixed(18, 1).replace(".", ""));

  //Calculate log with Decimal library
  const exact = helper.Decimal.ln(num.toString());

  //Calculate relative error
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

contract("LogExpMath Natural Logarithm", (accounts) => {
  it("should calculate 100 random numbers between 1 and (2ˆ256 - 1) / 10ˆ18 correctly", async () => {
    for (let index = 0; index < helper.TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomNum = helper.createRandomNumGreaterThanOne(helper.MAX_WHOLE_LOG);

      //Get function result
      const result = await calculate(randomNum);

      //Check relative error is less or equal to 1e-18
      assert.isAtMost(
        result.relativeError,
        1e-18,
        `Relative error is not less or equal than 1e-18 for ${randomNum.toString()} exp.
         Reports ${result.solution.toString()} instead of ${result.exact.toString()}`
      );
    }
  });
  it("hould calculate 100 random numbers between 0 an 1 correctly", async () => {
    for (let index = 0; index < helper.TOTAL_TEST_LOOP; index++) {
      //Create random num
      const randomNum = helper.BigNumber.random();

      //Get function result
      const result = await calculate(randomNum);

       //Check difference is +1 or -1 
       expect(
        new helper.Decimal(result.solution.toString())
          .minus(result.exact.times(helper.PRECISION).toFixed(0, 1))
          .absoluteValue()
          .toNumber(),
        `Reported ${result.solution.toString()} vs ${result.exact.toFixed(
          18,
          1
        )} do not have a +1 or -1 difference.`
      ).to.be.within(0, 1);

    }
  });
  it("should fail for an argument greater than 578960446186580977117854925043439539266.349923328202820000", async () => {
    const overflowExp = new helper.BigNumber(
      "578960446186580977117854925043439539266.349923328202820001"
    );

    let error = null;
    try {
      await calculate(overflowExp);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should fail for an argument equal to 0", async () => {
    const underflowExp = new helper.BigNumber("0");

    let error = null;
    try {
      await calculate(underflowExp);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should fail for an argument less than 0", async () => {
    const underflowExp = new helper.BigNumber("-1");

    let error = null;
    try {
      await calculate(underflowExp);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate max argument 578960446186580977117854925043439539266.349923328202820000 correctly", async () => {
    const maxExp = new helper.BigNumber(
      "578960446186580977117854925043439539266.349923328202820000"
    );

    const result = await calculate(maxExp);

    //Check relative error is less or equal to 1e-18
    assert.isAtMost(
      result.relativeError,
      1e-18,
      `Relative error is not less or equal than 1e-18 for ${maxExp.toString()} exp.
       Reports ${result.solution.toString()} instead of ${result.exact.toString()}`
    );
  });
  it("should calculate min argument 0.000000000000000001 correctly", async () => {
    const minExp = new helper.BigNumber("0.000000000000000001");

    const result = await calculate(minExp);

    //Check relative error is less or equal to 1e-18
    assert.isAtMost(
      result.relativeError,
      1e-18,
      `Relative error is not less or equal than 1e-18 for ${minExp.toString()} exp.
       Reports ${result.solution.toString()} instead of ${result.exact.toString()}`
    );
  });
});
