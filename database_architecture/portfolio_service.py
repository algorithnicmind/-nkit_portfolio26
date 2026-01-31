"""
Service layer for contact form submissions only
"""
from database_architecture.models import ContactSubmission, SoftPost



class PortfolioService:

    @staticmethod
    def submit_contact_form(name, email, subject, message):
        """
        Handle contact form submission with database confirmation
        """
        try:
            # Save to database first
            submission_id = ContactSubmission.save_contact_submission(
                name, email, subject, message
            )
            
            return {
                "success": True,
                "submission_id": str(submission_id),
                "message": "Thank you for your message! Your data has been saved successfully. I will get back to you soon.",
                "data_saved": True
            }
        except Exception as e:
            print(f"Error submitting contact form: {e}")
            return {
                "success": False,
                "message": "Sorry, there was an error saving your message. Please try again later.",
                "data_saved": False,
                "error": str(e)
            }

    @staticmethod
    def get_contact_submissions():
        """
        Get all contact submissions for admin
        """
        try:
            return ContactSubmission.get_all_submissions()
        except Exception as e:
            print(f"Error getting contact submissions: {e}")
            return []

    @staticmethod
    def update_contact_status(submission_id, status):
        """
        Update contact submission status
        """
        try:
            success = ContactSubmission.update_submission_status(submission_id, status)
            return {"success": success}
        except Exception as e:
            print(f"Error updating contact status: {e}")
            return {"success": False, "error": str(e)}

    @staticmethod
    def create_soft_post(category, caption, media_url, media_type):
        """
        Create a new soft post
        """
        try:
            post_id = SoftPost.save_post(category, caption, media_url, media_type)
            return {
                "success": True,
                "post_id": str(post_id),
                "message": "Post created successfully"
            }
        except Exception as e:
            print(f"Error creating post: {e}")
            return {"success": False, "error": str(e)}

    @staticmethod
    def get_soft_posts():
        """
        Get all soft posts
        """
        try:
            posts = SoftPost.get_all_posts()
            # Convert ObjectId and datetime to string/isoformat for JSON serialization
            for post in posts:
                post['_id'] = str(post['_id'])
                if 'created_at' in post:
                    post['created_at'] = post['created_at'].isoformat()
            return posts
        except Exception as e:
            print(f"Error fetching posts: {e}")
            return []
