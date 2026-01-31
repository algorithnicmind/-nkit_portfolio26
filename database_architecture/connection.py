from pymongo import MongoClient
import os
from dotenv import load_dotenv
import certifi

# Load environment variables with default encoding
load_dotenv()

def get_database():
    """
    Establish connection to MongoDB Atlas and return database instance
    """
    try:
        # Get MongoDB connection string from environment variable
        connection_string = os.getenv('MONGODB_CONNECTION_STRING')

        if not connection_string:
            raise ValueError("MONGODB_CONNECTION_STRING environment variable not found. Please check your .env file.")

        # Create MongoDB client
        # FIX: Bypass SSL verification for local dev environments where certificates fail
        client = MongoClient(connection_string, tls=True, tlsAllowInvalidCertificates=True, serverSelectionTimeoutMS=5000)

        # Test the connection
        client.admin.command('ping')

        # Get database (you can change 'portfolio_db' to your preferred name)
        db = client.portfolio_db

        print("Successfully connected to MongoDB Atlas")
        return db

    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        print("Please check your MongoDB Atlas connection string in the .env file")
        raise
