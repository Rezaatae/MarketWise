from fastapi import APIRouter, UploadFile, File
from app.services.market_data_service import get_market_data
from app.schemas.response_model import MarketResponse

router = APIRouter()

@router.post("/upload-csv", response_model=MarketResponse)
async def upload_csv(file: UploadFile, symbol: str):
    return await get_market_data("csv", symbol=symbol, file=file)