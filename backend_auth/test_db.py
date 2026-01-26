
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import sys

# Load environment variables with UTF-16 encoding for Windows
load_dotenv(encoding='utf-16')
uri = os.getenv('MONGODB_CONNECTION_STRING')

print(f"Loaded URI raw: {repr(uri)}")
if uri:
    # Mask password for display
    safe_uri = uri.split('@')[-1] if '@' in uri else '...'+uri[-10:]
    print(f"URI Host part: {safe_uri}")

    print("Using pymongo...")
    try:
        # client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        # client.admin.command('ping')
        # print("SUCCESS: Connected to MongoDB")
        
        # Extract hostname from URI
        # URI format: mongodb+srv://user:pass@hostname/db...
        if '@' in uri:
            host_part = uri.split('@')[1].split('/')[0]
        else:
            host_part = uri.split('//')[1].split('/')[0]
        
        host_part = host_part.split('?')[0] # Remove query params
        
        print(f"debug: Connection hostname is '{host_part}'")
        
        import dns.resolver
        resolver = dns.resolver.Resolver()
        # Try using Google DNS to see if it helps
        # resolver.nameservers = ['8.8.8.8'] 
        
        print(f"debug: Attempting to resolve SRV record for _mongodb._tcp.{host_part}")
        try:
            answers = resolver.resolve(f'_mongodb._tcp.{host_part}', 'SRV')
            print("debug: SRV Resolution SUCCESS!")
            for rdata in answers:
                print(f"  Target: {rdata.target}, Port: {rdata.port}")
        except Exception as e:
            print(f"debug: SRV Resolution FAILED: {e}")

        print(f"debug: Attempting to resolve A record for {host_part}")
        try:
            answers = resolver.resolve(host_part, 'A')
            print("debug: A Record Resolution SUCCESS!")
            for rdata in answers:
                print(f"  IP: {rdata.address}")
        except Exception as e:
            print(f"debug: A Record Resolution FAILED: {e}")
            
        # Validating dnspython version
        import dns.version
        print(f"debug: dnspython version: {dns.version.version}")

    except Exception as e:
        print(f"ERROR: {e}")
