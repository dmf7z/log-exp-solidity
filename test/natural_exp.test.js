const LogExpMath = artifacts.require("LogExpMath");
var Decimal = require("decimal.js");
Decimal.set({ precision: 72 });
const BigNumber = require("bignumber.js");
BigNumber.config({ DECIMAL_PLACES: 18 });

const MAX_EXPONENT = 135;

contract("LogExpMath Natural Exponential", (accounts) => {
  it("random 500 exps", async () => {
    const instance = await LogExpMath.deployed();

    for (let index = 0; index < 500; index++) {

      //Create random exp
      const randomWholeExp = Math.floor(
        Math.random() * MAX_EXPONENT
      ).toString();
      const randomWholeDecimals = BigNumber.random();
      const randomExp = randomWholeDecimals.plus(randomWholeExp);

      //Execute natural exp function
      const result1 = await instance.exp.call(
        randomExp.toFixed(18).replace(".", "")
      );

      //Calculate result with Decimal library
      const result2 = Decimal("2.718281828459045235")
        .pow(randomExp.toString())
        .toString();

      //Calculate the difference
      const relativeError = new BigNumber(1)
        .minus(
          new BigNumber(result1.toString())
            .div("1000000000000000000")
            .div(result2.toString())
        )
        .absoluteValue()
        .toNumber();

      //Check relative error is less or equal to 2.4 × 10^-18
      assert.isAtMost(
        relativeError,
        1.7e-17,
        `Relative error is not less or equal than 2.4 × 10^-18 for ${randomExp.toString()} exp.`
      );
    }
  });
});
