# log-exp-solidity
Ethereum library for logarithm and exponential functions with 18 decimal precision.

## Overview

This library provides math functions for natural logarithm and exponentiation, as well as logarithm and exponentiation for general positive bases. It implements low gas cost solutions, while returning low relative errors when possible.

## Functions

For all of the following inputs and outputs, the last 18 decimal digits are interpreted
as the fractional part of a real number.

* Natural exponentiation

```function n_exp(int256 x) public pure returns (int256)```

Computes exp(x). The input must be between -41.446531673892822312 and 130.700829182905140221.

* Natural logarithm

```function n_log(int256 a) public pure returns (int256)```

Computes ln(a). The input must be positive.

* General exponentiation

```function exp(int256 x, int256 y) public pure returns (int256)```

Computes x to the power of y. The input x must be positive and log(x)y, interpreted as real numbers, must be between -41.446531673892822312 and 130.700829182905140221.

* General logarithm

```function log(int256 base, int256 arg) public returns (int256)```

Computes the logarithm of arg for the input base. Both inputs must be positive.


## The algorithms

* Natural exponentiation

For negative inputs, it returns the inverse of n_exp(-x).
For positive inputs, the algorithm has two stages. On a first stage it progressively reduces the input making use of the property exp(x+w) = exp(x)exp(w). To do it efficiently, we think of x as a sum of powers of 2, and progressively multiply the answer variable by the corresponding precomputed numbers exp(power of 2) from high to low. On the second stage, the resulting x variable is now small enough so that a Taylor expansion converges rapidly.

* Natural logarithm

The algorithm is very similar to the one used for natural exponentiation. For arguments less than 1, it returns minus the result for the multiplicative inverse. For greater than 1 arguments, it has two stages analogous to those in n_exp. For the second stage, we use the Taylor expansion of Log((1+z)/(1-z)), and the change of variables z = (a-1) / (a+1).

* General exponentiation

It computes x^y as exp(log(x)y). To do so, it is important that log(x) has low computational relative error. Thus, if x is close to 1 it internally computes log(x) with
more than 18 digits of precision after the decimal point.

* General logarithm

It computes log_base(arg) as log(arg)/log(base). To do so, it is important that both
log(arg) and log(base) have low computational relative error. Thus, whenever one argument is close to 1, it internally computes the log with more than 18 digits of precision after the decimal point.

## Error

For each function, we give an upper bound for the relative error, defined as 
|(computed result) / (real result) - 1|. However this upper bound does not necessarily hold when the real results are so small that it may be impossible to achieve such a relative error using only 18 digits for the fractional part. In these cases, the library shows the exact digits of the decimal expansion, with only a rounding error in the last digit.

Maximum relative errors for each function (up to the exception above)

n-exp 10^(-17)
n-log 10^(-17)
exp
log

Note: since this library is optimized for real values, it is possible that the result of an exponentiation between two natural numbers is not a natural number.

## Gas profiling

