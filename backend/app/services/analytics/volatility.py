import numpy as np
import pandas as pd

def compute_volatility(log_returns: pd.Series, window: int):
    rolling_std = log_returns.rolling(window).std()
    annualized = rolling_std.mean() * np.sqrt(252)
    return rolling_std, annualized
