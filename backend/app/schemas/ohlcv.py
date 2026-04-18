from pydantic import BaseModel
from typing import Optional


class OHLCV(BaseModel):
    open: Optional[float]
    high: Optional[float]
    low: Optional[float]
    close: Optional[float]
    volume: Optional[float]


class OHLCVRow(BaseModel):
    date: str
    price: OHLCV