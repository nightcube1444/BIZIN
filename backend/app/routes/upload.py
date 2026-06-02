from fastapi import APIRouter, UploadFile, File
import shutil

from app.parsers.excel_parser import read_excel_file
from app.cleaners.excel_cleaner import clean_workbook_data
from app.analyzers.financial_analyzer import analyze_workbook

router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    workbook_data = read_excel_file(file_path)

    cleaned_data = clean_workbook_data(workbook_data)

    analytics = analyze_workbook(cleaned_data)

    return {
        "filename": file.filename,
        **analytics,
        "message": "Excel file processed successfully"
    }