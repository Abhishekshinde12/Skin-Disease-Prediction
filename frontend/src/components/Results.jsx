import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  ArrowLeftIcon, 
  BeakerIcon, 
  HeartIcon 
} from '@heroicons/react/24/solid';
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
      <main className="container mx-auto px-6 py-12 space-y-12">

        {/* SECTION 1: Image and Prediction */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Uploaded Image</h3>
            <img src={image} alt="Uploaded skin concern" className="rounded-lg w-full object-cover" />
          </div>

          {/* Predictions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">AI Prediction Results</h3>
            <ul>
              {predictions.map((pred, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-lg mb-3 ${
                    index === 0
                      ? 'bg-indigo-50 border-l-4 border-indigo-500'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-semibold ${
                        index === 0 ? 'text-indigo-800' : 'text-gray-700'
                      }`}
                    >
                      {index + 1}. {pred.name}
                    </span>
                    <span
                      className={`font-bold text-lg ${getConfidenceColor(
                        pred.confidence
                      )}`}
                    >
                      {pred.confidence}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 2: Disease Report */}
        <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
            Disease Report: {topPrediction.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Symptoms */}
            {details.symptoms && details.symptoms.length > 0 && (
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" /> Symptoms
                </h4>
                <ul className="space-y-2">
                  {details.symptoms.map((symptom, index) => (
                    <li key={index} className="text-gray-700 text-sm">
                      • {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Causes */}
            {details.causes && details.causes.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                  <InformationCircleIcon className="h-5 w-5 mr-2" /> Causes
                </h4>
                <ul className="space-y-2">
                  {details.causes.map((cause, index) => (
                    <li key={index} className="text-gray-700 text-sm">
                      • {cause}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Home Remedies */}
            {details.home_remedy && details.home_remedy.length > 0 && (
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h4 className="text-xl font-bold text-purple-800 mb-3 flex items-center">
                  <HeartIcon className="h-5 w-5 mr-2" /> Home Remedies
                </h4>
                <ul className="space-y-2">
                  {details.home_remedy.map((remedy, index) => (
                    <li key={index} className="text-gray-700 text-sm">
                      • {remedy}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Treatment */}
            {details.treatment && details.treatment.length > 0 && (
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <h4 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                  <BeakerIcon className="h-5 w-5 mr-2" /> Treatment
                </h4>
                <ul className="space-y-2">
                  {details.treatment.map((treat, index) => (
                    <li key={index} className="text-gray-700 text-sm">
                      • {treat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Disclaimer */}
        <section className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-4 shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-red-800">Medical Disclaimer</h4>
              <p className="mt-2 text-red-700 leading-relaxed">
                This AI-generated report is for informational purposes only and is <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment. 
                Always seek the advice of a qualified dermatologist or healthcare professional regarding any medical condition.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
