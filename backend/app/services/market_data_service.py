from app.schemas.ohlcv import OHLCVSeries
from app.schemas.response_model import MarketResponse, MetricsRequest
from app.services.analytics.movingAverage import compute_ema, compute_sma
from fastapi import UploadFile
from app.services.adapters.csv_adaptor import csv_to_ohlcv
from app.services.adapters.alpha_adapter import alpha_to_ohlcv
from app.services.analytics.returns import compute_simple_returns, compute_log_returns, compute_total_returns
from app.services.analytics.volatility import compute_rolling_volatility, compute_annualized_volatility
from app.services.analytics.signal import compute_signal
from app.services.analytics.risk import compute_sharpe, compute_drawdown
import pandas as pd

async def get_market_data(source: str, config: MetricsRequest, symbol: str = None, file: UploadFile = None) -> MarketResponse:
    if source == "csv":
        data = await csv_to_ohlcv(file)

        if config:
            metrics = compute_metrics(data, config)
            return MarketResponse(
                symbol=symbol or "csv",
                source="csv",
                **metrics
            )

        return MarketResponse(
            symbol=symbol or "csv",
            source="csv"
        )
    
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

def compute_metrics(data: OHLCVSeries, config: MetricsRequest):
        df = pd.DataFrame([d.dict() for d in data.data])
        df.set_index("timestamp", inplace=True)
        df = df.sort_index()
        close = df["close"]

        result = {
            "timestamps": df.index.tolist(),
            "close": close.tolist()
        }
        simple = compute_simple_returns(close)
        log = compute_log_returns(close)
        total_return = compute_total_returns(close)

        if config.compute_returns:
            result["simple_returns"] = simple.tolist()
            result["log_returns"] = log.tolist()
            result["total_return"] = total_return

        if config.compute_sma:
            result["sma"] = compute_sma(close, config.maWindow).tolist()

        if config.compute_ema:
            result["ema"] = compute_ema(close, config.maWindow).tolist()
        
        if config.compute_volatility:
             rolling_std = compute_rolling_volatility(log, config.volPeriod)
             annualized = compute_annualized_volatility(log)
             result["rolling_std"] = rolling_std.tolist()
             result["annualized_volatility"] = annualized

        if config.compute_sharpe:
             sharpe = compute_sharpe(log, config.risk_free_rate)
             result["sharpe_ratio"] = sharpe

        if config.compute_drawdown:
             drawdown = compute_drawdown(close)
             result["max_drawdown"] = drawdown

        if config.show_signal and (config.compute_ema or config.compute_sma):
            if config.compute_sma:
                ma = compute_sma(close, config.maWindow)
            else:
                ma = compute_ema(close, config.maWindow)
            signal = compute_signal(close, ma)
            result["signal"] = signal.tolist()

        return result
