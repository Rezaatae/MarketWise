from typing import List
from pydantic import BaseModel
from app.schemas.ohlcv import OHLCVRow
from app.schemas.analytics import Returns


class OHLCVResponse(BaseModel):
    symbol: str
    source: str
    data: List[OHLCVRow]
    returns: Returns | None = None