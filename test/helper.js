const Decimal = require("decimal.js");
Decimal.set({ precision: 72 });
const BigNumber = require("bignumber.js");
BigNumber.config({ DECIMAL_PLACES: 18 });

const isNegative = (num) => {
  return num.toString().charAt(0) == "-";
};

const getFirst18DigitsDifference = (solution, exact) => {
  const solutionTruncated = solution
    .toString()
    .replace("-", "")
    .substring(0, 18);
  const exactTruncated = exact
    .toFixed(71, 1)
    .toString()
    .replace("-", "")
    .replace(".", "")
    .replace(/^0+/, "")
    .substring(0, solutionTruncated.length);

  return new BigNumber(solutionTruncated)
    .minus(exactTruncated)
    .absoluteValue()
    .toNumber();
};

module.exports = {
  TOTAL_TEST_LOOP: 100,
  E: "2.7182818284590452353602874713526624977572470936999595",
  Decimal: Decimal,
  BigNumber: BigNumber,
  createRandomNum: (max, min = 0) => {
    const randomWhole = (
      Math.floor(Math.random() * (max - min + 1)) + min
    ).toString();
    const randomDecimal = BigNumber.random();
    return randomDecimal.plus(randomWhole);
  },
  createRandomNumGreaterThanOne: (max) => {
    const randomWhole = max
      .minus(1)
      .div(new BigNumber(10).pow(Math.floor(Math.random() * 36) + 1))
      .times(Decimal.random());
    const randomDecimals = BigNumber.random();
    return randomDecimals.plus(randomWhole);
  },
  checkError: (func, argument, solution, exact, max) => {
    const message = `Function ${func} for ${argument} reports ${solution.toString()} and exact solution ${exact.toFixed(
      18,
      1
    )}`;
    expect(isNegative(solution)).to.equal(
      isNegative(exact),
      `${message} has a different sign.`
    );
    expect(
      getFirst18DigitsDifference(solution, exact),
      `${message} has a bigger difference than |${max}| in the digit 18.`
    ).to.be.within(0, max);
  },
};
