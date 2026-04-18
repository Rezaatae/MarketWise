from fastapi import APIRouter
from app.services.market_data_service import get_market_data
from app.schemas.response_model import OHLCVResponse

router = APIRouter()

@router.get("/prices/{symbol}", response_model=OHLCVResponse)
async def fetch_prices(symbol: str):
    return await get_market_data("alpha", symbol=symbol)