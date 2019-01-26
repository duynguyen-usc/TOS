declare lower;
declare hide_on_intraday;

input TimePeriod = 252;
input LowVolLimit = 30;
input HighVolLimit = 50;

def vol = imp_volatility();
def data = if !IsNaN(vol) then vol else vol[-1];
def hi = Highest(data, TimePeriod);
def lo = Lowest(data, TimePeriod);
plot IV_Rank = (data – lo) / (hi – lo) * 100;
plot LowVol = LowVolLimit;
plot HighVol = HighVolLimit;

IV_Rank.SetDefaultColor(Color.Yellow);
LowVol.SetDefaultColor(Color.Red);
HighVol.SetDefaultColor(Color.Green);