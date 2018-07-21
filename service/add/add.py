from flask import Blueprint, jsonify
from flask_cors import cross_origin

add = Blueprint(__name__, __name__)


@add.route("/")
@add.route("/<int:a>")
@add.route("/<int:a>/<int:b>")
@cross_origin()
def index(a: int = 0, b: int = 0): return jsonify({"result": a + b})
