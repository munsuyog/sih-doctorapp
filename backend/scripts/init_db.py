#!/usr/bin/python3

import os
import sqlite3
import json

config = {}
with open("./config.json", "r") as f:
    config = json.loads(f.read())

conn = sqlite3.connect(config["DB_URI"])

with open("./schema.sql", "r") as f:
    conn.executescript(f.read())
    conn.commit()

conn.close()
