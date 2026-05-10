import datetime

import pytest
from unittest.mock import AsyncMock

from app.services.adapters.alpha_adapter import alpha_to_ohlcv

@pytest.mark.asyncio
async def test_alpha_to_ohlcv_success(monkeypatch):
    mock_response = {
        "Time Series (Daily)": {
            "2024-01-01": {
                "1. open": "100",
                "2. high": "110",
                "3. low": "95",
                "4. close": "105",
                "5. volume": "1000"
            }
        }
    }

    mock_get = AsyncMock(return_value=mock_response)
    monkeypatch.setattr(
        "app.services.adapters.alpha_adapter.get_daily_prices",
        mock_get
    )

    result = await alpha_to_ohlcv("AAPL")

    assert result.symbol == "AAPL"
    assert len(result.data) == 1

    bar = result.data[0]
    assert bar.timestamp == datetime.datetime(2024, 1, 1)
    assert bar.open == 100.0
    assert bar.high == 110.0
    assert bar.low == 95.0
    assert bar.close == 105.0
    assert bar.volume == 1000.0

@pytest.mark.asyncio
async def test_alpha_to_ohlcv_rate_limit(monkeypatch):
    mock_response = {"Note": "API call frequency exceeded"}

    mock_get = AsyncMock(return_value=mock_response)
    monkeypatch.setattr(
        "app.services.adapters.alpha_adapter.get_daily_prices",
        mock_get
    )

    with pytest.raises(Exception, match="Rate limit exceeded"):
        await alpha_to_ohlcv("AAPL")

@pytest.mark.asyncio
async def test_alpha_to_ohlcv_invalid_symbol(monkeypatch):
    mock_response = {"Error Message": "Invalid API call"}

    mock_get = AsyncMock(return_value=mock_response)
    monkeypatch.setattr(
        "app.services.adapters.alpha_adapter.get_daily_prices",
        mock_get
    )

    with pytest.raises(Exception, match="Invalid symbol"):
        await alpha_to_ohlcv("FAKE")

@pytest.mark.asyncio
async def test_alpha_to_ohlcv_unexpected_response(monkeypatch):
    mock_response = {"RandomKey": "No data"}

    mock_get = AsyncMock(return_value=mock_response)
    monkeypatch.setattr(
        "app.services.adapters.alpha_adapter.get_daily_prices",
        mock_get
    )

    with pytest.raises(Exception, match="Unexpected response"):
        await alpha_to_ohlcv("AAPL")

@pytest.mark.asyncio
async def test_alpha_to_ohlcv_multiple_days(monkeypatch):
    mock_response = {
        "Time Series (Daily)": {
            "2024-01-02": {
                "1. open": "101",
                "2. high": "111",
                "3. low": "96",
                "4. close": "106",
                "5. volume": "2000"
            },
            "2024-01-01": {
                "1. open": "100",
                "2. high": "110",
                "3. low": "95",
                "4. close": "105",
                "5. volume": "1000"
            }
        }
    }

    mock_get = AsyncMock(return_value=mock_response)
    monkeypatch.setattr(
        "app.services.adapters.alpha_adapter.get_daily_prices",
        mock_get
    )

    result = await alpha_to_ohlcv("AAPL")

    assert len(result.data) == 2

@pytest.mark.asyncio
async def test_alpha_to_ohlcv_calls_api(monkeypatch):
    mock_response = {"Time Series (Daily)": {}}

    mock_get = AsyncMock(return_value=mock_response)
    monkeypatch.setattr(
        "app.services.adapters.alpha_adapter.get_daily_prices",
        mock_get
    )

    await alpha_to_ohlcv("AAPL")

    mock_get.assert_called_once_with("AAPL")