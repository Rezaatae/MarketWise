import pytest
import pandas as pd
import numpy as np

from app.services.analytics.returns import compute_simple_returns, compute_log_returns, compute_total_returns


class TestReturns:

    # test known returns simple
    def test_simple_returns_matches_expected(self):
        """
        Verifies simple returns matches returns 
        calculated using a small set of test closing prices.
        """
        prices = pd.Series([
            102.5, 103.8, 101.9, 104.2, 105.0,
            106.7, 105.9, 107.3, 108.1, 109.4
        ])

        result = compute_simple_returns(prices)

        expected = pd.Series([
            np.nan,
            0.012683,
            -0.018304,
            0.022571,
            0.007678,
            0.016190,
            -0.007498,
            0.013220,
            0.007456,
            0.012026
        ])

        pd.testing.assert_series_equal(result, expected, atol=1e-6, check_exact=False)


    # test known returns log
    def test_log_returns_matches_expected(self):
        """
        Verifies log returns matches returns 
        calculated using a small set of test closing prices.
        """
        prices = pd.Series([
            102.5, 103.8, 101.9, 104.2, 105.0,
            106.7, 105.9, 107.3, 108.1, 109.4
        ])

        result = compute_log_returns(prices)

        expected = pd.Series([
            np.nan,
            0.012603172153325405,
            -0.018474030503109078,
            0.022320189090587382,
            0.007648220838256819,
            0.01606080815018443,
            -0.007525905700346911,
            0.01313339702929195,
            0.007428075008509708,
            0.011954165342718393
        ])

        pd.testing.assert_series_equal(result, expected, atol=1e-6, check_exact=False)

    # test known returns total
    def test_total_returns_matches_expected(self):
        """
        Verifies total returns matches returns 
        calculated using a small set of test closing prices.
        """
        prices = pd.Series([
            102.5, 103.8, 101.9, 104.2, 105.0,
            106.7, 105.9, 107.3, 108.1, 109.4
        ])

        result = compute_total_returns(prices)

        expected = 0.06731707317073177

        assert result == expected

    
    # test short series
    def test_short_input(self):
        """
        Ensures functions handle short input safely.
        """

        prices = pd.Series([100])

        with pytest.raises(ValueError):
            compute_simple_returns(prices)

        with pytest.raises(ValueError):
            compute_log_returns(prices)

        with pytest.raises(ValueError):
            compute_total_returns(prices)
    
    # test empty series
    def test_empty_input(self):
        """
        Ensures functions handle empty input safely.
        """

        prices = pd.Series(dtype=float)

        with pytest.raises(ValueError):
            compute_simple_returns(prices)

        with pytest.raises(ValueError):
            compute_log_returns(prices)

        with pytest.raises(ValueError):
            compute_total_returns(prices)


