from app.schemas.ohlcv import OHLCVSeries
from app.schemas.response_model import MarketResponse, MetricsRequest
from app.services.analytics.movingAverage import compute_ema, compute_sma
from fastapi import UploadFile
from app.services.adapters.csv_adaptor import csv_to_ohlcv
from app.services.adapters.alpha_adapter import alpha_to_ohlcv
from app.services.analytics.returns import compute_returns
import pandas as pd


def compute_metrics(data: OHLCVSeries, config: MetricsRequest):
        df = pd.DataFrame([d.dict() for d in data.data])
        df.set_index("timestamp", inplace=True)
        df = df.sort_index()
        close = df["close"]

        result = {
            "timestamps": df.index.tolist(),
            "close": close.tolist()
        }

        if config.compute_returns:
            simple, log = compute_returns(close)

            result["simple_returns"] = simple.tolist()
            result["log_returns"] = log.tolist()

        if config.compute_sma:
            result["sma"] = compute_sma(close, config.window).tolist()

        if config.compute_ema:
            result["ema"] = compute_ema(close, config.window).tolist()
        return result

async def get_market_data(source: str, config: MetricsRequest, symbol: str = None, file: UploadFile = None):
    if source == "csv":
        data = await csv_to_ohlcv(file)
        closes = [row.price.close for row in data]
        return {
            "symbol": symbol or "csv",
            "source": "csv"
        }
    
    elif source == "alpha":
        data = await alpha_to_ohlcv(symbol)
        metrics = compute_metrics(data, config)
        return MarketResponse(
             symbol=symbol,
             source="alpha_vantage",
             **metrics
)
    
    else:
        raise ValueError("Invalid data source")