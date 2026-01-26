from datetime import datetime
from database_architecture.connection import get_database

class ContactSubmission:
    def __init__(self, name, email, subject, message):
        self.name = name
        self.email = email
        self.subject = subject
        self.message = message
        self.created_at = datetime.utcnow()
        self.status = "unread"  # unread, read, responded

    def to_dict(self):
        """Convert object to dictionary for MongoDB storage"""
        return {
            "name": self.name,
            "email": self.email,
            "subject": self.subject,
            "message": self.message,
            "created_at": self.created_at,
            "status": self.status
        }

    @staticmethod
    def save_contact_submission(name, email, subject, message):
        """
        Save a contact form submission to MongoDB
        """
        try:
            db = get_database()
            contact_collection = db.contact_submissions

            # Create contact submission object
            submission = ContactSubmission(name, email, subject, message)

            # Insert into database
            result = contact_collection.insert_one(submission.to_dict())

            print(f"Contact submission saved with ID: {result.inserted_id}")
            return result.inserted_id

        except Exception as e:
            print(f"Error saving contact submission: {e}")
            raise

    @staticmethod
    def get_all_submissions():
        """
        Retrieve all contact submissions from database
        """
        try:
            db = get_database()
            contact_collection = db.contact_submissions

            # Get all submissions, sorted by creation date (newest first)
            submissions = list(contact_collection.find().sort("created_at", -1))

            return submissions

        except Exception as e:
            print(f"Error retrieving contact submissions: {e}")
            raise

    @staticmethod
    def update_submission_status(submission_id, status):
        """
        Update the status of a contact submission
        """
        try:
            db = get_database()
            contact_collection = db.contact_submissions

            from bson import ObjectId
            result = contact_collection.update_one(
                {"_id": ObjectId(submission_id)},
                {"$set": {"status": status}}
            )

            return result.modified_count > 0

        except Exception as e:
            print(f"Error updating submission status: {e}")
            raise

class Project:
    def __init__(self, title, description, technologies, github_url, live_url, image_url=None, category="web"):
        self.title = title
        self.description = description
        self.technologies = technologies
        self.github_url = github_url
        self.live_url = live_url
        self.image_url = image_url
        self.category = category
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        self.featured = False

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "technologies": self.technologies,
            "github_url": self.github_url,
            "live_url": self.live_url,
            "image_url": self.image_url,
            "category": self.category,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "featured": self.featured
        }

    @staticmethod
    def save_project(title, description, technologies, github_url, live_url, image_url=None, category="web"):
        try:
            db = get_database()
            projects_collection = db.projects

            project = Project(title, description, technologies, github_url, live_url, image_url, category)
            result = projects_collection.insert_one(project.to_dict())

            print(f"Project saved with ID: {result.inserted_id}")
            return result.inserted_id
        except Exception as e:
            print(f"Error saving project: {e}")
            raise

    @staticmethod
    def get_all_projects():
        try:
            db = get_database()
            projects_collection = db.projects
            return list(projects_collection.find().sort("created_at", -1))
        except Exception as e:
            print(f"Error retrieving projects: {e}")
            raise

class Skill:
    def __init__(self, name, category, proficiency_level, icon_url=None):
        self.name = name
        self.category = category  # e.g., "frontend", "backend", "database", "tools"
        self.proficiency_level = proficiency_level  # 1-10
        self.icon_url = icon_url
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return {
            "name": self.name,
            "category": self.category,
            "proficiency_level": self.proficiency_level,
            "icon_url": self.icon_url,
            "created_at": self.created_at
        }

    @staticmethod
    def save_skill(name, category, proficiency_level, icon_url=None):
        try:
            db = get_database()
            skills_collection = db.skills

            skill = Skill(name, category, proficiency_level, icon_url)
            result = skills_collection.insert_one(skill.to_dict())

            print(f"Skill saved with ID: {result.inserted_id}")
            return result.inserted_id
        except Exception as e:
            print(f"Error saving skill: {e}")
            raise

    @staticmethod
    def get_skills_by_category():
        try:
            db = get_database()
            skills_collection = db.skills

            skills = list(skills_collection.find())
            # Group by category
            categorized = {}
            for skill in skills:
                category = skill.get('category', 'other')
                if category not in categorized:
                    categorized[category] = []
                categorized[category].append(skill)

            return categorized
        except Exception as e:
            print(f"Error retrieving skills: {e}")
            raise

class Experience:
    def __init__(self, role, company, location, start_date, end_date, description, technologies=None):
        self.role = role
        self.company = company
        self.location = location
        self.start_date = start_date
        self.end_date = end_date
        self.description = description
        self.technologies = technologies or []
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return {
            "role": self.role,
            "company": self.company,
            "location": self.location,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "description": self.description,
            "technologies": self.technologies,
            "created_at": self.created_at
        }

    @staticmethod
    def save_experience(role, company, location, start_date, end_date, description, technologies=None):
        try:
            db = get_database()
            experience_collection = db.experience

            experience = Experience(role, company, location, start_date, end_date, description, technologies)
            result = experience_collection.insert_one(experience.to_dict())

            print(f"Experience saved with ID: {result.inserted_id}")
            return result.inserted_id
        except Exception as e:
            print(f"Error saving experience: {e}")
            raise

    @staticmethod
    def get_all_experience():
        try:
            db = get_database()
            experience_collection = db.experience
            return list(experience_collection.find().sort("start_date", -1))
        except Exception as e:
            print(f"Error retrieving experience: {e}")
            raise

class Education:
    def __init__(self, degree, institution, location, start_date, end_date, description=None, gpa=None):
        self.degree = degree
        self.institution = institution
        self.location = location
        self.start_date = start_date
        self.end_date = end_date
        self.description = description
        self.gpa = gpa
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return {
            "degree": self.degree,
            "institution": self.institution,
            "location": self.location,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "description": self.description,
            "gpa": self.gpa,
            "created_at": self.created_at
        }

    @staticmethod
    def save_education(degree, institution, location, start_date, end_date, description=None, gpa=None):
        try:
            db = get_database()
            education_collection = db.education

            education = Education(degree, institution, location, start_date, end_date, description, gpa)
            result = education_collection.insert_one(education.to_dict())

            print(f"Education saved with ID: {result.inserted_id}")
            return result.inserted_id
        except Exception as e:
            print(f"Error saving education: {e}")
            raise

    @staticmethod
    def get_all_education():
        try:
            db = get_database()
            education_collection = db.education
            return list(education_collection.find().sort("start_date", -1))
        except Exception as e:
            print(f"Error retrieving education: {e}")
            raise

class SoftPost:
    def __init__(self, category, caption, media_url, media_type):
        self.category = category  # "Certificate", "Hackathon", "Motivation", etc.
        self.caption = caption
        self.media_url = media_url
        self.media_type = media_type  # "image" or "video"
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return {
            "category": self.category,
            "caption": self.caption,
            "media_url": self.media_url,
            "media_type": self.media_type,
            "created_at": self.created_at
        }

    @staticmethod
    def save_post(category, caption, media_url, media_type):
        try:
            db = get_database()
            posts_collection = db.soft_posts
            
            post = SoftPost(category, caption, media_url, media_type)
            result = posts_collection.insert_one(post.to_dict())
            
            print(f"Soft Post saved with ID: {result.inserted_id}")
            return result.inserted_id
        except Exception as e:
            print(f"Error saving soft post: {e}")
            raise

    @staticmethod
    def get_all_posts():
        try:
            db = get_database()
            posts_collection = db.soft_posts
            return list(posts_collection.find().sort("created_at", -1))
        except Exception as e:
            print(f"Error retrieving soft posts: {e}")
            raise
