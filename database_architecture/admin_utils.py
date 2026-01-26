"""
Admin utilities for managing portfolio data in MongoDB
"""
from database_architecture.models import ContactSubmission, Project, Skill, Experience, Education

def seed_initial_data():
    """
    Seed initial portfolio data (run once to populate database)
    """
    try:
        # Seed Skills
        skills_data = [
            {"name": "React", "category": "frontend", "proficiency_level": 8},
            {"name": "JavaScript", "category": "frontend", "proficiency_level": 8},
            {"name": "HTML", "category": "frontend", "proficiency_level": 9},
            {"name": "CSS", "category": "frontend", "proficiency_level": 9},
            {"name": "Python", "category": "backend", "proficiency_level": 7},
            {"name": "Node.js", "category": "backend", "proficiency_level": 6},
            {"name": "MongoDB", "category": "database", "proficiency_level": 7},
            {"name": "Git", "category": "tools", "proficiency_level": 8},
            {"name": "AI/ML", "category": "specialized", "proficiency_level": 6},
            {"name": "Java", "category": "backend", "proficiency_level": 7},
        ]

        for skill_data in skills_data:
            Skill.save_skill(**skill_data)

        # Seed Projects
        projects_data = [
            {
                "title": "Portfolio Website",
                "description": "Modern React portfolio with responsive design, dark mode, and interactive features",
                "technologies": ["React", "CSS", "JavaScript"],
                "github_url": "https://github.com/your-username/portfolio",
                "live_url": "https://your-portfolio.com",
                "category": "web"
            },
            {
                "title": "Web Applications",
                "description": "Various web applications built with modern technologies",
                "technologies": ["React", "Node.js", "MongoDB"],
                "github_url": "https://github.com/your-username/web-apps",
                "live_url": "https://your-webapps.com",
                "category": "web"
            }
        ]

        for project_data in projects_data:
            Project.save_project(**project_data)

        # Seed Experience
        experience_data = [
            {
                "role": "Student Developer",
                "company": "Self-Employed",
                "location": "Remote",
                "start_date": "2023-01-01",
                "end_date": "Present",
                "description": "Developing web applications and learning modern technologies",
                "technologies": ["React", "Python", "JavaScript", "MongoDB"]
            }
        ]

        for exp_data in experience_data:
            Experience.save_experience(**exp_data)

        # Seed Education
        education_data = [
            {
                "degree": "B.Tech in Computer Science and Engineering",
                "institution": "DRIEMS University",
                "location": "India",
                "start_date": "2023-01-01",
                "end_date": "2027-01-01",
                "description": "Currently in 2nd year, focusing on software development and AI"
            },
            {
                "degree": "Diploma in Computer Science and Engineering",
                "institution": "DRIEMS University",
                "location": "India",
                "start_date": "2020-01-01",
                "end_date": "2025-01-01",
                "description": "Completed diploma with focus on programming fundamentals"
            }
        ]

        for edu_data in education_data:
            Education.save_education(**edu_data)

        print("Initial data seeded successfully!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        raise

def get_dashboard_stats():
    """
    Get statistics for admin dashboard
    """
    try:
        total_contacts = len(ContactSubmission.get_all_submissions())
        total_projects = len(Project.get_all_projects())
        total_skills = len(Skill.get_skills_by_category())
        unread_contacts = len([c for c in ContactSubmission.get_all_submissions() if c.get('status') == 'unread'])

        return {
            "total_contacts": total_contacts,
            "total_projects": total_projects,
            "total_skills": total_skills,
            "unread_contacts": unread_contacts
        }
    except Exception as e:
        print(f"Error getting dashboard stats: {e}")
        return {"error": str(e)}

def export_data():
    """
    Export all portfolio data as JSON
    """
    try:
        data = {
            "contacts": ContactSubmission.get_all_submissions(),
            "projects": Project.get_all_projects(),
            "skills": Skill.get_skills_by_category(),
            "experience": Experience.get_all_experience(),
            "education": Education.get_all_education()
        }
        return data
    except Exception as e:
        print(f"Error exporting data: {e}")
        return {"error": str(e)}
