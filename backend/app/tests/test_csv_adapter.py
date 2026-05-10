import pytest
from io import BytesIO
from datetime import datetime
from fastapi import UploadFile

from app.services.adapters.csv_adaptor import csv_to_ohlcv


class FakeUploadFile(UploadFile):
    def __init__(self, content: str):
        super().__init__(
            filename="test.csv",
            file=BytesIO(content.encode("utf-8"))
        )


# Success case
@pytest.mark.asyncio
async def test_csv_to_ohlcv_success():
    csv_data = """timestamp,open,high,low,close,volume
2024-01-01,100,110,90,105,1000
2024-01-02,106,115,101,110,2000
"""

    file = FakeUploadFile(csv_data)

    result = await csv_to_ohlcv(file)

    assert result.symbol == "csv"
    assert len(result.data) == 2

    first = result.data[0]

    assert first.timestamp == datetime(2024, 1, 1)
    assert first.open == 100.0
    assert first.high == 110.0
    assert first.low == 90.0
    assert first.close == 105.0
    assert first.volume == 1000.0


# Missing volume defaults to 0
@pytest.mark.asyncio
async def test_csv_to_ohlcv_missing_volume_defaults_zero():
    csv_data = """timestamp,open,high,low,close
2024-01-01,100,110,90,105
"""

    file = FakeUploadFile(csv_data)

    result = await csv_to_ohlcv(file)

    assert len(result.data) == 1
    assert result.data[0].volume == 0.0


# Invalid numeric row gets skipped
@pytest.mark.asyncio
async def test_csv_to_ohlcv_skips_invalid_numeric_row():
    csv_data = """timestamp,open,high,low,close,volume
2024-01-01,abc,110,90,105,1000
2024-01-02,106,115,101,110,2000
"""

    file = FakeUploadFile(csv_data)

    result = await csv_to_ohlcv(file)

    # first row skipped
    assert len(result.data) == 1

    remaining = result.data[0]

    assert remaining.timestamp == datetime(2024, 1, 2)
    assert remaining.close == 110.0


# Invalid timestamp row gets skipped
@pytest.mark.asyncio
async def test_csv_to_ohlcv_skips_invalid_timestamp():
    csv_data = """timestamp,open,high,low,close,volume
not-a-date,100,110,90,105,1000
2024-01-02,106,115,101,110,2000
"""

    file = FakeUploadFile(csv_data)

    result = await csv_to_ohlcv(file)

    assert len(result.data) == 1
    assert result.data[0].timestamp == datetime(2024, 1, 2)


# N/A rows skipped
@pytest.mark.asyncio
async def test_csv_to_ohlcv_skips_na_rows():
    csv_data = """timestamp,open,high,low,close,volume
2024-01-01,N/A,110,90,105,1000
2024-01-02,106,115,101,110,2000
"""

    file = FakeUploadFile(csv_data)

    result = await csv_to_ohlcv(file)

    assert len(result.data) == 1
    assert result.data[0].open == 106.0


# Empty CSV
@pytest.mark.asyncio
async def test_csv_to_ohlcv_empty_csv():
    csv_data = "timestamp,open,high,low,close,volume\n"

    file = FakeUploadFile(csv_data)

    result = await csv_to_ohlcv(file)

    assert result.symbol == "csv"
    assert len(result.data) == 0


# Empty required field skipped
@pytest.mark.asyncio
async def test_csv_to_ohlcv_skips_empty_required_field():
    csv_data = """timestamp,open,high,low,close,volume
2024-01-01,,110,90,105,1000
2024-01-02,106,115,101,110,2000
"""

    file = FakeUploadFile(csv_data)

    result = await csv_to_ohlcv(file)

    assert len(result.data) == 1
    assert result.data[0].timestamp == datetime(2024, 1, 2)