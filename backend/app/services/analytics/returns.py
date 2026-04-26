import numpy as np
import pandas as pd

def compute_returns(close: pd.Series):
    simple = close.pct_change()
    log = np.log(close / close.shift(1))
    total_return = (close.iloc[-1] / close.iloc[0]) - 1
    return simple, log, total_return

