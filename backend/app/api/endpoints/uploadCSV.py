from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
import json
from app.services.market_data_service import get_market_data
from app.schemas.response_model import MarketResponse
from app.validators.documentValidator import DocumentValidator

router = APIRouter()

@router.post("/upload-csv", response_model=MarketResponse)
async def upload_csv(file: UploadFile = File(...), config: str = Form(...)):
    contents = await file.read()
    decoded = contents.decode("utf-8")
    print("reztest recieved file from front end")
    print(str(contents))
    print(str(decoded))
    print("reztest getting config_data")
    config_data = json.loads(config)
    print(str(config_data))


    # validation = await DocumentValidator.validate_file(file)
    # if not validation["valid"]:
    #     raise HTTPException(status_code=400, detail={
    #             "message": "File validation failed",
    #             "errors": validation["errors"]
    #         })
    # return await get_market_data("csv", file=file)



