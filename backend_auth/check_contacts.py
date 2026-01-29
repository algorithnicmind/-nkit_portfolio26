"""Quick script to check contact submissions in database"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database_architecture.connection import get_database

db = get_database()
submissions = list(db.contact_submissions.find().sort('created_at', -1).limit(5))

print("\n" + "="*50)
print("📬 Recent Contact Submissions")
print("="*50)

if submissions:
    for i, s in enumerate(submissions, 1):
        print(f"\n{i}. {s.get('name', 'N/A')}")
        print(f"   Email: {s.get('email', 'N/A')}")
        print(f"   Subject: {s.get('subject', 'N/A')}")
        print(f"   Message: {s.get('message', 'N/A')[:50]}...")
        print(f"   Date: {s.get('created_at', 'N/A')}")
        print(f"   Status: {s.get('status', 'N/A')}")
else:
    print("\n❌ No contact submissions found in database yet.")
    print("   Submit a message through the contact form to test!")

print("\n" + "="*50)
