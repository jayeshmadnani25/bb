# HTTP Request Script

A Python script that makes HTTP GET requests and captures detailed response information including status codes, headers, and body content.

## Features

- Makes HTTP GET requests to specified URLs
- Captures and displays:
  - HTTP status code
  - Response headers
  - Response body
  - Body length
- Comprehensive error handling:
  - Network errors (DNS failures, connection refused)
  - HTTP errors (4xx, 5xx status codes)
  - Timeout errors
  - Invalid responses
- Saves response data to a JSON file for later analysis
- Clean, readable console output

## Requirements

- Python 3.6 or higher (uses only standard library, no external dependencies)

## Installation

No installation required! The script uses only Python's standard library.

Simply clone or download this repository:

```bash
git clone <repository-url>
cd bb
```

## Usage

### Basic Usage

Run the script with the default URL:

```bash
python3 http_request.py
```

### Custom URL

Provide a custom URL as a command-line argument:

```bash
python3 http_request.py https://example.com
```

### Make the script executable (Linux/macOS)

```bash
chmod +x http_request.py
./http_request.py
```

## Output

### Console Output

The script displays the response in a readable format:

```
Making HTTP GET request to: http://example.com
Timestamp: 2025-12-05T22:12:21.834952
--------------------------------------------------------------------------------

✓ REQUEST SUCCESSFUL

Status Code: 200

Headers:
  Content-Type: text/html; charset=UTF-8
  Content-Length: 1256
  ...

Body Length: 1256 bytes

Body Content:
--------------------------------------------------------------------------------
<response body content>
--------------------------------------------------------------------------------

✓ Response saved to: response.json
```

### JSON File Output

The script automatically saves the complete response to `response.json`:

```json
{
  "success": true,
  "status_code": 200,
  "headers": {
    "Content-Type": "text/html; charset=UTF-8",
    ...
  },
  "body": "<response content>",
  "body_length": 1256,
  "timestamp": "2025-12-05T22:12:21.834952"
}
```

## Error Handling

The script handles various error scenarios:

### Network Errors
- DNS resolution failures
- Connection refused
- Network unreachable

### HTTP Errors
- 4xx client errors (400, 404, etc.)
- 5xx server errors (500, 503, etc.)

### Timeout Errors
- Request timeout (default: 10 seconds)

### Example Error Output

```
✗ REQUEST FAILED

Error Type: HTTPError
Status Code: 404
Reason: Not Found
```

## Exit Codes

- `0`: Request succeeded (HTTP 2xx-3xx)
- `1`: Request failed (errors or HTTP 4xx-5xx)

## Customization

You can modify the timeout value by editing the `make_http_request()` call in the `main()` function:

```python
response_data = make_http_request(url, timeout=30)  # 30 second timeout
```

## Examples

### Check if a website is accessible

```bash
python3 http_request.py https://www.google.com
```

### Test an API endpoint

```bash
python3 http_request.py https://api.github.com/users/octocat
```

### Test with error handling

```bash
python3 http_request.py https://httpbin.org/status/404
```

## Troubleshooting

### Permission Denied

If you get a "Permission denied" error on Linux/macOS:

```bash
chmod +x http_request.py
```

### Python Not Found

Make sure Python 3 is installed:

```bash
python3 --version
```

If not installed, visit https://www.python.org/downloads/

## License

This script is provided as-is for educational and testing purposes.
