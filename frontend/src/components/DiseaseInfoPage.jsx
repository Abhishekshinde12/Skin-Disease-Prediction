// src/components/DiseaseInfoPage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

// --- MOCK DATA ---
// In a real app, this data would come from your API after the prediction.
const mockPredictionData = {
  image: 'https://via.placeholder.com/300x300.png?text=Uploaded+Skin+Image', // URL or base64 of the uploaded image
  predictions: [
    { name: 'Benign Keratosis-like Lesions', confidence: 85.3 },
    { name: 'Eczema', confidence: 9.1 },
    { name: 'Psoriasis', confidence: 3.2 },
  ],
  details: {
    overview: 'Benign keratosis-like lesions (BKL) are common, non-cancerous skin growths that often appear in middle-aged or older adults. They can be flat or slightly raised and typically have a waxy, "stuck-on" look. While they are harmless, it\'s important to distinguish them from more serious conditions.',
    symptoms: [
      'Round or oval-shaped spots',
      'Can be flat or slightly raised with a scaly surface',
      'Vary in color from tan to dark brown or black',
      'Can appear anywhere on the body, but are not typically found on palms or soles',
      'May itch, but are generally not painful',
    ],
    causes: 'The exact cause is unknown, but they tend to be more common with age. Genetics may also play a role, as they often run in families. Sun exposure might also be a contributing factor.',
    remedies: [
      {
        title: 'Moisturize Regularly',
        description: 'Keeping the skin hydrated can help reduce itchiness if present.'
      },
      {
        title: 'Avoid Picking or Scratching',
        description: 'Irritating the lesion can lead to bleeding or minor infection.'
      }
    ],
    whenToSeeDoctor: 'While BKL is benign, you should consult a dermatologist if the lesion changes rapidly in size, shape, or color, if it starts to bleed, or if you are concerned about its appearance. A professional can provide a definitive diagnosis and rule out skin cancer.'
  }
};
// --- END MOCK DATA ---


const DiseaseInfoPage = ({ predictionData = mockPredictionData }) => {
  const topPrediction = predictionData.predictions[0];

  const getConfidenceColor = (confidence) => {
    if (confidence > 75) return 'text-green-600';
    if (confidence > 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">DermAI</Link>
          <Link to="/predict" className="inline-flex items-center text-gray-600 hover:text-indigo-600">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Try Another Prediction
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Predictions & Image */}
          <div className="lg:col-span-1 space-y-8">
            {/* Image Preview */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Image</h3>
              <img src={predictionData.image} alt="Uploaded skin concern" className="rounded-lg w-full" />
            </div>

            {/* Prediction Results */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">AI Analysis Results</h3>
              <ul>
                {predictionData.predictions.map((pred, index) => (
                  <li key={index} className={`p-4 rounded-lg mb-3 ${index === 0 ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold ${index === 0 ? 'text-indigo-800' : 'text-gray-700'}`}>{index + 1}. {pred.name}</span>
                      <span className={`font-bold text-lg ${getConfidenceColor(pred.confidence)}`}>{pred.confidence}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Disease Details */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-4xl font-extrabold text-gray-800">{topPrediction.name}</h2>
              <p className="text-lg text-gray-600 mt-2">Based on the analysis, this is the most likely condition.</p>
              
              <div className="mt-8 space-y-8">
                {/* Overview */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">Overview</h4>
                  <p className="text-gray-700 leading-relaxed">{predictionData.details.overview}</p>
                </div>
                
                {/* Symptoms */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">Common Symptoms</h4>
                  <ul className="space-y-2">
                    {predictionData.details.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                        <span className="text-gray-700">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* General Advice / Home Remedies */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">General Advice</h4>
                   <div className="space-y-4">
                    {predictionData.details.remedies.map((remedy, index) => (
                        <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                            <h5 className="font-semibold text-blue-800">{remedy.title}</h5>
                            <p className="text-blue-700">{remedy.description}</p>
                        </div>
                    ))}
                   </div>
                </div>

                {/* When to See a Doctor */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <div className="flex items-start">
                    <InformationCircleIcon className="h-8 w-8 text-yellow-500 mr-4 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold text-yellow-800">When to See a Doctor</h4>
                      <p className="mt-2 text-yellow-700 leading-relaxed">{predictionData.details.whenToSeeDoctor}</p>
                    </div>
                  </div>
                </div>

                {/* IMPORTANT DISCLAIMER */}
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg mt-10">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-4 shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold text-red-800">Medical Disclaimer</h4>
                      <p className="mt-2 text-red-700 leading-relaxed">
                        This AI analysis is for informational purposes only and is <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified dermatologist or other healthcare provider with any questions you may have regarding a medical condition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiseaseInfoPage;