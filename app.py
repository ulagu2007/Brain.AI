from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate_ppt():
    data = request.get_json()
    topic = data.get("topic", "")
    
    if not topic:
        return jsonify({"message": "Topic is required"}), 400
    
    # Simulate PPT generation
    ppt_path = f"{topic.replace(' ', '_')}.pptx"
    with open(ppt_path, "w") as file:
        file.write(f"Presentation on {topic}")
    
    return jsonify({"message": f"PPT generated: {ppt_path}"})

if __name__ == "__main__":
    app.run(debug=True)
