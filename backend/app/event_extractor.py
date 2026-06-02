# event_extractor.py

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
    """
    Detect event type from description text.
    Longest keywords are checked first to avoid:
    SALES matching SALES RETURN
    SALES matching SALES PROMOTION
    """

    if not text:
        return "unknown"

    text = str(text).upper().strip()

    sorted_keywords = sorted(
        CATEGORY_MAP.keys(),
        key=len,
        reverse=True
    )

    for keyword in sorted_keywords:
        if keyword in text:
            return CATEGORY_MAP[keyword]

    return "unknown"