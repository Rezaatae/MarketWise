import csv
from io import StringIO
from fastapi import UploadFile
from app.schemas.ohlcv import OHLCV, OHLCVRow


async def csv_to_ohlcv(file: UploadFile):
    contents = await file.read()
    decoded = contents.decode("utf-8")

    reader = csv.DictReader(StringIO(decoded))

    result = []

    for row in reader:
        price = OHLCV(
            open=row.get("open"),
            high=row.get("high"),
            low=row.get("low"),
            close=row.get("close"),
            volume=row.get("open")
        )

        if all(v is None for v in price.model_dump().values()):
            continue

        result.append(
            OHLCVRow(
                data=row.get("timestamp") or "",
                price=price
            )
        )

        return result