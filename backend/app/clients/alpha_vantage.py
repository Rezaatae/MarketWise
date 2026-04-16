import requests
from app.core.config import API_KEY
from app.schemas.market import OHLCV, PriceResponse

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
        price_obj = OHLCV(
            open=values.get("1. open"),
            high=values.get("2. high"),
            low=values.get("3. low"),
            close=values.get("4. close"),
            volume=values.get("5. volume"),
        )

        if all(value is None for value in price_obj.model_dump().values()):
            continue
        prices.append(price_obj.model_dump())

    return {
        "timestamps": dates,
        "prices": prices
    }