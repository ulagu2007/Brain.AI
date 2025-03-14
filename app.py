from flask import Flask, request, jsonify, send_file
from pptx import Presentation
import os

app = Flask(__name__)

# Ensure the directory for PPTs exists
OUTPUT_DIR = "generated_ppts"
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.route("/generate", methods=["POST"])
def generate_ppt():
    data = request.get_json()
    topic = data.get("topic", "").strip()

    if not topic:
        return jsonify({"message": "Topic is required"}), 400

    ppt_filename = f"{topic.replace(' ', '_')}.pptx"
    ppt_path = os.path.join(OUTPUT_DIR, ppt_filename)

    # Create a PowerPoint Presentation
    prs = Presentation()
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    title = slide.shapes.title
    title.text = f"Presentation on {topic}"
    
    prs.save(ppt_path)

    return send_file(ppt_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
