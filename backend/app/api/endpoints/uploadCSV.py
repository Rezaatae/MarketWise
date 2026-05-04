from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.market_data_service import get_market_data
from app.schemas.response_model import MarketResponse, MetricsRequest
from app.validators.documentValidator import DocumentValidator

router = APIRouter()

@router.post("/upload-csv", response_model=MarketResponse)
async def upload_csv(file: UploadFile = File(...), config: str = Form(...)):
    validator = DocumentValidator()
    validation = await validator.validate_file(file)
    if not validation["valid"]:
        raise HTTPException(status_code=400, detail={
                "message": "File validation failed",
                "errors": validation["errors"]
            })
    config_data = MetricsRequest.model_validate_json(config)
    return await get_market_data("csv", file=file, config=config_data)



