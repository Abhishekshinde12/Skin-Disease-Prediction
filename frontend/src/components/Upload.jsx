// src/components/UploadPage.js

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpOnSquareIcon, PhotoIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    multiple: false,
  });

  const handlePredict = () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    // Simulate API call
    console.log("Making API call with file:", selectedFile.name);
    setTimeout(() => {
      setIsLoading(false);
      // Here you would navigate to the results page with the API response
      // For now, we just log it and reset.
      alert("Prediction complete! (Simulated)");
    }, 3000);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
       {/* Header */}
       <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">DermAI</Link>
          <nav>
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Back to Home</Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="grow container mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Upload Your Image</h2>
            <p className="text-gray-600 mt-2">Get an AI-powered analysis of your skin concern.</p>
          </div>

          {/* Upload Area */}
          {!preview ? (
            <div
              {...getRootProps()}
              className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-colors duration-300 ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`}
            >
              <input {...getInputProps()} />
              <PhotoIcon className="h-16 w-16 text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-indigo-600 font-semibold">Drop the image here...</p>
              ) : (
                <p className="text-gray-500">
                  <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">PNG, JPG, WEBP up to 10MB</p>
            </div>
          ) : (
            // Image Preview
            <div className="w-full text-center">
                <div className="relative inline-block">
                    <img src={preview} alt="Preview" className="w-auto h-64 max-h-64 rounded-lg shadow-md mx-auto" />
                    <button 
                        onClick={handleRemoveImage}
                        className="absolute -top-3 -right-3 bg-white rounded-full p-1 text-red-500 hover:text-red-700 hover:bg-gray-100 shadow-md transition-transform transform hover:scale-110"
                        title="Remove image"
                    >
                        <XCircleIcon className="h-8 w-8"/>
                    </button>
                </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8">
            <button
              onClick={handlePredict}
              disabled={!selectedFile || isLoading}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ArrowUpOnSquareIcon className="h-6 w-6 mr-2" />
                  {selectedFile ? 'Start Prediction' : 'Upload an Image'}
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">This tool does not provide medical advice. Always consult with a qualified healthcare professional.</p>
        </div>
      </footer>
    </div>
  );
};

export default UploadPage;