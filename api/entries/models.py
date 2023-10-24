"""Data models."""
import datetime
from server import db

class Entry(db.Model):
    """Data model for journal entries."""

    __tablename__ = "entries"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, index=True, nullable=False)
    text = db.Column(db.String, nullable=False)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=True)

    def __init__(self, **kwargs):
        """
        The function takes in a dictionary of keyword arguments and assigns the values to the class
        attributes
        """
        self.user_id = kwargs.get("user_id")
        self.text = kwargs.get("text")

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def get_by_id(self, entry_id):
        """Get a book by id"""
        entry = Entry.query.filter_by(id=entry_id)
        if not entry:
            return
        return entry

    # def get_by_user_id(self, **kwargs):
    #     """Get all books created by a user"""
    #     entries = Entry.query.filter_by(user_id = kwargs.get("user_id"))
    #     return entries

    # def create(self, title="", description="", image_url="", category="", user_id=""):
    #     """Create a new book"""
    #     book = self.get_by_user_id_and_title(user_id, title)
    #     if book:
    #         return
    #     new_book = db.books.insert_one(
    #         {
    #             "title": title,
    #             "description": description,
    #             "image_url": image_url,
    #             "category": category,
    #             "user_id": user_id
    #         }
    #     )
    #     return self.get_by_id(new_book.inserted_id)

    # def get_all(self):
    #     """Get all books"""
    #     books = db.books.find()
    #     return [{**book, "_id": str(book["_id"])} for book in books]



    # def get_by_category(self, category):
    #     """Get all books by category"""
    #     books = db.books.find({"category": category})
    #     return [book for book in books]

    # def get_by_user_id_and_category(self, user_id, category):
    #     """Get all books by category for a particular user"""
    #     books = db.books.find({"user_id": user_id, "category": category})
    #     return [{**book, "_id": str(book["_id"])} for book in books]

    # def get_by_user_id_and_title(self, user_id, title):
    #     """Get a book given its title and author"""
    #     book = db.books.find_one({"user_id": user_id, "title": title})
    #     if not book:
    #         return
    #     book["_id"] = str(book["_id"])
    #     return book

    # def update(self, book_id, title="", description="", image_url="", category="", user_id=""):
    #     """Update a book"""
    #     data={}
    #     if title: data["title"]=title
    #     if description: data["description"]=description
    #     if image_url: data["image_url"]=image_url
    #     if category: data["category"]=category

    #     book = db.books.update_one(
    #         {"_id": bson.ObjectId(book_id)},
    #         {
    #             "$set": data
    #         }
    #     )
    #     book = self.get_by_id(book_id)
    #     return book

    # def delete(self, book_id):
    #     """Delete a book"""
    #     book = db.books.delete_one({"_id": bson.ObjectId(book_id)})
    #     return book

    # def delete_by_user_id(self, user_id):
        """Delete all books created by a user"""
        book = db.books.delete_many({"user_id": bson.ObjectId(user_id)})
        return book