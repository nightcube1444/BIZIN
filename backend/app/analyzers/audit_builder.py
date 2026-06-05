def build_audit(events):

    sales_events = [
        event
        for event in events
        if event["event_type"] == "sales"
    ]

    credit_events = [
        event
        for event in events
        if event["event_type"] == "credit_note"
    ]

    return {
        "sales": {
            "source_events": sales_events
        },
        "credit_notes": {
            "source_events": credit_events
        }
    }