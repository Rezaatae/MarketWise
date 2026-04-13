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
        prices.append(float(values["4. close"]))

    return {
        "timestamps": dates,
        "prices": prices
    }