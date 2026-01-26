"""
Script to create the initial admin user in MongoDB
Run this once to set up the admin account with a hashed password
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from database_architecture.connection import get_database
from auth import hash_password

def create_admin_user(username=None, password=None):
    """Create an admin user with hashed password"""
    if username is None:
        username = os.getenv('ADMIN_USERNAME', 'admin')
    if password is None:
        password = os.getenv('ADMIN_PASSWORD', 'admin123')
    try:
        db = get_database()
        users_collection = db.users
        
        # Check if user already exists
        existing = users_collection.find_one({'username': username})
        if existing:
            print(f"⚠️  User '{username}' already exists!")
            
            # Ask if they want to update the password
            update = input("Do you want to update the password? (y/n): ").lower()
            if update == 'y':
                new_password = input("Enter new password: ")
                hashed = hash_password(new_password)
                users_collection.update_one(
                    {'username': username},
                    {'$set': {'password': hashed, 'updated_at': datetime.now().isoformat()}}
                )
                print(f"✅ Password updated for '{username}'!")
            return
        
        # Hash the password
        hashed_password = hash_password(password)
        
        # Create user document
        user = {
            'username': username,
            'password': hashed_password,
            'role': 'admin',
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat()
        }
        
        # Insert into database
        result = users_collection.insert_one(user)
        
        print(f"✅ Admin user created successfully!")
        print(f"   Username: {username}")
        print(f"   Password: {password} (please change this!)")
        print(f"   User ID: {result.inserted_id}")
        print()
        print("⚠️  IMPORTANT: Change the default password after first login!")
        
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        raise

if __name__ == '__main__':
    print("=" * 50)
    print("  Admin User Setup")
    print("=" * 50)
    print()
    
    # You can customize the credentials here
    # Or run the script and it will use defaults
    create_admin_user()
