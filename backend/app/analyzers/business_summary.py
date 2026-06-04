# app/analyzers/business_summary.py

def generate_summary(kpis):

    summary = []

    summary.append(
        f"Total Sales: ₹{kpis['sales']:,.2f}"
    )

    summary.append(
        f"Total Purchases: ₹{kpis['purchases']:,.2f}"
    )

    summary.append(
        f"Total Expenses: ₹{kpis['expenses']:,.2f}"
    )

    summary.append(
        f"Estimated Profit: ₹{kpis['profit_estimate']:,.2f}"
    )

    if kpis["pending_items"] > 0:
        summary.append(
            f"{kpis['pending_items']} pending items require attention."
        )

    if kpis["borrowed_stock"] > 0:
        summary.append(
            f"{kpis['borrowed_stock']} borrowed stock records detected."
        )

    return "\n".join(summary)