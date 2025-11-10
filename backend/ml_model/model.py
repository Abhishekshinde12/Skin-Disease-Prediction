import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.efficientnet import preprocess_input
from PIL import Image
import numpy as np


# Load the trained model once at import time
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'efficientnet.keras')
model = load_model(MODEL_PATH)


def predict(image_path, top_k=1):
    """
    Run prediction on a given image and return top K results.
    """
    img = Image.open(image_path).resize(240,240)
    img_array = np.array(img)
    img_tensor = tf.convert_to_tensor(img_array, dtype=tf.float32)
    processed_image = preprocess_input(img_tensor)
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

    results = [(class_labels[i], float(preds[0][i])) for i in range(len(preds))]

    probabilities = [(item[0], item[1]*100) for item in results]

    sorted_probabilities = sorted(probabilities, key=lambda item: item[1], reverse=True)

    print(sorted_probabilities)

    return sorted_probabilities[:top_k]