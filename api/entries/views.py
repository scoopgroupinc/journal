from flask import Response
from flask_restful import Resource
from flask import request, make_response
from entries.service import create_entry, get_entries
from functools import wraps
from auth_middleware import token_required
from users.models import User

# def authenticate(func):
#     @wraps(func)
#     def wrapper(*args, **kwargs):
#         if not getattr(func, 'authenticated', True):
#             return func(*args, **kwargs)

#         acct = basic_authentication()  # custom account lookup function

#         if acct:
#             return func(*args, **kwargs)

#         flask_restful.abort(401)
#     return wrapper

class CreateEntryApi(Resource):
    # method_decorators = { 'post': [token_required] }

    @staticmethod
    def post() -> Response:
        """
        POST response method for creating entry.
        :return: JSON object
        """
        input_data = request.get_json()
        user_id = request.args.get('user_id')
        user = User.query.filter_by(id=user_id).first()
        response, status = create_entry(user, input_data)
        return make_response(response, status)


class GetEntries(Resource):
    # method_decorators = { 'get': [token_required] }

    @staticmethod
    def get() -> Response:
        """
        GET response method for retrieiving entries
        :return: JSON object
        """
        user_id = request.args.get('user_id')
        user = User.query.filter_by(id=user_id).first()
        response, status = get_entries(user, request)
        return make_response(response, status)