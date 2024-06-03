import json
import sys

def main():
    try:
        while True:
            message = sys.stdin.buffer.readline().decode('utf-8').strip()
            if not message:
                break

            # Parse the received message (assuming JSON format)
            try:
                data = json.loads(message)
            except json.JSONDecodeError:
                send_response({"error": "Invalid message"})
                continue
            print(data['message'])
            # Process the message (echo it back)
            response = {"message": data.get("message", "No message provided")}
            send_response(response)
    except KeyboardInterrupt:
        # Handle termination via Ctrl+C
        pass

def send_response(response):
    # Send a response back to the extension
    response_str = json.dumps(response)
    response_bytes = response_str.encode('utf-8')
    sys.stdout.buffer.write(response_bytes)
    sys.stdout.buffer.write(b'\n')
    sys.stdout.buffer.flush()

if __name__ == "__main__":
    main()
