"""
WhatsApp Notification Service
Sends contact form notifications via WhatsApp

Supports two methods:
1. CallMeBot API (if API key is configured)
2. Console logging with click-to-chat link (always works)
"""

import os
import requests
from urllib.parse import quote
from datetime import datetime

class WhatsAppNotifier:
    """
    WhatsApp notification service with multiple fallback options
    """
    
    def __init__(self):
        self.phone_number = os.getenv('WHATSAPP_PHONE_NUMBER', '918093360300')
        self.api_key = os.getenv('CALLMEBOT_APIKEY')
        self.api_url = "https://api.callmebot.com/whatsapp.php"
    
    def is_api_configured(self):
        """Check if CallMeBot API is configured"""
        return bool(self.phone_number and self.api_key)
    
    def format_contact_message(self, name, email, subject, message):
        """Format the contact form data into a WhatsApp message"""
        timestamp = datetime.now().strftime("%d %b %Y, %I:%M %p")
        
        formatted_message = f"""📬 New Contact Form Submission

👤 Name: {name}
📧 Email: {email}
📋 Subject: {subject}

💬 Message:
{message}

⏰ Received: {timestamp}

---
Sent from your Portfolio Website"""
        
        return formatted_message
    
    def generate_whatsapp_link(self, name, email, subject, message):
        """Generate a WhatsApp click-to-chat link with pre-filled message"""
        formatted_message = self.format_contact_message(name, email, subject, message)
        encoded_message = quote(formatted_message)
        
        # WhatsApp API link format (works on web and mobile)
        link = f"https://wa.me/{self.phone_number}?text={encoded_message}"
        return link
    
    def send_via_callmebot(self, formatted_message):
        """Send via CallMeBot API if configured"""
        try:
            encoded_message = quote(formatted_message)
            url = f"{self.api_url}?phone={self.phone_number}&text={encoded_message}&apikey={self.api_key}"
            
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                return True
            return False
        except Exception as e:
            print(f"❌ CallMeBot error: {e}")
            return False
    
    def send_notification(self, name, email, subject, message):
        """
        Send WhatsApp notification for new contact form submission
        
        Returns:
            dict: {'success': bool, 'message': str, 'whatsapp_link': str}
        """
        timestamp = datetime.now().strftime("%d %b %Y, %I:%M %p")
        formatted_message = self.format_contact_message(name, email, subject, message)
        whatsapp_link = self.generate_whatsapp_link(name, email, subject, message)
        
        # Always log the notification to console (so admin can see it in terminal)
        print("\n" + "="*60)
        print("📬 NEW CONTACT FORM SUBMISSION!")
        print("="*60)
        print(f"👤 Name: {name}")
        print(f"📧 Email: {email}")
        print(f"📋 Subject: {subject}")
        print(f"💬 Message: {message[:100]}..." if len(message) > 100 else f"💬 Message: {message}")
        print(f"⏰ Time: {timestamp}")
        print("-"*60)
        print(f"📱 WhatsApp Link (CTRL+Click to open):")
        print(f"   {whatsapp_link[:100]}...")
        print("="*60 + "\n")
        
        # Try CallMeBot API if configured
        api_success = False
        if self.is_api_configured():
            api_success = self.send_via_callmebot(formatted_message)
            if api_success:
                print("✅ WhatsApp notification sent via CallMeBot!")
            else:
                print("⚠️ CallMeBot failed, but notification logged above")
        else:
            print("ℹ️ CallMeBot not configured - notification logged to console")
        
        return {
            'success': True,  # Always return success since we logged it
            'message': 'Notification logged successfully',
            'api_sent': api_success,
            'whatsapp_link': whatsapp_link
        }


# Singleton instance for easy import
whatsapp_notifier = WhatsAppNotifier()


def send_contact_notification(name, email, subject, message):
    """
    Convenience function to send contact form notification
    
    Usage:
        from whatsapp_service import send_contact_notification
        send_contact_notification("John", "john@email.com", "Hello", "Message...")
    """
    return whatsapp_notifier.send_notification(name, email, subject, message)
