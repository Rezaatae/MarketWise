from pydantic import BaseModel
from typing import List

class PriceResponse(BaseModel):
    timestamps: List[str]
    prices: List[float]