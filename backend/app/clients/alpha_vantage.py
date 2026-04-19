import requests
from app.core.config import API_KEY

BASE_URL = "https://www.alphavantage.co/query"

def get_daily_prices(symbol: str):
    params = {
        "function": "TIME_SERIES_DAILY",
        "symbol": symbol,
        "apikey": API_KEY
    }

    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    return response.json()