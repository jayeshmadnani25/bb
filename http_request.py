#!/usr/bin/env python3
"""
HTTP GET Request Script

This script makes an HTTP GET request to a specified URL and captures
the response including status code, headers, and body content.
"""

import sys
import json
from datetime import datetime
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
import socket


def make_http_request(url, timeout=10):
    """
    Make an HTTP GET request to the specified URL.
    
    Args:
        url (str): The URL to request
        timeout (int): Request timeout in seconds
        
    Returns:
        dict: Response data including status, headers, and body
    """
    print(f"Making HTTP GET request to: {url}")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print("-" * 80)
    
    try:
        # Create request with a user agent
        req = Request(url)
        req.add_header('User-Agent', 'Python-HTTP-Request-Script/1.0')
        
        # Make the request
        with urlopen(req, timeout=timeout) as response:
            # Get status code
            status_code = response.status
            
            # Get headers
            headers = dict(response.headers)
            
            # Read response body
            body = response.read()
            
            # Try to decode as UTF-8, fallback to latin-1
            try:
                body_text = body.decode('utf-8')
            except UnicodeDecodeError:
                body_text = body.decode('latin-1', errors='replace')
            
            result = {
                'success': True,
                'status_code': status_code,
                'headers': headers,
                'body': body_text,
                'body_length': len(body),
                'timestamp': datetime.now().isoformat()
            }
            
            return result
            
    except HTTPError as e:
        # HTTP error (4xx, 5xx)
        error_body = ""
        try:
            error_body = e.read().decode('utf-8')
        except:
            error_body = str(e)
            
        return {
            'success': False,
            'error_type': 'HTTPError',
            'status_code': e.code,
            'reason': e.reason,
            'headers': dict(e.headers) if hasattr(e, 'headers') else {},
            'body': error_body,
            'timestamp': datetime.now().isoformat()
        }
        
    except URLError as e:
        # Network error (DNS, connection refused, etc.)
        return {
            'success': False,
            'error_type': 'URLError',
            'reason': str(e.reason),
            'message': 'Network error occurred (DNS failure, connection refused, etc.)',
            'timestamp': datetime.now().isoformat()
        }
        
    except socket.timeout:
        # Timeout error
        return {
            'success': False,
            'error_type': 'TimeoutError',
            'message': f'Request timed out after {timeout} seconds',
            'timestamp': datetime.now().isoformat()
        }
        
    except Exception as e:
        # Any other unexpected error
        return {
            'success': False,
            'error_type': type(e).__name__,
            'message': str(e),
            'timestamp': datetime.now().isoformat()
        }


def display_response(response_data):
    """
    Display the response in a readable format.
    
    Args:
        response_data (dict): Response data from make_http_request
    """
    if response_data['success']:
        print("\n✓ REQUEST SUCCESSFUL\n")
        print(f"Status Code: {response_data['status_code']}")
        print(f"\nHeaders:")
        for key, value in response_data['headers'].items():
            print(f"  {key}: {value}")
        
        print(f"\nBody Length: {response_data['body_length']} bytes")
        print(f"\nBody Content:")
        print("-" * 80)
        print(response_data['body'])
        print("-" * 80)
    else:
        print("\n✗ REQUEST FAILED\n")
        print(f"Error Type: {response_data['error_type']}")
        
        if 'status_code' in response_data:
            print(f"Status Code: {response_data['status_code']}")
        
        if 'reason' in response_data:
            print(f"Reason: {response_data['reason']}")
        
        if 'message' in response_data:
            print(f"Message: {response_data['message']}")
        
        if 'headers' in response_data and response_data['headers']:
            print(f"\nHeaders:")
            for key, value in response_data['headers'].items():
                print(f"  {key}: {value}")
        
        if 'body' in response_data and response_data['body']:
            print(f"\nError Body:")
            print("-" * 80)
            print(response_data['body'])
            print("-" * 80)


def save_response(response_data, filename='response.json'):
    """
    Save the response to a JSON file.
    
    Args:
        response_data (dict): Response data from make_http_request
        filename (str): Output filename
    """
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(response_data, f, indent=2, ensure_ascii=False)
        print(f"\n✓ Response saved to: {filename}")
    except Exception as e:
        print(f"\n✗ Failed to save response: {e}")


def main():
    """Main function."""
    # URL to request
    url = "http://y98flcwn5qmx5n4rjjp9xr6ouf06oycn.oastify.com"
    
    # Allow URL override from command line
    if len(sys.argv) > 1:
        url = sys.argv[1]
    
    # Make the request
    response_data = make_http_request(url, timeout=10)
    
    # Display the response
    display_response(response_data)
    
    # Save to file
    save_response(response_data)
    
    # Exit with appropriate code
    sys.exit(0 if response_data['success'] else 1)


if __name__ == "__main__":
    main()
