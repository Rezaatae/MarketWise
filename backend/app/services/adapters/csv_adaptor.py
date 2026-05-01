import csv
from io import StringIO
from fastapi import UploadFile
from app.schemas.ohlcv import OHLCV, OHLCVSeries
from datetime import datetime



async def csv_to_ohlcv(file: UploadFile):
    contents = await file.read()
    decoded = contents.decode("utf-8")

    reader = csv.DictReader(StringIO(decoded))

    result = []

    for row in reader:
        price = OHLCV(
            timestamp=datetime.fromisoformat(row["timestamp"]),
            open=float(row["open"]),
            high=float(row["high"]),
            low=float(row["low"]),
            close=float(row["close"]),
            volume=float(row.get("volume", 0))
        )

        result.append(
            OHLCV(
                timestamp=...,
                open=...,
                high=...,
                low=...,
                close=...,
                volume=...
            )
        )

    return OHLCVSeries(
    symbol="csv",
    data=result
)

