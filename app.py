import importlib
import os

import dotenv
import gevent
from flask import Blueprint, Flask
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
from pathlib import Path

dotenv.load_dotenv(dotenv_path=Path('.') / '.env')
services = {}

# Splitting ENV from string to list to dict
for i in [i.split(":") for i in os.getenv("SERVICE").split(' ')]:
    services.setdefault(i[1], []).append(i[0])
services = {k: set(v) for k, v in services.items()}

# Start modular app from ENV
for k, v in services.items():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    CORS(app)

    # Join app on same port
    for name in v:
        __dot = name.replace("/", ".")
        __file = name.split("/").pop()
        __path = "service.{}.{}".format(__dot, __file)
        __service = getattr(__import__(__path, fromlist=[__file]), __file)
        app.register_blueprint(__service, url_prefix="/{}".format(name))

        # SET DEFAULT HOME TO 200
        if name == "static/s200":
            app.register_blueprint(__service, url_prefix="/")
        # SET DEFAULT HOME TO 200

    print(">>> running", v, "on port", k)
    server = WSGIServer(("0.0.0.0", int(k)), app, spawn=16)
    server.start()

while True:
    gevent.sleep(1)
