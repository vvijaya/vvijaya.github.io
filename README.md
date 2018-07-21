# Python

Getting creative in Python is so much fun and easy with vast amount of
community supported package that mainly focused on either AI / web framework.

This repo branch is going to explain how I work with Python in production,
pls note that this list going to expand more in the future.

want to take a peek? run `pip install -r requirements.txt && python3 app.py`
but, make sure Python3 and pip is executable from path

## 2018-07-22 - Modular App Demo

This will show you how we manage dozen to hundreds of service & feature,
REST API is surely glorious, /user and /product serve different data
and can have multiple method following the resource, /user/login and 
/product/soymilk/buy is completely different logical stuff.

with this environment it's normal to split the code by resource and even
method, until the app is getting so huge that make everyone coding with
nervous. we need ability to split things up for granular unit test and
integration.

long story short, the app need to be flexible and sturdy, able to run just
one service at a time, or even the complete package by simply sending a parameter

the idea is given that we have a 100 list of service, of course we can run
it as monolith architecture, but how we can split our service? the answer
is sending an arguments to the console, or environment variable

```
SERVICE=add:8080 static/s200:8081 static/s404:8081
```

we have this String that can be interpolated by

```python
import os
os.getenv("SERVICE")
```

this is a `str` so we need to parse it to `dict`, since only we can control
the input, no need to check the edge cases like typo (nice to have tho)

- first split by space ` `
- then each of part, split by `:`
- finally make a `dict`, by taking the second part as a key with value
  type `list`, and append the value of the first one

```python
services = {} # Empty dict

# Splitting ENV from string to list to dict
for i in [
    i.split(":") # [['add', '8080'], ['static/s200', '8081'], ['static/s404', '8081']]
    for i in os.getenv("SERVICE").split(' ') # ['add:8080', 'static/s200:8081', 'static/s404:8081']
]:
    services.setdefault(i[1], []).append(i[0]) # {"8080": ['add'], "8081": ['static/s200', 'static/s404']}
services = {k: set(v) for k, v in services.items()} # this line is removing duplicate service name
```

with this `dict` we can make a selective app services, unit test &
integration test can be done by simply setting the ENV variable,
next step is importing the service based on what we select prior

```python
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
```

this code can handle nested directory import because Python `import` is evaluating string

and the blueprint

```python
from flask import Blueprint, jsonify
from flask_cors import cross_origin

add = Blueprint(__name__, __name__)


@add.route("/")
@add.route("/<int:a>")
@add.route("/<int:a>/<int:b>")
@cross_origin()
def index(a: int = 0, b: int = 0): return jsonify({"result": a + b})
```

by this setting we can set on our local as many port as we can, this can
also used for profiling, we can benchmark per service load, or multi-service
load to maximize resource usage

remember, this case we have 2 ports, 8080(`add`) & 8081(`static/s200` & `static/s404`),
should we want the same service running on each port, just add the ENV variables
`add:8080 add:8081`

#### Trivia

- Flask is throwing error when same `blueprint` run on same `app`,
  note on `add = Blueprint(__name__, __name__)`,
  `add` is the same as filename which uniquely guaranteed 
