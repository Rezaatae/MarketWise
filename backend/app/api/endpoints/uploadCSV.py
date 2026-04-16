from fastapi import APIRouter
from app.services.uploadFile import upload_csv

router = APIRouter()

@router.post("/upload-csv")
async def upload_csv():
    return upload_csv()