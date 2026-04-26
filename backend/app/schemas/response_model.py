from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class OHLCV(BaseModel):
    open: Optional[float]
    high: Optional[float]
    low: Optional[float]
    close: Optional[float]
    volume: Optional[float]


class OHLCVRow(BaseModel):
    date: str
    price: OHLCV

class MarketResponse(BaseModel):
    timestamps: List[datetime]
    close: List[float]

    simple_returns: Optional[List[float]] = None
    log_returns: Optional[List[float]] = None
    total_return: Optional[float] = None

    sma: Optional[List[float]] = None
    ema: Optional[List[float]] = None

    rolling_std: Optional[List[float]] = None
    annualized_volatility: Optional[float] = None

    sharpe_ratio: Optional[float] = None
    max_drawdown: Optional[float] = None

class MetricsRequest(BaseModel):
    window: int = 20
    risk_free_rate: float = 0.0

    compute_returns: bool = True
    compute_sma: bool = True
    compute_ema: bool = True
    compute_volatility: bool = True
    compute_sharpe: bool = True
    compute_drawdown: bool = True