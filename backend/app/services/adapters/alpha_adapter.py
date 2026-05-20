from app.schemas.ohlcv import OHLCV, OHLCVSeries
from app.clients.alpha_vantage import get_daily_prices
from fastapi import HTTPException

async def alpha_to_ohlcv(symbol: str):
    raw = await get_daily_prices(symbol)

    if 'Information' in raw:
        if "limit is 25 requests per day." in raw['Information']:
            raise HTTPException(
                status_code=429,
                detail="Live market data is temporarily unavailable due to API rate limits. Please try again later or upload a CSV dataset."
            )

    if "Error Message" in raw:
        raise Exception(f"Invalid symbol: {symbol}")

    if "Time Series (Daily)" not in raw:
        raise Exception(f"Unexpected response: {raw}")

    series = raw["Time Series (Daily)"]

    result = []
    for date, values in series.items():
        result.append(
            OHLCV(
                timestamp= date,
                open=float(values["1. open"]),
                high=float(values["2. high"]),
                low=float(values["3. low"]),
                close=float(values["4. close"]),
                volume=float(values["5. volume"]),
            )
        )
    return OHLCVSeries(symbol=symbol, data=result)