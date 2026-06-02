import re


KNOWN_CATEGORIES = [
    "SALES RETURN",
    "SALES PROMOTION GOODS",
    "SALES PROMOTION",
    "SALES PROMOTINS",
    "CREDIT NOTE",
    "RE SELLING GOODS",
    "CONSUMING GOODS",
    "REFRESHMENT",
    "VECHICLE REPAIRING GOODS",
    "VECHICLE",
    "REPAIRE &MAINTENANCE GOODS",
    "REPAIR",
    "DEFECTIVE GOODS",
    "DEFECTIVE",
    "CONSTRUCTION",
    "MARKETING",
    "PARCEL",
    "QUOTATION",
    "QUATIONS",
    "GST",
    "ESI",
    "PENDING",
    "BORROWED",
    "RENEWALS",
    "STAND BY SERVICE",
    "SAMPLE GOODS",
    "DC / BEND",
    "DC/ BEND",
    "OUTGOING",
    "SALES",
    "PURCHASE",
    "RETURN"
]


def extract_amount(text):

    text = str(text)

    numbers = re.findall(
        r"\b\d+(?:\.\d+)?\b",
        text
    )

    valid = []

    for n in numbers:

        value = float(n)

        # ignore section numbers

        if value in (
            1,2,3,4,5,6,7,8,
            1.0,2.0,3.0,4.0,
            5.0,6.0,7.0,8.0
        ):
            continue

        # ignore large document numbers

        if value > 10000000:
            continue

        valid.append(value)

    if not valid:
        return 0

    return max(valid)


def detect_category(text):

    text = str(text).upper()

    for category in sorted(
        KNOWN_CATEGORIES,
        key=len,
        reverse=True
    ):
        if category in text:
            return category

    return ""


def clean_workbook_data(workbook_data):

    cleaned_data = {}

    for sheet_name, sheet_data in workbook_data.items():

        cleaned_rows = []

        for row in sheet_data["rows"]:

            values = []

            for v in row.values():

                if str(v).strip():
                    values.append(str(v))

            if not values:
                continue

            full_text = "\n".join(values)

            category = detect_category(full_text)

            amount = extract_amount(full_text)

            if category:

                cleaned_rows.append({
                    "sheet": sheet_name,
                    "category": category,
                    "description": full_text,
                    "amount": amount
                })

        cleaned_data[sheet_name] = cleaned_rows

    return cleaned_data