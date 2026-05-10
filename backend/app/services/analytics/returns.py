import numpy as np
import pandas as pd

def compute_simple_returns(close: pd.Series) -> pd.Series:
    _validate(close)
    return close.pct_change()

def compute_log_returns(close: pd.Series) -> pd.Series:
    _validate(close)
    return np.log(close / close.shift(1))

def compute_total_returns(close: pd.Series) -> float:
    _validate(close)
    return (close.iloc[-1] / close.iloc[0]) - 1

def _validate(close: pd.Series):
    if len(close) < 2:
        raise ValueError("Series must contain at least 2 values")
