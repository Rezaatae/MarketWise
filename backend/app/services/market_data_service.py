from fastapi import UploadFile
from app.services.adapters.csv_adaptor import csv_to_ohlcv
from app.services.adapters.alpha_adapter import alpha_to_ohlcv
from app.services.analytics.returns import simple_returns, log_returns

async def get_market_data(source: str, symbol: str = None, file: UploadFile = None):
    if source == "csv":
        data = await csv_to_ohlcv(file)
        closes = [row.price.close for row in data]
        return {
            "symbol": symbol or "csv",
            "source": "csv",
            "data": data,
            "returns": {
                "simple": simple_returns(closes),
                "log": log_returns(closes),
            }
        }
    
    elif source == "alpha":
        data = alpha_to_ohlcv(symbol)
        closes = [row.price.close for row in data]
        return {
            "symbol": symbol,
            "source": "alpha_vantage",
            "data": data,
            "returns": {
                "simple": simple_returns(closes),
                "log": log_returns(closes),
            }
        }
    
    else:
        raise ValueError("Invalid data source")
    