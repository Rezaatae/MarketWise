from fastapi import UploadFile, File
import csv
from app.schemas.market import OHLCV
from io import StringIO

async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()
    decoded = contents.decode("utf-8")

    reader = csv.DictReader(StringIO(decoded))

    timestamps = []
    prices = []

    for row in reader:
        price = OHLCV(
            open=row.get("open"),
            high=row.get("high"),
            low=row.get("low"),
            close=row.get("close"),
            volume=row.get("volume"),
        )

        if all(v is None for v in price.model_dump().values()):
            continue

        timestamps.append(row.get("timestamp"))
        prices.append(price)

    return format_ohlcv(timestamps, prices)

def format_ohlcv(timestamps, prices):
    result = []

    for i, price in enumerate(prices):
        if not hasattr(price, "model_dump"):
            continue

        result.append({
            "date": timestamps[i] if i < len(timestamps) else None,
            "price": price.model_dump(),
        })

    return result