from fastapi import APIRouter
from app.clients.alpha_vantage import get_daily_prices
from app.schemas.market import PriceResponse

router = APIRouter()

@router.get("/prices/{symbol}", response_model=PriceResponse)
def fetch_prices(symbol: str):
    return get_daily_prices(symbol)