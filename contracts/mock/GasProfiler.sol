pragma solidity ^0.5.7;

contract GasProfiler {
    int256 constant TEN_POWER17 = 10**17;
    int256 constant MAX_DECIMALS = 10**18;
    int256 constant MAX_DECIMALS_DOUBLE = 10**36;
    int256 constant PRECISION = 10**20;

    int256 constant x0 = 12800000000000000000000;
    int256 constant a0 = 38877084059945950922200000000000000000000000000000000000;
    int256 constant x1 = 6400000000000000000000;
    int256 constant a1 = 6235149080811616882910000000;
    int256 constant x2 = 3200000000000000000000;
    int256 constant a2 = 7896296018268069516100000000000000;
    int256 constant x3 = 1600000000000000000000;
    int256 constant a3 = 888611052050787263676000000;
    int256 constant x4 = 800000000000000000000;
    int256 constant a4 = 298095798704172827474000;
    int256 constant x5 = 400000000000000000000;
    int256 constant a5 = 5459815003314423907810;
    int256 constant x6 = 200000000000000000000;
    int256 constant a6 = 738905609893065022723;
    int256 constant x7 = 100000000000000000000;
    int256 constant a7 = 271828182845904523536;
    int256 constant x8 = 50000000000000000000;
    int256 constant a8 = 164872127070012814685;
    int256 constant x9 = 25000000000000000000;
    int256 constant a9 = 128402541668774148407;
    int256 constant x10 = 12500000000000000000;
    int256 constant a10 = 113314845306682631683;
    int256 constant x11 = 6250000000000000000;
    int256 constant a11 = 106449445891785942956;

    function n_exp(int256 x) public returns (int256) {
        require(
            x >= -41446531673892822312 && x <= 130700829182905140221,
            "Natural exp argument must be between -41.446531673892822312 and 130.700829182905140221"
        );
        if (x < 0) return (MAX_DECIMALS_DOUBLE / n_exp(-x));
        x *= 100;
        int256 ans = PRECISION;
        int256 last = 1;
        if (x >= x0) {
            last = a0;
            x -= x0;
        }
        if (x >= x1) {
            last *= a1;
            x -= x1;
        }
        if (x >= x2) {
            ans = (ans * a2) / PRECISION;
            x -= x2;
        }
        if (x >= x3) {
            ans = (ans * a3) / PRECISION;
            x -= x3;
        }
        if (x >= x4) {
            ans = (ans * a4) / PRECISION;
            x -= x4;
        }
        if (x >= x5) {
            ans = (ans * a5) / PRECISION;
            x -= x5;
        }
        if (x >= x6) {
            ans = (ans * a6) / PRECISION;
            x -= x6;
        }
        if (x >= x7) {
            ans = (ans * a7) / PRECISION;
            x -= x7;
        }
        if (x >= x8) {
            ans = (ans * a8) / PRECISION;
            x -= x8;
        }
        if (x >= x9) {
            ans = (ans * a9) / PRECISION;
            x -= x9;
        }
        int256 s = PRECISION;
        int256 t = x;
        s += t;
        t = ((t * x) / 2) / PRECISION;
        s += t;
        t = ((t * x) / 3) / PRECISION;
        s += t;
        t = ((t * x) / 4) / PRECISION;
        s += t;
        t = ((t * x) / 5) / PRECISION;
        s += t;
        t = ((t * x) / 6) / PRECISION;
        s += t;
        t = ((t * x) / 7) / PRECISION;
        s += t;
        t = ((t * x) / 8) / PRECISION;
        s += t;
        t = ((t * x) / 9) / PRECISION;
        s += t;
        t = ((t * x) / 10) / PRECISION;
        s += t;
        t = ((t * x) / 11) / PRECISION;
        s += t;
        t = ((t * x) / 12) / PRECISION;
        s += t;
        return (((ans * s) / PRECISION) * last) / 100;
    }

    function n_log(int256 a) public returns (int256) {
        require(
            a > 0 &&
                a <= 578960446186580977117854925043439539266349923328202820000,
            "Natural log argument must be between 0 and 578960446186580977117854925043439539266.349923328202820000"
        );
        a *= 100;
        if (a < PRECISION) return (-n_log((PRECISION * PRECISION) / (100 * a)));
        int256 ans = 0;
        if (a >= a0 * PRECISION) {
            ans += x0;
            a /= a0;
        }
        if (a >= a1 * PRECISION) {
            ans += x1;
            a /= a1;
        }
        if (a >= a2) {
            ans += x2;
            a = (a * PRECISION) / a2;
        }
        if (a >= a3) {
            ans += x3;
            a = (a * PRECISION) / a3;
        }
        if (a >= a4) {
            ans += x4;
            a = (a * PRECISION) / a4;
        }
        if (a >= a5) {
            ans += x5;
            a = (a * PRECISION) / a5;
        }
        if (a >= a6) {
            ans += x6;
            a = (a * PRECISION) / a6;
        }
        if (a >= a7) {
            ans += x7;
            a = (a * PRECISION) / a7;
        }
        if (a >= a8) {
            ans += x8;
            a = (a * PRECISION) / a8;
        }
        if (a >= a9) {
            ans += x9;
            a = (a * PRECISION) / a9;
        }
        if (a >= a10) {
            ans += x10;
            a = (a * PRECISION) / a10;
        }
        if (a >= a11) {
            ans += x11;
            a = (a * PRECISION) / a11;
        }
        int256 z = (PRECISION * (a - PRECISION)) / (a + PRECISION);
        int256 s = z;
        int256 z_squared = (z * z) / PRECISION;
        int256 t = (z * z_squared) / PRECISION;
        s += t / 3;
        t = (t * z_squared) / PRECISION;
        s += t / 5;
        t = (t * z_squared) / PRECISION;
        s += t / 7;
        t = (t * z_squared) / PRECISION;
        s += t / 9;
        t = (t * z_squared) / PRECISION;
        s += t / 11;
        t = (t * z_squared) / PRECISION;
        s += t / 13;
        t = (t * z_squared) / PRECISION;
        s += t / 15;
        return (ans + 2 * s) / 100;
    }

    function power(int256 x, int256 y) public returns (int256) {
        require( 0 <= x, "x must be positive");
        int256 logx_times_y;
        if (MAX_DECIMALS - TEN_POWER17 < x && x < MAX_DECIMALS + TEN_POWER17) {
            int256 logbase = n_log_36(x);
            logx_times_y = ( (logbase / MAX_DECIMALS) * y + (logbase % MAX_DECIMALS) * y / MAX_DECIMALS ) / MAX_DECIMALS;
        } else {
            logx_times_y = n_log(x) * y / MAX_DECIMALS;
        }
        require(
            logx_times_y >= -41446531673892822312 && logx_times_y <= 130700829182905140221,
            "log(x) times y must be between -41.446531673892822312 and 130.700829182905140221"
        );
        int256 result = n_exp( logx_times_y );  
        emit showResult(result);
        return result;
    }

    function log(int256 base, int256 arg) public returns (int256) {
        int256 logbase;
        if (MAX_DECIMALS - TEN_POWER17 < base && base < MAX_DECIMALS + TEN_POWER17) {
            logbase = n_log_36(base);
        } else {
            logbase = n_log(base) * MAX_DECIMALS;
        }
        int256 logarg;
        if (MAX_DECIMALS - TEN_POWER17 < arg && arg < MAX_DECIMALS + TEN_POWER17) {
            logarg = n_log_36(arg);
        } else {
            logarg = n_log(arg) * MAX_DECIMALS;
        }
        int256 result = (logarg * MAX_DECIMALS) / logbase;
        emit showResult( result );
        return result;
    }

    function exp_nat(int256 base, int256 n) public returns (int256) {
        n /= MAX_DECIMALS;
        int256 result = 1;
        while(n >= 1) {
            if ( (n%2) == 1){
                result = (result * base) / MAX_DECIMALS;
                n -= 1;
            }
            base = (base * base) / MAX_DECIMALS;
            n/=2;
        }
        emit showResult( result );
        return result;
    }

    function n_log_36(int256 a) private pure returns (int256) {
            a *= MAX_DECIMALS;
            int256 z = (MAX_DECIMALS_DOUBLE * (a - MAX_DECIMALS_DOUBLE)) / (a + MAX_DECIMALS_DOUBLE);
            int256 s = z;
            int256 z_squared = (z * z) / MAX_DECIMALS_DOUBLE;
            int256 t = (z * z_squared) / MAX_DECIMALS_DOUBLE;
            s += t / 3;
            t = (t * z_squared) / MAX_DECIMALS_DOUBLE;
            s += t / 5;
            t = (t * z_squared) / MAX_DECIMALS_DOUBLE;
            s += t / 7;
            t = (t * z_squared) / MAX_DECIMALS_DOUBLE;
            s += t / 9;
            t = (t * z_squared) / MAX_DECIMALS_DOUBLE;
            s += t / 11;
            t = (t * z_squared) / MAX_DECIMALS_DOUBLE;
            s += t / 13;
            t = (t * z_squared) / MAX_DECIMALS_DOUBLE;
            s += t / 15;
            t = (t * z_squared) / MAX_DECIMALS_DOUBLE;
            s += t / 17;
            return 2*s;
    }
    
    event showResult(int256 result);
}
