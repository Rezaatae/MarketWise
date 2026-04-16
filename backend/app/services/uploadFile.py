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

    return {
        'timestamps':timestamps,
        'prices':prices
    }