from fastapi import UploadFile
from app.services.adapters.csv_adaptor import csv_to_ohlcv
from app.services.adapters.alpha_adapter import alpha_to_ohlcv

async def get_market_data(source: str, symbol: str = None, file: UploadFile = None):
    if source == "csv":
        data = await csv_to_ohlcv(file)
        return {
            "symbol": symbol or "csv",
            "source": "csv",
            "data": data
        }
    
    elif source == "alpha":
        data = alpha_to_ohlcv(symbol)
        return {
            "symbol": symbol,
            "source": "alpha_vantage",
            "data": data
        }
    
    else:
        raise ValueError("Invalid data source")
    