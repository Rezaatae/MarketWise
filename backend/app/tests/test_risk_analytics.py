import pytest
import numpy as np
import pandas as pd

from app.services.analytics.risk import compute_sharpe, compute_drawdown

def test_compute_sharpe_valid_series():
    log_returns = pd.Series([0.01, 0.02, -0.005, 0.015, 0.01])
    rf = 0.02  # 2% annual risk-free rate

    result = compute_sharpe(log_returns, rf)

    assert isinstance(result, float)
    assert result != 0

def test_compute_sharpe_too_short_returns_none():
    log_returns = pd.Series([0.01])  # only 1 value
    rf = 0.02

    result = compute_sharpe(log_returns, rf)

    assert result is None

def test_compute_sharpe_zero_std_returns_none():
    log_returns = pd.Series([0.01, 0.01, 0.01, 0.01])
    rf = 0.0

    result = compute_sharpe(log_returns, rf)

    assert result is None

def test_compute_sharpe_handles_nan_values():
    log_returns = pd.Series([0.01, np.nan, 0.02, -0.01, 0.015])
    rf = 0.01

    result = compute_sharpe(log_returns, rf)

    assert isinstance(result, float)

def test_compute_drawdown_valid_series():
    prices = pd.Series([100, 110, 105, 120, 90])

    result = compute_drawdown(prices)

    # expected:
    # peak = 120
    # worst drop = 90/120 - 1 = -0.25
    assert np.isclose(result, -0.25)


def test_compute_drawdown_no_drawdown():
    prices = pd.Series([100, 110, 120, 130])

    result = compute_drawdown(prices)

    assert np.isclose(result, 0.0)

def test_compute_drawdown_too_short_returns_none():
    prices = pd.Series([100])

    result = compute_drawdown(prices)

    assert result is None

def test_compute_drawdown_handles_nan_values():
    prices = pd.Series([100, np.nan, 110, 90])

    result = compute_drawdown(prices)

    assert isinstance(result, float)

@pytest.mark.parametrize("series", [
    pd.Series([]),
    pd.Series([0.01])
])
def test_compute_sharpe_invalid_inputs(series):
    result = compute_sharpe(series, 0.02)
    assert result is None