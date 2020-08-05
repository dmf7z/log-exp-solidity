pragma solidity ^0.5.7;

library LogExpMath {
    
    uint256 constant PRECISION = 10**18; 
   
    uint256 constant x0 = 128000000000000000000;
    uint256 constant a0 = 38877084059945950920000000000000000000000000000000000000;
    uint256 constant x1 = 64000000000000000000;
    uint256 constant a1 = 6235149080811616883000000000;
    uint256 constant x2 = 32000000000000000000;
    uint256 constant a2 = 78962960182680695160000000000000;
    uint256 constant x3 = 16000000000000000000;
    uint256 constant a3 = 8886110520507872637000000;
    uint256 constant x4 = 8000000000000000000;
    uint256 constant a4 = 2980957987041728275000;
    uint256 constant x5 = 4000000000000000000;
    uint256 constant a5 = 54598150033144239080;
    uint256 constant x6 = 2000000000000000000;
    uint256 constant a6 = 7389056098930650227;
    uint256 constant x7 = 1000000000000000000;
    uint256 constant a7 = 2718281828459045235;
    uint256 constant x8 = 500000000000000000;
    uint256 constant a8 = 1648721270700128146;
    uint256 constant x9 = 250000000000000000;
    uint256 constant a9 = 1284025416687741484;

    function exp(uint256 x) public pure returns (uint256) {
        uint256 ans = PRECISION;
        uint256 last = 1;
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
        uint256 s = PRECISION;
        uint256 t = x;
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
}