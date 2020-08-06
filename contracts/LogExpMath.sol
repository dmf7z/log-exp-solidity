pragma solidity ^0.5.7;

library LogExpMath {
    
    int256 constant PRECISION = 10**18; 
    int256 constant x0 = 128000000000000000000;
    int256 constant a0 = 38877084059945950920000000000000000000000000000000000000;
    int256 constant x1 = 64000000000000000000;
    int256 constant a1 = 6235149080811616883000000000;
    int256 constant x2 = 32000000000000000000;
    int256 constant a2 = 78962960182680695160000000000000;
    int256 constant x3 = 16000000000000000000;
    int256 constant a3 = 8886110520507872637000000;
    int256 constant x4 = 8000000000000000000;
    int256 constant a4 = 2980957987041728275000;
    int256 constant x5 = 4000000000000000000;
    int256 constant a5 = 54598150033144239080;
    int256 constant x6 = 2000000000000000000;
    int256 constant a6 = 7389056098930650227;
    int256 constant x7 = 1000000000000000000;
    int256 constant a7 = 2718281828459045235;
    int256 constant x8 = 500000000000000000;
    int256 constant a8 = 1648721270700128146;
    int256 constant x9 = 250000000000000000;
    int256 constant a9 = 1284025416687741484;
    int256 constant x10 = 125000000000000000;
    int256 constant a10 = 1133148453066826316;
    int256 constant x11 = 62500000000000000;
    int256 constant a11 = 1064494458917859429;

    function exp(int256 x) public pure returns (int256) {
        require( x < 135 * PRECISION, "Exponent must be less than 135");
        if (x < 0) return (PRECISION * PRECISION / exp(-x));
        int256 ans = PRECISION;
        int256 last = 1;
        if(x >= x0) {
            last = a0;
            x -= x0;
        }
        if(x >= x1) {
            last *=  a1;
            x -=  x1;
        }
        if(x >= x2) {
            ans = ans * a2 / PRECISION;
            x -=  x2;
        }
        if(x >= x3) {
            ans = ans * a3 / PRECISION;
            x -=  x3;
        }
        if(x >= x4) {
            ans = ans * a4 / PRECISION;
            x -=  x4;
        }
        if(x >= x5) {
            ans = ans * a5 / PRECISION;
            x -=  x5;
        }
        if(x >= x6) {
            ans = ans * a6 / PRECISION;
            x -=  x6;
        }
        if(x >= x7) {
            ans = ans * a7 / PRECISION;
            x -=  x7;
        }
        if(x >= x8) {
            ans = ans * a8 / PRECISION;
            x -=  x8;
        }
        if(x >= x9) {
            ans = ans * a9 / PRECISION;
            x -=  x9;
        }
        int256 s = PRECISION;
        int256 t = x;
        s += t;
        t = (t * x / 2) / PRECISION;
        s += t;
        t = (t * x / 3) / PRECISION;
        s += t;
        t = (t * x / 4) / PRECISION;
        s += t;
        t = (t * x / 5) / PRECISION;
        s += t;
        t = (t * x / 6) / PRECISION;
        s += t;
        t = (t * x / 7) / PRECISION;
        s += t;
        t = (t * x / 8) / PRECISION;
        s += t;
        t = (t * x / 9) / PRECISION;
        s += t;
        t = (t * x / 10) / PRECISION;
        s += t;
        t = (t * x / 11) / PRECISION;
        s += t;
        t = (t * x / 12) / PRECISION;
        s += t;
        return ( (ans * s / PRECISION) * last);
    }

    function log(int256 a) public pure returns (int256) {
        require( a > 0, "Positive argument required");
        if (a < PRECISION) return (-log(PRECISION * PRECISION / a));
        int256 ans = 0;
        if(a >= a0 * PRECISION) {
            ans += x0;
            a /= a0;
        }
        if(a >= a1 * PRECISION) {
            ans += x1;
            a /= a1;
        }
        if(a >= a2) {
            ans += x2;
            a = a * PRECISION / a2 ;
        }
        if(a >= a3) {
            ans += x3;
            a = a * PRECISION / a3 ;
        }
        if(a >= a4) {
            ans += x4;
            a = a * PRECISION / a4 ;
        }
        if(a >= a5) {
            ans += x5;
            a = a * PRECISION / a5 ;
        }
        if(a >= a6) {
            ans += x6;
            a = a * PRECISION / a6 ;
        }
        if(a >= a7) {
            ans += x7;
            a = a * PRECISION / a7 ;
        }
        if(a >= a8) {
            ans += x8;
            a = a * PRECISION / a8 ;
        }
        if(a >= a9) {
            ans += x9;
            a = a * PRECISION / a9 ;
        }
        if(a >= a10) {
            ans += x10;
            a = a * PRECISION / a10 ;
        }
        if(a >= a11) {
            ans += x11;
            a = a * PRECISION / a11;
        }
        int256 z = PRECISION * (a - PRECISION) / (a + PRECISION);
        int256 s = z;
        int256 z_squared = z * z / PRECISION;
        int256 t = z * z_squared / PRECISION;
        s += t / 3;
        t = t * z_squared / PRECISION;
        s += t / 5;
        t = t * z_squared / PRECISION;
        s += t / 7;
        t = t * z_squared / PRECISION;
        s += t / 9;
        t = t * z_squared / PRECISION;
        s += t / 11;
        t = t * z_squared / PRECISION;
        s += t / 13;
        t = t * z_squared / PRECISION;
        s += t / 15;
        t = t * z_squared / PRECISION;
        s += t / 17;
        t = t * z_squared / PRECISION;
        s += t / 19;
        t = t * z_squared / PRECISION;
        s += t / 21;
        t = t * z_squared / PRECISION;
        s += t / 23;
        return ans + 2 * s;
    }
}
