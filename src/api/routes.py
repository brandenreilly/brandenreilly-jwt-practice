"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/token', methods=['POST'])
def handle_create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    exists = User.query.filter_by(username=username).first()
    if exists:
        if password == exists.password:
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token)
        else:
            return jsonify({"msg": "Username or Password Incorrect"}), 401  
    else: 
        return jsonify({"msg": "User does not exist."}), 401

@api.route('/signup', methods=['POST'])
def handle_create_user():
    recieved = request.json
    check_exists = User.query.filter_by(username=recieved["username"]).first()
    if check_exists:
        return jsonify({"msg": "Username is already taken"}), 409
    else:
        new_user = User(username=recieved["username"], password=recieved["password"])
        db.session.add(new_user)
        db.session.commit()
        return jsonify('User Created'), 200
    
@api.route('/private', methods=['GET'])
@jwt_required()
def handle_test_get():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200  