from app.classifiers.category_classifier import CATEGORY_MAP


def detect_event_type(text):

    if not text:
        return "unknown"

    text = text.upper()

    for keyword in sorted(
        CATEGORY_MAP.keys(),
        key=len,
        reverse=True
    ):
        if keyword in text:
            return CATEGORY_MAP[keyword]

    return "unknown"


def calculate_kpis(events):

    sales = 0
    purchases = 0
    expenses = 0

    pending_items = 0
    credit_notes = 0
    borrowed_stock = 0

    for event in events:

        et = event["event_type"]

        if et == "sales":
            sales += event["amount"]

        elif et == "purchase":
            purchases += event["amount"]

        elif et in [
            "office_expense",
            "vehicle_expense",
            "maintenance"
        ]:
            expenses += event["amount"]

        elif et == "pending_issue":
            pending_items += 1

        elif et == "credit_note":
            credit_notes += event["amount"]

        elif et == "borrowed_stock":
            borrowed_stock += 1

    return {
        "sales": sales,
        "purchases": purchases,
        "expenses": expenses,
        "pending_items": pending_items,
        "credit_notes": credit_notes,
        "borrowed_stock": borrowed_stock
    }


def analyze_workbook(cleaned_data):

    events = []

    for sheet_name, rows in cleaned_data.items():

        for row in rows:

            event_type = detect_event_type(
                row["description"]
            )

            events.append({
                "date": sheet_name,
                "event_type": event_type,
                "description": row["description"],
                "amount": row["amount"]
            })

    return {
        "kpis": calculate_kpis(events),
        "events": events
    }