import { create } from 'zustand';


// --- API Helper Functions (defined outside the store for clarity) ---
// Helper 1: Predict the disease from the image
const getDiseasePrediction = async (formData) => {
  const url = `/analytics/prediction/`;
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to get disease prediction.');
  }
  return response.json();
};


// Helper 2: Get details for the predicted disease
const getAdditionalDetails = async (diseaseName) => {
  const url = `/analytics/details/`;
  const response = await fetch(url, {
    method: "POST", // Assuming the backend expects a POST with the disease name
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: diseaseName }), // Send disease name in the body
  });

  if (!response.ok) {
    throw new Error('Failed to get additional details.');
  }
  return response.json();
};


// --- Zustand Store Definition ---

const usePredictionStore = create((set) => ({
  isLoading: false,
  error: null,
  // This will hold the final, combined data for the results page
  predictionResult: null, 
  // Store the image URL to show it on the results page
  uploadedImageUrl: null, 

  // The main action to run the entire prediction process
  getResults: async (formData, imageUrl, navigate) => {
    set({ isLoading: true, error: null, predictionResult: null, uploadedImageUrl: imageUrl });

    try {
      // Step 1: Get the initial disease prediction (e.g., ['Eczema', 'Psoriasis'])
      const predictionResponse = await getDiseasePrediction(formData);
      console.log(predictionResponse)
      
      // We'll use the top prediction to get more details
      const topDiseaseName = predictionResponse.predictions[0].name;

      // Step 2: Get the detailed information for the top disease
      const detailsResponse = await getAdditionalDetails(topDiseaseName);

      // Step 3: Combine the results into one object for the UI
      const finalResult = {
        image: imageUrl,
        predictions: predictionResponse.predictions, // The list of all predictions
        details: detailsResponse, // The detailed info for the top prediction
      };
      
      set({ predictionResult: finalResult, isLoading: false });

      // Step 4: Navigate to the results page on success
      navigate('/results');

    } catch (error) {
      console.error("Prediction failed:", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default usePredictionStore;