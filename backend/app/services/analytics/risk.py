import numpy as np
import pandas as pd

def compute_sharpe(log_returns: pd.Series, risk_free_rate: float):
    returns = log_returns.dropna()

    if len(returns) < 2:
        return None

    excess = returns - risk_free_rate / 252
    std = excess.std()

    if std == 0:
        return None

    return float((excess.mean() / std) * (252 ** 0.5))


def compute_drawdown(close: pd.Series):
    prices = close.dropna()

    if len(prices) < 2:
        return None

    cumulative_max = prices.cummax()
    drawdown = (prices - cumulative_max) / cumulative_max

    return float(drawdown.min())