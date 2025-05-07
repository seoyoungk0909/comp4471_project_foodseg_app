# 🍽️ Food Segmentation Web Application

Made for COMP4471 Group Projcet.<br>
Team Members: KIM Seoyoung | WAN Nga Chi | WONG Pak Sing

## Overview

This web application enables users to:

- Upload images of food items.
- Perform instance segmentation using a pre-trained YOLOv8 model.
- Display the segmented image with labeled bounding boxes.
- Present nutritional information for each detected ingredient based on a provided dataset.

The application is built with:

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Model**: Pre-trained YOLOv8 segmentation model (`yolov8s-seg.pt`)
- **Data**: `nutrition_dataset.csv` containing nutritional information mapped to FoodSeg103 labels.

---

## Project Structure

```
food-segmentation-app/
├── backend/
│   ├── app.py
│   ├── static/
│   │   └── uploads/
│   ├── templates/
│   │   └── index.html
│   ├── nutrition_dataset.csv
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadForm.js
│   │   │   └── ResultPage.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── ResultPage.css
│   │   │   └── UploadForm.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Python** (version 3.8 or higher)
- **Node.js** (version 14.x or higher)
- **npm** (comes with Node.js)

---

## Backend Setup (Flask)

### 1. Navigate to the Backend Directory

```bash
cd backend
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Upload weights

Upload model weight, typically, `best.pt` to backend/models.<br>
If you want to use pre-trained YOLO weight, specify in backend/app.py
For example, change to:

```bash
model = YOLO('models/yolov8s-seg.pt')
```

### 5. Run the Flask Application

```bash
python app.py
```

The backend will be available at `http://localhost:5000`.

---

## Frontend Setup (React)

### 1. Navigate to the Frontend Directory on Another Terminal

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the React Application

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

---

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. On the main page, upload an image of food.
3. Click the "Analyze" button.
4. The application will process the image and redirect you to the results page.
5. On the results page, you'll see:
   - The segmented image with labeled bounding boxes.
   - Nutritional information for each detected ingredient.
