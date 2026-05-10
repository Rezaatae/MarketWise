import pandas as pd
from datetime import datetime

from app.schemas.ohlcv import OHLCV, OHLCVSeries
from app.schemas.response_model import MetricsRequest

from app.services.market_data_service import compute_metrics


def test_compute_metrics_includes_returns():
    data = OHLCVSeries(
        symbol="AAPL",
        data=[
            OHLCV(
                timestamp=datetime(2024, 1, 1),
                open=100,
                high=110,
                low=95,
                close=105,
                volume=1000
            ),
            OHLCV(
                timestamp=datetime(2024, 1, 2),
                open=106,
                high=115,
                low=101,
                close=110,
                volume=2000
            ),
            OHLCV(
                timestamp=datetime(2024, 1, 3),
                open=111,
                high=120,
                low=108,
                close=115,
                volume=3000
            ),
        ]
    )

    config = MetricsRequest(
        compute_returns=True,
        compute_sma=False,
        compute_ema=False,
        compute_volatility=False,
        compute_sharpe=False,
        compute_drawdown=False,
        show_signal=False,
        maWindow=2,
        volPeriod=2,
        risk_free_rate=0.02
    )

    result = compute_metrics(data, config)

    # Core fields always present
    assert "timestamps" in result
    assert "close" in result

    # Returns fields included
    assert "simple_returns" in result
    assert "log_returns" in result
    assert "total_return" in result

    # Non-requested metrics excluded
    assert "sma" not in result
    assert "ema" not in result
    assert "rolling_std" not in result
    assert "sharpe_ratio" not in result
    assert "max_drawdown" not in result
    assert "signal" not in result

    # Basic sanity checks
    assert len(result["close"]) == 3
    assert len(result["simple_returns"]) == 3

    assert isinstance(result["total_return"], float)