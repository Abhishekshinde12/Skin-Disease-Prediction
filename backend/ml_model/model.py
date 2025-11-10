import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.efficientnet import preprocess_input
from PIL import Image
import numpy as np

# Load the trained model once at import time
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'efficientnet.keras')
model = load_model(MODEL_PATH)

def predict(image_path, top_k=3):
    """
    Run prediction on a given image and return top K results.
    """
    try:
        # Correct size for EfficientNet
        img = Image.open(image_path).resize((224, 224))
        img_array = np.array(img)

        # Add batch dimension
        img_batch = np.expand_dims(img_array, axis=0)

        # Preprocess using efficient net function
        processed_image = preprocess_input(img_batch)

        # Predict
        preds = model.predict(processed_image)

        class_labels = [
            'Atopic Dermatitis', 
            'Basal Cell Carcinoma (BCC)', 
            'Benign Keratosis-like Lesions (BKL)', 
            'Eczema', 
            'Melanocytic Nevi (NV)', 
            'Melanoma', 
            'Psoriasis pictures Lichen Planus and related diseases', 
            'Seborrheic Keratoses and other Benign Tumors', 
            'Tinea Ringworm Candidiasis and other Fungal Infections', 
            'Warts Molluscum and other Viral Infections'
        ]

        # Use correct length of preds[0]
        results = [(class_labels[i], float(preds[0][i])) for i in range(len(preds[0]))]

        # Convert to %
        probabilities = [(item[0], item[1] * 100) for item in results]

        # Sort by confidence
        sorted_probabilities = sorted(probabilities, key=lambda item: item[1], reverse=True)

        print(sorted_probabilities)

        return sorted_probabilities[:top_k]
    
    except Exception as e:
        print(f"[ERROR] Prediction failed: {str(e)}")
        return [{"error": str(e)}]
