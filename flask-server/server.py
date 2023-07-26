from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt4 import process_message

app = Flask(__name__)
CORS(app)

@app.route('/api/test', methods=['POST'])
def gpt4_api():
    data = request.get_json()
    input_data = data.get('message', '')
    output_message = process_message(input_data)
    return jsonify({'message': output_message})

if __name__ == '__main__':
    app.run(debug=True)


# 