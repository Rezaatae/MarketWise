import pytest
from unittest.mock import patch
from app.services.adapters.alpha_adapter import alpha_to_ohlcv

mock_response = {
    "Time Series (Daily)": {
        "2024-01-01": {
            "1. open": "100",
            "2. high": "110",
            "3. low": "90",
            "4. close": "105",
            "5. volume": "1000"
        }
    }
}


@patch("app.clients.alpha_vantage.get_daily_prices", return_value=mock_response)
def test_alpha_to_ohlcv(mock_api):
    result = alpha_to_ohlcv("AAPL")

    assert result[0].price.open is not None