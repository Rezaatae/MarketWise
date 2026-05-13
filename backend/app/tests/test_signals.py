import numpy as np
import pandas as pd

from app.services.analytics.signal import compute_signal

def test_compute_signal_buy_signal():
    close = pd.Series([100, 101, 102, 103])
    ma = pd.Series([101, 101, 101, 101])

    result = compute_signal(close, ma)

    assert 1 in result.values

def test_compute_signal_sell_signal():
    close = pd.Series([100, 102, 103, 99])
    ma = pd.Series([101, 101, 101, 101])

    result = compute_signal(close, ma)

    assert -1 in result.values

def test_compute_signal_no_repeated_buy():
    close = pd.Series([100, 102, 103, 104, 105])
    ma = pd.Series([101, 101, 101, 101, 101])

    result = compute_signal(close, ma)

    # only one buy signal expected
    assert (result == 1).sum() <= 1

def test_compute_signal_no_repeated_sell():
    close = pd.Series([105, 104, 103, 102, 101])
    ma = pd.Series([102, 102, 102, 102, 102])

    result = compute_signal(close, ma)

    assert (result == -1).sum() <= 1

def test_compute_signal_nan_ma_returns_zero():
    close = pd.Series([100, 101, 102, 103])
    ma = pd.Series([np.nan, np.nan, 101, 101])

    result = compute_signal(close, ma)

    assert (result == 0).all()

def test_compute_signal_flat_market():
    close = pd.Series([100, 100, 100, 100])
    ma = pd.Series([100, 100, 100, 100])

    result = compute_signal(close, ma)

    assert (result == 0).all()

def test_compute_signal_short_series():
    close = pd.Series([100])
    ma = pd.Series([100])

    result = compute_signal(close, ma)

    assert (result == 0).all()

def test_compute_signal_position_flip():
    close = pd.Series([100, 102, 103, 99, 101, 103])
    ma = pd.Series([101, 101, 101, 101, 101, 101])

    result = compute_signal(close, ma)

    # must contain both buy and sell at some point
    assert 1 in result.values
    assert -1 in result.values