import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import usePredictionStore from '../store/predictionStore';

const Results = () => {
  const { predictionResult } = usePredictionStore();

  if (!predictionResult) {
    return <Navigate to="/predict" />;
  }

  const { image, predictions, details } = predictionResult;
  const topPrediction = predictions[0];

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
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Image</h3>
              <img src={image} alt="Uploaded skin concern" className="rounded-lg w-full" />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">AI Analysis Results</h3>
              <ul>
                {predictions.map((pred, index) => (
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

          {/* Right Column: Disease Details from API */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-4xl font-extrabold text-gray-800">{topPrediction.name}</h2>
              
              <div className="mt-8 space-y-8">
                {/* Overview */}
                {details.overview && (
                    <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-3">Overview</h4>
                        <p className="text-gray-700 leading-relaxed">{details.overview}</p>
                    </div>
                )}
                
                {/* Symptoms */}
                {details.symptoms && details.symptoms.length > 0 && (
                    <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-3">Common Symptoms</h4>
                        <ul className="space-y-2">
                            {details.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                <span className="text-gray-700">{symptom}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                )}

                 {/* Causes */}
                {details.causes && details.causes.length > 0 && (
                    <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-3">Potential Causes</h4>
                        <ul className="space-y-2">
                            {details.causes.map((cause, index) => (
                            <li key={index} className="flex items-start">
                                <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-3 mt-1 shrink-0" />
                                <span className="text-gray-700">{cause}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* General Advice / Home Remedies */}
                {details.remedies && details.remedies.length > 0 && (
                    <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-3">General Advice</h4>
                        <div className="space-y-4">
                            {details.remedies.map((remedy, index) => (
                                <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                    <h5 className="font-semibold text-blue-800">{remedy.title}</h5>
                                    <p className="text-blue-700">{remedy.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* When to See a Doctor */}
                {details.whenToSeeDoctor && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                        <div className="flex items-start">
                            <InformationCircleIcon className="h-8 w-8 text-yellow-500 mr-4 shrink-0" />
                            <div>
                            <h4 className="text-xl font-bold text-yellow-800">When to See a Doctor</h4>
                            <p className="mt-2 text-yellow-700 leading-relaxed">{details.whenToSeeDoctor}</p>
                            </div>
                        </div>
                    </div>
                )}

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

export default Results;