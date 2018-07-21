from flask import Blueprint, jsonify
from flask_cors import cross_origin

s200 = Blueprint(__name__, __name__)


@s200.route("/")
@cross_origin()
def index(): return jsonify({"status": "OK"})
