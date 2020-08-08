var Decimal = require("decimal.js");
Decimal.set({ precision: 72 });
const BigNumber = require("bignumber.js");
BigNumber.config({ DECIMAL_PLACES: 18 });

module.exports = {
  TOTAL_TEST_LOOP: 100,
  MAX_EXPONENT: 130,
  MIN_EXPONENT: -41,
  MAX_EXPONENT_LOGEXP: 88, //Max: 89.254297509012317908710
  MAX_WHOLE_LOG: new BigNumber(578960446186580977117854925043439539266), //MAX: (2^255 -1) / (10^20 * 10^18)
  E: "2.7182818284590452353602874713526624977572470936999595",
  PRECISION: "1000000000000000000", //10^18
  Decimal: Decimal,
  BigNumber: BigNumber,
  createRandomExponent: (max, min = 0) => {
    const randomWholeExp = Math.floor(Math.random() * max).toString();
    const randomDecimalsExp = BigNumber.random();
    return randomDecimalsExp.plus(randomWholeExp).plus(min);
  },
  createRandomNumGreaterThanOne: (max) => {
    const randomWholeNum = max
      .minus(1)
      .div(new BigNumber(10).pow(Math.floor(Math.random() * 36) + 1))
      .times(Decimal.random());
    const randomDecimalsNum = BigNumber.random();
    return randomDecimalsNum.plus(randomWholeNum);
  },
};
