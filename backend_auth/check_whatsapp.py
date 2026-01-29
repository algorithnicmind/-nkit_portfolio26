"""Check WhatsApp configuration status"""
import os
import sys
from dotenv import load_dotenv

# Load .env from parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(env_path)

phone = os.getenv('WHATSAPP_PHONE_NUMBER')
apikey = os.getenv('CALLMEBOT_APIKEY')

print("\n" + "="*50)
print("📱 WhatsApp Notification Configuration Status")
print("="*50)

print(f"\n✅ Phone Number: {phone}")
if apikey:
    print(f"✅ API Key: {'*' * (len(apikey) - 2) + apikey[-2:] if len(apikey) > 2 else '(set)'}")
    print("\n🎉 WhatsApp notifications are READY!")
else:
    print("❌ API Key: NOT SET")
    print("\n⚠️ To enable WhatsApp notifications:")
    print("   1. Add +34 644 51 95 23 to your WhatsApp contacts")
    print("   2. Send 'I allow callmebot to send me messages' to that number")
    print("   3. Copy the API key you receive")
    print("   4. Add it to .env file: CALLMEBOT_APIKEY=your_key_here")

print("\n" + "="*50)
