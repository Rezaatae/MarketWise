import pytest
from io import BytesIO
from fastapi import UploadFile
from app.services.adapters.csv_adaptor import csv_to_ohlcv

class FakeUploadFile(UploadFile):
    def __init__(self, content: str):
        super().__init__(filename="test.csv", file=BytesIO(content.encode("utf-8")))


@pytest.mark.asyncio
async def test_csv_to_ohlcv():
    csv_data = """timestamp,open,high,low,close,volume
2024-01-01,100,110,90,105,1000
2024-01-02,106,115,101,110,2000"""

    file = FakeUploadFile(csv_data)

    result = await csv_to_ohlcv(file)

    assert result[0].price.open is not None