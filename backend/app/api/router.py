from fastapi import APIRouter
from app.api.endpoints import market, uploadCSV


api_router = APIRouter()
api_router.include_router(market.router, prefix= "/market")
api_router.include_router(uploadCSV.router, prefix="/upload")
