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
  //Execute exp function
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
  it("should calculate random numbers for x between 0 and max int256 correctly", async () => {
    for (let index = 0; index < TOTAL_TEST_LOOP; index++) {
      //Create random x
      const randomX = createRandomNum(
        "0",
        "57896044618658097711785492504343953926634992332820282019728.792003956564819967"
      );
      //Get max y
      const maxY = getMaxY(randomX);
      const randomY = createRandomNum("0", maxY);
      //Get function result
      const result = await calculate(randomX, randomY);
      //Check error
      checkError(
        "exp",
        `(${randomX}, ${randomY})`,
        result.solution,
        result.exact,
        2
      );
    }
  });
  it("should fail x=[max int256] and y > 0.965964774603728197", async () => {
    const x = "57896044618658097711785492504343953926634992332820282019728.792003956564819967";
    const y = "0.965964774603728198";
    let error = null;
    try {
      await calculate(x, y);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate x=[max int256] and y = 0.965964774603728197 correctly", async () => {
    const x = "57896044618658097711785492504343953926634992332820282019728.792003956564819967";
    const y = "0.965964774603728197";
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
  it("should fail x = 0.000000000000000001 and y >= 1", async () => {
    const x = "0.000000000000000001";
    const y = "2";
    let error = null;
    try {
      await calculate(x, y);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an("Error");
  });
  it("should calculate x = 0.000000000000000001 and y = 1 correctly", async () => {
    const x = "0.000000000000000001";
    const y = "1";
    const result = await calculate(x, y);
    //Check error
    checkError("exp", `(${x}, ${y})`, result.solution, result.exact, 114);
  });

});
