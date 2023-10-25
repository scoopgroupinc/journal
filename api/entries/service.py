from entries.models import Entry
from server import db
from utils.common import generate_response
from utils.http_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from auth_middleware import token_required
from context import session_state
from langchain.llms import Clarifai
from langchain import PromptTemplate
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory, ChatMessageHistory
from langchain.schema import HumanMessage, AIMessage

def create_entry(user, input_data):
    """
    It creates a new entry
    :param request: The request object
    :param input_data: This is the data that is passed to the function
    :return: A response object
    """
    # create_validation_schema = CreateSignupInputSchema()
    # errors = create_validation_schema.validate(input_data)
    # if errors:
    #     return generate_response(message=errors)
    # check_username_exist = User.query.filter_by(
    #     username=input_data.get("username")
    # ).first()
    # check_email_exist = User.query.filter_by(email=input_data.get("email")).first()
    # if check_username_exist:
    #     return generate_response(
    #         message="Username already exist", status=HTTP_400_BAD_REQUEST
    #     )
    # elif check_email_exist:
    #     return generate_response(
    #         message="Email  already taken", status=HTTP_400_BAD_REQUEST
    #     )

    new_entry = Entry(user_id=user.id, **input_data)  # Create an instance of the User class

    db.session.add(new_entry)  # Adds new User record to database
    db.session.commit()  # Comment

    return generate_response(
        data=new_entry.as_dict(), message="Entry Created", status=HTTP_201_CREATED
    )

def get_entries(user, request):
    """
    It takes in a request and input data, validates the input data,
    checks if the user exists,
    checks if the password is correct, and returns a response
    :param request: The request object
    :param input_data: The data that is passed to the function
    :return: A dictionary with the keys: data, message, status
    """
    # create_validation_schema = CreateSignupInputSchema()
    # errors = create_validation_schema.validate(input_data)
    # if errors:
    #     return generate_response(message=errors)
    # check_username_exist = User.query.filter_by(
    #     username=input_data.get("username")
    # ).first()
    # check_email_exist = User.query.filter_by(email=input_data.get("email")).first()
    # if check_username_exist:
    #     return generate_response(
    #         message="Username already exist", status=HTTP_400_BAD_REQUEST
    #     )
    # elif check_email_exist:
    #     return generate_response(
    #         message="Email  already taken", status=HTTP_400_BAD_REQUEST
    #     )


    entries = Entry.query.filter_by(user_id = user.id)

    return generate_response(
        data=[entry.as_dict() for entry in entries], message="Found entries", status=HTTP_201_CREATED
    )

def sentiment_analysis(token, message):

    llmName="GPT-4"
    llmAuthor="openai"
    llmApp="chat-completion"

    llm = Clarifai(pat=token, user_id=llmAuthor, app_id=llmApp, model_id=llmName)

    template = """
    Current conversation:
    {chat_history}
    Human: {input}
    AI Assistant:"""

    prompt = PromptTemplate(template=template, input_variables=["chat_history", "input"])

    conversation = ConversationChain(
    prompt=prompt,
    llm=llm,
    verbose=True,
    memory=ConversationBufferMemory(ai_prefix="AI Assistant", memory_key="chat_history"),
    )

    response = conversation.predict(input=message, chat_history=session_state["chat_history"])
    return response