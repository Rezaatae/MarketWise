import pytest
import numpy as np
import pandas as pd

from app.services.analytics.volatility import (
    compute_rolling_volatility,
    compute_annualized_volatility
)

def test_rolling_volatility_returns_series():
    returns = pd.Series([0.01, -0.02, 0.015, -0.01, 0.02])
    window = 3

    result = compute_rolling_volatility(returns, window)

    assert isinstance(result, pd.Series)
    assert len(result) == len(returns)

def test_rolling_volatility_nan_warmup():
    returns = pd.Series([0.01, -0.02, 0.015, -0.01, 0.02])
    window = 3

    result = compute_rolling_volatility(returns, window)

    # first 2 values should be NaN
    assert result.iloc[0:2].isna().all()

def test_rolling_volatility_nonzero_output():
    returns = pd.Series([0.01, -0.02, 0.015, -0.01, 0.02])
    window = 3

    result = compute_rolling_volatility(returns, window)

    # after warm-up, should produce values
    assert (result.dropna() > 0).all()

def test_rolling_volatility_constant_returns():
    returns = pd.Series([0.01, 0.01, 0.01, 0.01, 0.01])
    window = 3

    result = compute_rolling_volatility(returns, window)

    # std of constant series should be 0 (after warmup)
    assert (result.dropna() == 0).all()

def test_annualized_volatility_returns_float():
    returns = pd.Series([0.01, -0.02, 0.015, -0.01, 0.02])

    result = compute_annualized_volatility(returns)

    assert isinstance(result, float)

def test_annualized_volatility_scales_correctly():
    returns = pd.Series([0.01, -0.02, 0.015, -0.01, 0.02])

    result = compute_annualized_volatility(returns)

    # annualized vol should be positive
    assert result > 0

def test_annualized_volatility_constant_returns():
    returns = pd.Series([0.01, 0.01, 0.01, 0.01])

    result = compute_annualized_volatility(returns)

    assert result == 0.0

def test_annualized_volatility_handles_nan():
    returns = pd.Series([0.01, np.nan, -0.02, 0.015, 0.02])

    result = compute_annualized_volatility(returns)

    assert isinstance(result, float)
    assert not np.isnan(result)