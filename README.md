# DermAI: AI-Powered Skin Concern Analysis

DermAI is a web application that allows users to upload an image of a skin concern and receive an AI-powered analysis. The backend is built with Django and Django Rest Framework, while the frontend is a modern React application built with Vite.

## Features

*   **Image Upload**: Simple drag-and-drop or click-to-upload interface for skin images.
*   **AI-Powered Prediction**: Utilizes a Deep Learning model (Efficient Net B1) to predict potential skin conditions based on the uploaded image.
*   **Detailed Information**: Provides additional details about the predicted condition, including symptoms, causes, and remedies.
*   **Clean & Responsive UI**: Modern user interface built with React and Tailwind CSS.

## Project Structure
```
├── backend/ # Django Project
│ ├── manage.py
│ ├── analytics/ # Django App for API endpoints
│ └── ml_model/ # ML model files and prediction logic
│
└── frontend/ # React + Vite Project
├── src/
└── package.json
```

## Installation
### 1. Backend Setup (Django)
#### Step 1 Create virtual env
First, navigate into the backend directory and set up the Django server.

```bash
# Navigate to the backend directory
cd backend
# Create the virtual environment
python -m venv venv
# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### Step 2 - Install Dependencies
```pip install -r requirements.txt```

#### Step 3 - Create Media Directory - to store user uploaded image
```mkdir media```

#### Step 4 - Apply DB Migrations
```python manage.py migrate```

#### Step 5 - Setup Env Variable
```bash
# create an .env file and add your LLM API KEY, is using Gemini then add GOOGLE_API_KEY=YOUR_API_KEY
```

#### Step 6: Run the Django Server
The backend server will run on `http://localhost:8000`.

```python manage.py runserver```

---

### 2. Frontend Setup 
#### Step 1 - Navigate to the frontend directory from the project root
```cd frontend```
#### Step 2 - Install Dependencies
```npm install```
#### Step 3 - Start React Dev Server
```npm run dev```

---

### API Endpoints
- POST /analytics/prediction/: Accepts an image file upload and returns a list of disease predictions.
- POST /analytics/details/: Accepts a disease name and returns detailed information about it.```
