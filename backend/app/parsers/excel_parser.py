import pandas as pd


def read_excel_file(file_path):

    excel_file = pd.ExcelFile(file_path)

    workbook_data = {}

    for sheet in excel_file.sheet_names:

        df = pd.read_excel(file_path, sheet_name=sheet)

        rows = df.fillna("").to_dict(orient="records")

        workbook_data[sheet] = {
            "columns": df.columns.tolist(),
            "rows": rows,
            "total_rows": len(rows)
        }

    return workbook_data