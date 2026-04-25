import numpy as np
import pandas as pd

def compute_sharpe(log_returns: pd.Series, risk_free_rate: float):
    excess = log_returns - risk_free_rate / 252
    return np.sqrt(252) * excess.mean() / excess.std()


def compute_drawdown(close: pd.Series):
    peak = close.cummax()
    drawdown = (close - peak) / peak
    return drawdown.min()