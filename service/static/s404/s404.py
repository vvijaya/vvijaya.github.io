from flask import Blueprint, jsonify
from flask_cors import cross_origin

s404 = Blueprint(__name__, __name__)


@s404.route("/")
@cross_origin()
def index(): return jsonify({"status": "Not Found"})
