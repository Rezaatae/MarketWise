from fastapi import APIRouter
from app.api.endpoints import market


api_router = APIRouter()
api_router.include_router(market.router, prefix= "/market")
