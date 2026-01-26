"""
Migration script to move all hardcoded chatbot Q&As to MongoDB
Run this once to populate the database, then the chatbot will be 100% database-driven
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv(encoding='utf-16')

from database_architecture.connection import get_database

# All the Q&As to migrate
QUESTIONS_TO_MIGRATE = [
    {
        "question": "who are you",
        "answer": "I'm Ankit Sahoo, a 19-year-old student and tech developer passionate about creating innovative digital solutions. I'm currently in my 2nd year of B.Tech in Computer Science and Engineering at DRIEMS University."
    },
    {
        "question": "what do you do",
        "answer": "I'm a student developer who loves creating web applications and working with modern technologies. I specialize in React, JavaScript, Python, and have experience with AI and machine learning."
    },
    {
        "question": "what are your skills",
        "answer": "I have expertise in various technologies including: Git, React, HTML, CSS, Javascript, Python, Java, C, AI, Machine Learning, DSA, MongoDB, Networking, Communication. I'm particularly strong in web development, programming languages, and emerging technologies like AI and machine learning."
    },
    {
        "question": "what projects have you worked on",
        "answer": "I've worked on several projects including this portfolio website built with React, various web applications using modern technologies, and projects involving AI and machine learning. You can see more details in my projects section."
    },
    {
        "question": "how can I contact you",
        "answer": "You can reach me through my social media profiles: LinkedIn, GitHub, Twitter, and Instagram. All the links are available in the hero section of my portfolio."
    },
    {
        "question": "what is your education",
        "answer": "I'm currently pursuing my 2nd year of B.Tech in Computer Science and Engineering from DRIEMS University. I also completed my Diploma in Computer Science and Engineering from the same university in 2025."
    },
    {
        "question": "do you have experience",
        "answer": "Yes, I have experience in web development, programming, and working with various technologies. I'm constantly learning and building projects to enhance my skills."
    },
    {
        "question": "what technologies do you use",
        "answer": "I work with a wide range of technologies including: Git, React, HTML, CSS, Javascript, Python, Java, C, AI, Machine Learning, DSA, MongoDB, Networking, Communication. I'm always learning new technologies and staying updated with the latest trends in software development."
    },
    {
        "question": "are you available for work",
        "answer": "I'm currently focused on my studies but I'm always open to interesting projects and opportunities. Feel free to reach out through my contact information."
    },
    {
        "question": "what is your age",
        "answer": "I'm 19 years old and passionate about technology and development."
    },
    {
        "question": "where are you from",
        "answer": "I'm from India and currently studying at DRIEMS University."
    },
    {
        "question": "what is your role",
        "answer": "I'm a student and tech developer who loves creating innovative digital solutions and working with modern technologies."
    },
    {
        "question": "who is pragyan",
        "answer": "Pragyan is the closest person to Ankit. She is very special to him - everything Ankit is and everything he has achieved is dedicated to Pragyan. She means the world to him and inspires him in everything he does."
    },
    # Additional keyword-based Q&As
    {
        "question": "skill technology tech",
        "answer": "I have expertise in various technologies including: Git, React, HTML, CSS, Javascript, Python, Java, C, AI, Machine Learning, DSA, MongoDB, Networking, Communication. I'm particularly strong in web development, programming languages, and emerging technologies like AI and machine learning."
    },
    {
        "question": "project work build",
        "answer": "I've worked on several projects including this portfolio website built with React, various web applications using modern technologies, and projects involving AI and machine learning. You can see more details in my projects section."
    },
    {
        "question": "contact reach email social",
        "answer": "You can reach me through my social media profiles: LinkedIn, GitHub, Twitter, and Instagram. All the links are available in the hero section of my portfolio."
    },
    {
        "question": "education study university college",
        "answer": "I'm currently pursuing my 2nd year of B.Tech in Computer Science and Engineering from DRIEMS University. I also completed my Diploma in Computer Science and Engineering from the same university in 2025."
    },
    {
        "question": "hello hi hey greetings",
        "answer": "Hello! 👋 I'm Ankit's portfolio assistant. I can tell you about Ankit's skills, projects, education, experience, or how to contact him. What would you like to know?"
    },
    {
        "question": "thank thanks bye goodbye",
        "answer": "You're welcome! Feel free to ask me anything else about Ankit. Have a great day! 😊"
    }
]

def migrate_data():
    """Migrate all hardcoded Q&As to MongoDB"""
    try:
        db = get_database()
        collection = db.custom_qa
        
        print("Starting migration...")
        print(f"Total Q&As to migrate: {len(QUESTIONS_TO_MIGRATE)}")
        
        added = 0
        skipped = 0
        
        for qa in QUESTIONS_TO_MIGRATE:
            # Check if similar question already exists
            existing = collection.find_one({
                'question': {'$regex': f"^{qa['question']}$", '$options': 'i'}
            })
            
            if existing:
                print(f"  Skipped (already exists): {qa['question'][:40]}...")
                skipped += 1
                continue
            
            # Insert new Q&A
            new_qa = {
                'question': qa['question'],
                'answer': qa['answer'],
                'created_at': datetime.now().isoformat(),
                'updated_at': datetime.now().isoformat(),
                'is_default': True  # Mark as default Q&A
            }
            
            collection.insert_one(new_qa)
            print(f"  Added: {qa['question'][:40]}...")
            added += 1
        
        print(f"\n✅ Migration complete!")
        print(f"   Added: {added}")
        print(f"   Skipped: {skipped}")
        print(f"   Total in database: {collection.count_documents({})}")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        raise

if __name__ == '__main__':
    migrate_data()
