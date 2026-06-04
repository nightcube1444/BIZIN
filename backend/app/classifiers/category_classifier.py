CATEGORY_MAP = {
    "SALES RETURN": "sales_return",
    "SALES PROMOTION GOODS": "marketing",
    "SALES PROMOTION": "marketing",
    "SALES PROMOTINS": "marketing",

    "CREDIT NOTE": "credit_note",
    "RE SELLING GOODS": "credit_note",

    "CONSUMING GOODS": "office_expense",
    "REFRESHMENT": "office_expense",

    "VECHICLE REPAIRING GOODS": "vehicle_expense",
    "VECHICLE": "vehicle_expense",

    "REPAIRE &MAINTENANCE GOODS": "maintenance",
    "REPAIR": "maintenance",

    "DEFECTIVE GOODS": "defective_goods",
    "DEFECTIVE": "defective_goods",

    "CONSTRUCTION": "construction",

    "MARKETING": "marketing",

    "PARCEL": "parcel",

    "QUOTATION": "quotation",
    "QUATIONS": "quotation",

    "GST": "tax",

    "ESI": "employee_benefit",

    "PENDING": "pending_issue",

    "BORROWED": "borrowed_stock",

    "RENEWALS": "renewal",

    "STAND BY SERVICE": "service",

    "SAMPLE GOODS": "sample",

    "DC / BEND": "delivery",
    "DC/ BEND": "delivery",

    "OUTGOING": "outgoing",

    "SALES": "sales",

    "PURCHASE": "purchase",

    "RETURN": "sales_return"
}


def detect_event_type(text):

    if not text:
        return "unknown"

    text = str(text).upper().strip()

    for keyword in sorted(
        CATEGORY_MAP.keys(),
        key=len,
        reverse=True
    ):
        if keyword in text:
            return CATEGORY_MAP[keyword]

    return "unknown"