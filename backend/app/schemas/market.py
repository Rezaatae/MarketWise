from pydantic import BaseModel
from typing import List
from datetime import datetime

class PriceResponse(BaseModel):
    timestamps: List[str]
    prices: List[float]
