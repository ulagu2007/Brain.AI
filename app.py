from flask import Flask, request, jsonify, send_file
from pptx import Presentation
import openai
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# OpenAI API Key (Replace with your key)
openai.api_key = "your-api-key"

# Ensure the directory for PPTs exists
OUTPUT_DIR = "generated_ppts"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_ppt(topic):
    # Ask GPT-4 to generate slide content
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Create a 5-slide PowerPoint presentation on {topic}. Provide only slide titles and bullet points."}]
    )

    # Extract content
    slides = response["choices"][0]["message"]["content"].strip().split("\n\n")

    # Create PowerPoint Presentation
    prs = Presentation()

    for slide_text in slides:
        slide = prs.slides.add_slide(prs.slide_layouts[1])  # Title + Content layout
        lines = slide_text.split("\n")
        title = lines[0].strip()
        content = "\n".join(lines[1:])

        slide.shapes.title.text = title
        slide.placeholders[1].text = content

    # Save PowerPoint
    ppt_filename = f"{topic.replace(' ', '_')}.pptx"
    ppt_path = os.path.join(OUTPUT_DIR, ppt_filename)
    prs.save(ppt_path)

    return ppt_path

@app.route("/generate", methods=["POST"])
def generate_ppt_api():
    data = request.get_json()
    topic = data.get("topic", "").strip()

    if not topic:
        return jsonify({"message": "Topic is required"}), 400

    ppt_path = generate_ppt(topic)
    return send_file(ppt_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
