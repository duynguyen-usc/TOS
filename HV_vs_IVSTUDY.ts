declare lower;

plot ImpVol = IMP_VOLATILITY();

input length = 20;
input basis = {default Annual, Monthly, Weekly, Daily};

def ap = getAggregationPeriod();

assert(ap >= AggregationPeriod.MIN, "Study can only be calculated for time-aggregated charts: " + ap);

def barsPerDay = (regularTradingEnd(getYyyyMmDd()) - regularTradingStart(getYyyyMmDd())) / ap;
def barsPerYear =
    if ap > AggregationPeriod.WEEK then 12
    else if ap == AggregationPeriod.WEEK then 52
    else if ap >= AggregationPeriod.DAY then 252 * AggregationPeriod.DAY / ap
    else 252 * barsPerDay;

def basisCoeff;
switch (basis) {
case Annual:
    basisCoeff = 1;
case Monthly:
    basisCoeff = 12;
case Weekly:
    basisCoeff = 52;
case Daily:
    basisCoeff = 252;
}

def clLog = log(close / close[1]);
plot HV = stdev(clLog, length) * Sqrt(barsPerYear / basisCoeff * length / (length - 1));
HV.SetDefaultColor(GetColor(0));