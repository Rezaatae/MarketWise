import numpy as np
import pandas as pd

def compute_sma(close: pd.Series, window: int):
    return close.rolling(window).mean()


def compute_ema(close: pd.Series, window: int):
    return close.ewm(span=window).mean()