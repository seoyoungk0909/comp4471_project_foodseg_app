from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import os
import cv2
import numpy as np
import pandas as pd
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "static/uploads/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load fine-tuned YOLOv8 model
model = YOLO("models/best.pt")

# Load nutrition dataset
nutrition_df = pd.read_csv("nutrition_dataset.csv")
nutrition_df.columns = [col.strip().lower() for col in nutrition_df.columns]

if "foodseg103 label" not in nutrition_df.columns:
    raise KeyError("The column 'foodseg103 label' is missing in nutrition_dataset.csv.")


@app.route("/analyze", methods=["POST"])
def analyze():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Run YOLOv8 segmentation
    results = model(filepath)[0]

    # Get class indices and names
    class_indices = results.boxes.cls.cpu().numpy()
    label_names = np.array([results.names[int(cls)] for cls in class_indices])

    # Filter out 'background'
    keep_indices = label_names != "background"

    # Keep only non-background detections
    results.boxes = results.boxes[keep_indices]
    if results.masks:
        results.masks.data = results.masks.data[keep_indices]

    # Save labeled image
    labeled_image = results.plot()

    # Convert from RGB to BGR before saving (OpenCV uses BGR)
    labeled_image_bgr = cv2.cvtColor(labeled_image, cv2.COLOR_RGB2BGR)

    # Save the labeled image
    output_path = os.path.join(app.config["UPLOAD_FOLDER"], f"labeled_{filename}")
    cv2.imwrite(output_path, labeled_image_bgr)

    # Nutrition info based on labels
    unique_labels = set(label_names[keep_indices])
    nutrition_info = []
    for label in unique_labels:
        match = nutrition_df[
            nutrition_df["foodseg103 label"].str.lower() == label.lower()
        ]
        if not match.empty:
            row = match.iloc[0].to_dict()
            row["ingredient"] = label
        else:
            row = {
                "ingredient": label,
            }
        nutrition_info.append(row)

    return jsonify(
        {
            "original_image_url": f"/{filepath}",
            "labeled_image_url": f"/{output_path}",
            "labels": list(unique_labels),
            "nutrition": nutrition_info,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
