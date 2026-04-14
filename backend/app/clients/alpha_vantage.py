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
    data = response.json()

    time_series = data.get("Time Series (Daily)", {})

    dates = []
    prices = []

    for date, values in sorted(time_series.items()):
        dates.append(date)
        prices.append({"open": float(values["1. open"]),
                       "high": float(values["2. high"]),
                       "low": float(values["3. low"]),
                       "close": float(values["4. close"]),
                       "volume": float(values["5. volume"])})

    return {
        "timestamps": dates,
        "prices": prices
    }