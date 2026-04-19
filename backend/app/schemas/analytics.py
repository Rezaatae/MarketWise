from pydantic import BaseModel
from typing import List, Optional

class Returns(BaseModel):
    simple: List[Optional[float]]
    log: List[Optional[float]]