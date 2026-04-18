from typing import List
from pydantic import BaseModel
from app.schemas.ohlcv import OHLCVRow


class OHLCVResponse(BaseModel):
    symbol: str
    source: str
    data: List[OHLCVRow]