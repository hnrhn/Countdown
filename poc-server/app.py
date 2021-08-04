from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    conn = sqlite3.connect("todo.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM to_do_items ORDER BY start_date_time ASC")
    results = cur.fetchall()

    y = jsonify([
        {
            "name": x["name"],
            "start_date_time": x["start_date_time"],
            "end_date_time": None,
            "repeats_every": None,
            "type": x["type"],
            "dismissed_date_time": None
        }
        for x in results
    ])

    return y


if __name__ == '__main__':
    app.run()
