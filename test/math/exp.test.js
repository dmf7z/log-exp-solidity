const LogExpMath = artifacts.require("LogExpMath");
const {
  Decimal,
  checkError,
  to18Decimals,
  createRandomNum,
  E,
  TOTAL_TEST_LOOP,
} = require("../helper");

const calculate = async (x, y) => {
  const instance = await LogExpMath.deployed();
  //Execute natural exp function
  const solution = await instance.exp.call(to18Decimals(x), to18Decimals(y));
  //Calculate result with Decimal library
  const exact = Decimal(x).pow(y);
  return {
    solution,
    exact,
  };
};

const getMaxY =  (x) => {
  return Decimal("130.700829182905140221")
    .div(Decimal.ln(new Decimal(x)))
    .toFixed(18, 1);
};

contract("LogExpMath Exponential", (accounts) => {
  it("should calculate random numbers for x between 0 and 578960446186580977117854925043439539266.349923328202820000 correctly", async () => {
    for (let index = 0; index < TOTAL_TEST_LOOP; index++) {
      //Create random exp
      const randomArg = createRandomNum(
        "0",
        "578960446186580977117854925043439539266.349923328202820000"
      );
      //Get max y
      const maxY = getMaxY(randomArg);
      const randomArg2 = createRandomNum("0", maxY);
      //Get function result
      const result = await calculate(randomArg, randomArg2);
      //Check error
      checkError(
        "exp",
        `(${randomArg}, ${randomArg2})`,
        result.solution,
        result.exact,
        114
      );
    }
  });
  it("should fail max log(x) with y > 1.464364549726110626", async () => {
    const x = "578960446186580977117854925043439539266.349923328202820000";
    const y = "1.464364549726110627";
    let error = null;
    try {
      await calculate(x, y);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate max log(x) with y = 1.464364549726110626 correctly", async () => {
    const x = "578960446186580977117854925043439539266.349923328202820000";
    const y = "1.464364549726110626";
    const result = await calculate(x, y);

    //Check error
    checkError("exp", `(${x}, ${y})`, result.solution, result.exact, 1);
  });
  it("should fail log(x) = 0.000000000000000001 and y >= 130700829182905140221", async () => {
    const x = "1.000000000000000002";
    const y = "130700829182905140222";
    let error = null;
    try {
      await calculate(x, y);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate log(x) = 0.000000000000000001 and y = 130700829182905140221 correctly", async () => {
    const x = "1.000000000000000001";
    const y = "130700829182905140221";
    const result = await calculate(x, y);
    //Check error
    checkError("exp", `(${x}, ${y})`, result.solution, result.exact, 114);
  });
});
