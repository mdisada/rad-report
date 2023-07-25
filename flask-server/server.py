from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/gpt4', methods=['POST'])
def gpt4_api():
    data = request.get_json()
    findingsValue = data.get('findingsValue', '')
    message = findingsValue + "Hello World, I'm Python :) "
    return jsonify({'message': message})

if __name__ == '__main__':
    app.run(debug=True)


