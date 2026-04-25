import numpy as np
import pandas as pd

def compute_returns(close: pd.Series):
    simple = close.pct_change()
    log = np.log(close / close.shift(1))
    return simple, log