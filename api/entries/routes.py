from flask_restful import Api
from entries.views import CreateEntryApi, GetEntries


def create_entries_routes(api: Api):
    """Adds resources to the api.
    :param api: Flask-RESTful Api Object
    """
    api.add_resource(CreateEntryApi, "/api/entries/create/")
    api.add_resource(GetEntries, "/api/entries/get/")
