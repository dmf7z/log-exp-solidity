const LogExpMath = artifacts.require("LogExpMath");
var Decimal = require("decimal.js");
Decimal.set({ precision: 72 });
const BigNumber = require("bignumber.js");
BigNumber.config({ DECIMAL_PLACES: 18 });

//2^256 / 10^36
const MAX_WHOLE = new BigNumber(115792089237316195423570985008687907853269);

contract("LogExpMath Natural Logarithm", (accounts) => {
  it("100 random numbers between 1 and (2ˆ256 - 1) / 10ˆ18", async () => {
    const instance = await LogExpMath.deployed();

    for (let index = 0; index < 100; index++) {
      //Create random exp
      const randomWholeNum = MAX_WHOLE.times(Decimal.random()).plus(1);
      const randomDecimalsNum = BigNumber.random();
      const randomNum = randomDecimalsNum.plus(randomWholeNum);

      //Execute natural exp function
      const result1 = await instance.log.call(
        randomNum.toFixed(18, 1).replace(".", "")
      );

      //Calculate result with Decimal library
      const result2 = Decimal.ln(randomNum.toString());

      //Calculate the difference
      const relativeError = new BigNumber(1)
        .minus(
          new BigNumber(result1.toString())
            .div("1000000000000000000")
            .div(result2.toFixed(18, 1))
        )
        .absoluteValue()
        .toNumber();

      //Check relative error is less or equal to 1e-18
      assert.isAtMost(
        relativeError,
        1e-18,
        `Relative error is not less or equal than 1e-18 for ln(${randomNum.toString()}).`
      );
    }
  });
  it("100 random numbers between 0 an 1", async () => {
    const instance = await LogExpMath.deployed();

    for (let index = 0; index < 100; index++) {
      //Create random num
      const randomNum = BigNumber.random();

      //Execute natural exp function
      const result1 = await instance.log.call(
        randomNum.toFixed(18, 1).replace(".", "")
      );

      //Calculate result with Decimal library
      const result2 = Decimal.ln(randomNum.toString());

      //Calculate the difference
      const relativeError = new BigNumber(1)
        .minus(
          new BigNumber(result1.toString())
            .div("1000000000000000000")
            .div(result2.toFixed(18, 1))
        )
        .absoluteValue()
        .toNumber();

      //Check relative error is less or equal to 7.04e-14
      assert.isAtMost(
        relativeError,
        7.04e-14,
        `Relative error is not less or equal than 7.04e-14 for ln(${randomNum.toString()}).`
      );
    }
  });
});
