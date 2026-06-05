from app.classifiers.category_classifier import detect_event_type
from app.analyzers.business_summary import generate_summary


def extract_company(description):
    if not description:
        return "Unknown"

    ignore_words = [
        "sales",
        "marketing",
        "maintenance",
        "quotation",
        "renewal",
        "parcel",
        "delivery",
        "nill",
        "borrowed",
        "pending",
        "service",
        "tax",
        "gst",
        "esi",
        "repair",
        "vechicle",
        "vehicle",
        "credit note",
        "re selling goods",
        "purchase",
        "outgoing",
        "sample",
        "construction",
        "defective",
    ]

    lines = str(description).split("\n")

    for line in lines:
        line = line.strip()

        if len(line) < 3:
            continue

        cleaned = (
            line.replace("1.", "")
            .replace("2.", "")
            .replace("3.", "")
            .replace("4.", "")
            .replace("5.", "")
            .strip()
        )

        lower = cleaned.lower()

        if any(word in lower for word in ignore_words):
            continue

        if cleaned.replace(".", "").replace("/", "").isdigit():
            continue

        if "dated" in lower:
            cleaned = cleaned.split(",")[0].strip()

        return cleaned

    return "Unknown"


def calculate_kpis(events):
    sales = 0
    purchases = 0
    expenses = 0

    pending_items = 0
    credit_notes = 0
    borrowed_stock = 0

    event_counts = {}

    for event in events:
        et = event["event_type"]

        amount = float(event.get("amount", 0) or 0)

        event_counts[et] = event_counts.get(et, 0) + 1

        if et == "sales":
            sales += amount

        elif et == "purchase":
            purchases += amount

        elif et in [
            "office_expense",
            "vehicle_expense",
            "maintenance",
        ]:
            expenses += amount

        elif et == "pending_issue":
            pending_items += 1

        elif et == "credit_note":
            credit_notes += amount

        elif et == "borrowed_stock":
            borrowed_stock += 1

    profit_estimate = sales - purchases - expenses

    return {
        "sales": sales,
        "purchases": purchases,
        "expenses": expenses,
        "profit_estimate": profit_estimate,
        "pending_items": pending_items,
        "credit_notes": credit_notes,
        "borrowed_stock": borrowed_stock,
        "event_counts": event_counts,
    }


def analyze_workbook(cleaned_data):
    events = []

    for sheet_name, rows in cleaned_data.items():
        for row in rows:
            description = row["description"]

            event_type = detect_event_type(description)

            company = extract_company(description)

            events.append(
                {
                    "date": sheet_name,
                    "event_type": event_type,
                    "company": company,
                    "description": description,
                    "amount": row["amount"],
                }
            )

    kpis = calculate_kpis(events)

    return {
        "kpis": kpis,
        "summary": generate_summary(kpis),
        "events": events,
    }