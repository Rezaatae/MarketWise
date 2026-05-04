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

    def is_invalid(value: str):
        return value in ("N/A", "", None)

    skipped = 0

    for i, row in enumerate(reader):
        try:
            if any(is_invalid(row[field]) for field in ["timestamp", "open", "high", "low", "close"]):
                skipped += 1
                continue

            price = OHLCV(
                timestamp=datetime.fromisoformat(row["timestamp"]),
                open=float(row["open"]),
                high=float(row["high"]),
                low=float(row["low"]),
                close=float(row["close"]),
                volume=float(row.get("volume", 0)),
            )

            result.append(price)

        except Exception as e:
            skipped += 1
            print(f"Skipped row {i}: {row} | Error: {e}")

    print(f"Parsed {len(result)} rows, skipped {skipped}")

    return OHLCVSeries(
        symbol="csv",
        data=result
    )