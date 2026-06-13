import sqlite3

conn = sqlite3.connect(
    "bizintai.db",
    check_same_thread=False
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS pending_issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    issue TEXT,
    assigned_to TEXT,
    priority TEXT,
    status TEXT,
    days_open INTEGER
)
""")

conn.commit()