const LogExpMath = artifacts.require("LogExpMath");
const {
  Decimal,
  checkError,
  to18Decimals,
  createRandomNumGreaterThanOne,
  TOTAL_TEST_LOOP,
  createRandomNum,
} = require("../helper");

const calculate = async (num) => {
  const instance = await LogExpMath.deployed();
  //Execute natural log function
  const solution = await instance.n_log.call(to18Decimals(num));
  //Calculate log with Decimal library
  const exact = Decimal.ln(new Decimal(num));
  return {
    solution,
    exact,
  };
};

contract("LogExpMath Natural Logarithm", (accounts) => {
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
  it("hould calculate random numbers between 0 an 1 correctly", async () => {
    for (let index = 0; index < TOTAL_TEST_LOOP; index++) {
      //Create random num
      const randomArg = Decimal.random().toFixed(18, 1);
      //Get function result
      const result = await calculate(randomArg);
      //Check error
      checkError("n_log", randomArg, result.solution, result.exact, 1);
    }
  });
  it("should fail for an argument greater than 578960446186580977117854925043439539266.349923328202820000", async () => {
    const overflowArg =
      "578960446186580977117854925043439539266.349923328202820001";
    let error = null;
    try {
      await calculate(overflowArg);
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
  it("should calculate max argument 578960446186580977117854925043439539266.349923328202820000 correctly", async () => {
    const maxArg = "578960446186580977117854925043439539266.349923328202820000";
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
