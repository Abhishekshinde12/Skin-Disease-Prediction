import { create } from 'zustand';
import { persist } from 'zustand/middleware';


// --- API Helper Functions (defined outside the store for clarity) ---
// Helper 1: Predict the disease from the image
const getDiseasePrediction = async (formData) => {
  console.log(formData)
  const url = `/analytics/prediction/`;
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

    console.log("Inspecting FormData contents before sending inside store:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

  if (!response.ok) {
    throw new Error('Failed to get disease prediction.');
  }
  const data = await response.json()
  return data;
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

const usePredictionStore = create(
  persist(
    (set) => ({
      isLoading: false,
      error: null,
      predictionResult: null,
      uploadedImageUrl: null,

      getResults: async (formData, imageUrl, navigate) => {
        set({ isLoading: true, error: null, predictionResult: null, uploadedImageUrl: imageUrl });

        try {
          const predictionResponse = await getDiseasePrediction(formData);
          console.log(predictionResponse);

          const topDiseaseName = predictionResponse.predictions[0].name;
          const detailsResponse = await getAdditionalDetails(topDiseaseName);

          let parsedDetails;
          try {
            parsedDetails = typeof detailsResponse === 'string'
              ? JSON.parse(detailsResponse)  // parse string to object
              : detailsResponse;
          } catch (e) {
            console.error("Failed to parse disease details:", e);
            parsedDetails = {}; // fallback
          }

          const finalResult = {
            image: imageUrl,
            predictions: predictionResponse.predictions,
            details: parsedDetails,
          };

          set({ predictionResult: finalResult, isLoading: false });
          console.log(finalResult)

          navigate('/results');
        } catch (error) {
          console.error("Prediction failed:", error);
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: 'prediction-storage', // key name in localStorage
      partialize: (state) => ({
        predictionResult: state.predictionResult,
        uploadedImageUrl: state.uploadedImageUrl,
      }),
    }
  )
);

export default usePredictionStore;