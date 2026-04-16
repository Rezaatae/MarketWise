from pydantic import BaseModel, field_validator
from typing import List, Optional

class OHLCV(BaseModel):
    open: Optional[float]
    high: Optional[float]
    low: Optional[float]
    close: Optional[float]
    volume: Optional[float]

    @field_validator("*", mode="before")
    def parse_float(cls, v):
        try:
            return float(v)
        except (TypeError, ValueError):
            return None

class PriceResponse(BaseModel):
    timestamps: List[str]
    prices: List[OHLCV]
