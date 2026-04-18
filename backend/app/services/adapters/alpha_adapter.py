from app.schemas.ohlcv import OHLCV, OHLCVRow
from app.clients.alpha_vantage import get_daily_prices

def alpha_to_ohlcv(symbol: str):
    raw = get_daily_prices(symbol)

    if "Note" in raw:
        raise Exception("Rate limit exceeded")

    if "Error Message" in raw:
        raise Exception(f"Invalid symbol: {symbol}")

    if "Time Series (Daily)" not in raw:
        raise Exception(f"Unexpected response: {raw}")

    series = raw["Time Series (Daily)"]

    result = []

    for date, values in series.items():
        result.append(
            OHLCVRow(
                date=date,
                price=OHLCV(
                    open=values.get("1. open"),
                    high=values.get("2. high"),
                    low=values.get("3. low"),
                    close=values.get("4. close"),
                    volume=values.get("5. volume"),
                )
            )
        )
        return result