import numpy as np
import pandas as pd

def compute_rolling_volatility(log_returns: pd.Series, window: int) -> pd.Series:
    return log_returns.rolling(window).std()

def compute_annualized_volatility(log_returns: pd.Series) -> float:
    return log_returns.std() * np.sqrt(252)