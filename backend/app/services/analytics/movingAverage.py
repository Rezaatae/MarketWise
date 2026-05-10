import numpy as np
import pandas as pd

def compute_sma(close: pd.Series, window: int) -> pd.Series:
    return close.rolling(window).mean()


def compute_ema(close: pd.Series, window: int) -> pd.Series:
    return close.ewm(span=window, adjust=False).mean()