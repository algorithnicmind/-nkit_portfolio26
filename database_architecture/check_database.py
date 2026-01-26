"""
Script to check MongoDB Atlas database and view contact submissions
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database_architecture.connection import get_database
from database_architecture.models import ContactSubmission

def check_database():
    """Check database connection and view contact submissions"""
    try:
        # Get database connection
        db = get_database()

        # Check if contact_submissions collection exists and get count
        collection = db.contact_submissions
        count = collection.count_documents({})

        print("✅ Database Connection Successful!")
        print(f"📊 Total contact submissions: {count}")

        if count > 0:
            print("\n📋 Recent Contact Submissions:")
            print("-" * 50)

            # Get all submissions (limit to last 10)
            submissions = list(collection.find().sort("submitted_at", -1).limit(10))

            for i, submission in enumerate(submissions, 1):
                print(f"\n{i}. Name: {submission.get('name', 'N/A')}")
                print(f"   Email: {submission.get('email', 'N/A')}")
                print(f"   Subject: {submission.get('subject', 'N/A')}")
                print(f"   Message: {submission.get('message', 'N/A')[:100]}...")
                print(f"   Submitted: {submission.get('submitted_at', 'N/A')}")
                print(f"   Status: {submission.get('status', 'unread')}")
        else:
            print("\n📝 No contact submissions found yet.")
            print("💡 Try submitting a contact form to see data here!")

        # Show collection names
        collections = db.list_collection_names()
        print(f"\n📁 Available collections: {collections}")

    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        print("🔧 Make sure your MONGODB_CONNECTION_STRING environment variable is set correctly")

if __name__ == "__main__":
    check_database()
