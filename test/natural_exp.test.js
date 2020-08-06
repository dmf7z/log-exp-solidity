const LogExpMath = artifacts.require("LogExpMath");
var Decimal = require("decimal.js");
Decimal.set({ precision: 72 });
const BigNumber = require("bignumber.js");
BigNumber.config({ DECIMAL_PLACES: 18 });

const MAX_EXPONENT = 135;

contract("LogExpMath Natural Exponential", (accounts) => {
  it("random 1000 exps", async () => {
    const instance = await LogExpMath.deployed();

    for (let index = 0; index < 1000; index++) {

      //Create random exp
      const randomWholeExp =  Math.floor(
        Math.random() * MAX_EXPONENT
      ).toString();
      const randomWholeDecimals = BigNumber.random();
      const randomExp = randomWholeDecimals.plus(randomWholeExp);

      //Execute natural exp function
      const result1 = await instance.exp.call(
        randomExp.toFixed(18).replace(".", "")
      );

      //Calculate result with Decimal library
      const result2 = Decimal("2.7182818284590452353602874713526624977572470936999595")
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

      //Check relative error is less or equal to 9e-18
      assert.isAtMost(
        relativeError,
        9e-18,
        `Relative error is not less or equal than 9e-18 for ${randomExp.toString()} exp.`
      );
    }
  });
});
