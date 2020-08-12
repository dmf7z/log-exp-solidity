const Decimal = require("decimal.js");
Decimal.set({ precision: 72 });

const isNegative = (num) => {
  return num.toString().charAt(0) == "-";
};

const to18Decimals = (num) => {
  const sign = isNegative(num) ? "-" : "";
  return (
    sign +
    new Decimal(num)
      .toFixed(18, 1)
      .toString()
      .replace("-", "")
      .replace(".", "")
      .replace(/^0+/, "")
  );
};

const getFirst18DigitsDifference = (solution, exact) => {
  const solutionTruncated = solution.toString().substring(0, 18);
  const exactTruncated = to18Decimals(exact).substring(
    0,
    solutionTruncated.length
  );
  return new Decimal(solutionTruncated)
    .minus(exactTruncated)
    .absoluteValue()
    .toNumber();
};

module.exports = {
  TOTAL_TEST_LOOP: 10,
  E: "2.7182818284590452353602874713526624977572470936999595",
  Decimal: Decimal,
  to18Decimals,

  //Math.random() * (max - min) + min;
  createRandomNum: (min, max) => {
    const wholeDigitsLength = Decimal.floor(max).toFixed(0, 1).toString()
      .length;
    const random = Decimal.random()
      .times(Decimal(max).minus(min))
      .plus(min)
      .div(new Decimal(10).pow(Math.random() * wholeDigitsLength))
      .toFixed(18, 1);
    return random;
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
