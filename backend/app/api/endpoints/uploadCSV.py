from fastapi import APIRouter, UploadFile, File
from app.services.uploadFile import upload_csv as upload_csv_service
from app.schemas.market import PriceResponse

router = APIRouter()

@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    return await upload_csv_service(file)