from fastapi import APIRouter, Body
from app.services.market_data_service import get_market_data
from app.schemas.response_model import MarketResponse, MetricsRequest

router = APIRouter()

@router.post("/alpha-market-data/{symbol}", response_model=MarketResponse)
async def compute_alpha_metrics(symbol: str, config: MetricsRequest):
    return await get_market_data("alpha", symbol=symbol, config=config)
    

