from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.parsers.excel_parser import read_excel_file
from app.cleaners.excel_cleaner import clean_workbook_data
from app.analyzers.financial_analyzer import analyze_workbook
from app.analyzers.audit_builder import build_audit

router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    workbook_data = read_excel_file(file_path)

    cleaned_data = clean_workbook_data(workbook_data)

    analytics = analyze_workbook(cleaned_data)

    audit = build_audit(
        analytics["events"]
    )

    return {
        "filename": file.filename,
        **analytics,
        "audit": audit,
        "message": "Excel processed successfully"
    }