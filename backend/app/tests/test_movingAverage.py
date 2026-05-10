import pytest
import pandas as pd
import numpy as np

from app.services.analytics.movingAverage import (
    compute_sma,
    compute_ema,
)


class TestMovingAverages:

    @pytest.mark.parametrize("window", [1, 3, 5])
    def test_sma_matches_expected(self, window):
        """
        Verifies SMA matches Pandas rolling mean behavior
        across multiple window sizes.
        """

        prices = pd.Series([
            102.5, 103.8, 101.9, 104.2, 105.0,
            106.7, 105.9, 107.3, 108.1, 109.4
        ])

        expected = prices.rolling(window=window).mean()

        result = compute_sma(prices, window)

        pd.testing.assert_series_equal(result, expected)

    def test_sma_known_values(self):
        """
        Uses a small dataset where we can manually verify
        the SMA calculations.
        """

        prices = pd.Series([1, 2, 3, 4, 5])

        result = compute_sma(prices, 3)

        expected = pd.Series([
            np.nan,
            np.nan,
            2.0,
            3.0,
            4.0
        ])

        pd.testing.assert_series_equal(result, expected)

    def test_sma_window_too_large(self):
        """
        If the window is larger than the dataset,
        Pandas should return all NaN values.
        """

        prices = pd.Series([10, 20, 30])

        result = compute_sma(prices, 10)

        expected = pd.Series([
            np.nan,
            np.nan,
            np.nan
        ])

        pd.testing.assert_series_equal(result, expected)

    def test_ema_known_values(self):
        """
        Verifies EMA against Pandas expected output.
        """

        prices = pd.Series([1, 2, 3, 4, 5])

        expected = prices.ewm(
            span=3,
            adjust=False
        ).mean()

        result = compute_ema(prices, 3)

        pd.testing.assert_series_equal(result, expected)

    def test_empty_series(self):
        """
        Ensures functions handle empty input safely.
        """

        prices = pd.Series(dtype=float)

        sma_result = compute_sma(prices, 3)
        ema_result = compute_ema(prices, 3)

        assert sma_result.empty
        assert ema_result.empty

        assert isinstance(sma_result, pd.Series)
        assert isinstance(ema_result, pd.Series)