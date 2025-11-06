// src/components/HomePage.js

import React from 'react';
import { ShieldCheckIcon, ArrowRightIcon, CloudArrowUpIcon, CpuChipIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">DermAI</h1>
          <nav>
            <a href="#features" className="text-gray-600 hover:text-indigo-600 mx-3">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 mx-3">How It Works</a>
            <a href="/predict" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Try Now</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center text-white py-32" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-5xl font-extrabold mb-4">AI-Powered Skin Disease Detection</h2>
          <p className="text-lg mb-8">Upload an image of your skin concern and get an AI-based prediction in seconds.</p>
          <a href="/predict" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
            Get Started <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">Why Choose DermAI?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <ShieldCheckIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Accurate & Fast</h4>
              <p className="text-gray-600">Our AI model is trained on a vast dataset to provide you with quick and reliable predictions.</p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CloudArrowUpIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Easy to Use</h4>
              <p className="text-gray-600">A simple and intuitive interface allows you to upload an image and get results in just a few clicks.</p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <DocumentTextIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Informative</h4>
              <p className="text-gray-600">Receive information about potential conditions, including symptoms and general advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Get Your Analysis in 3 Simple Steps</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="text-center max-w-xs">
              <div className="bg-indigo-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Upload Your Image</h4>
              <p className="text-gray-600">Select or drag and drop an image of the affected skin area.</p>
            </div>
            <div className="text-center max-w-xs">
              <div className="bg-indigo-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">AI Analyzes</h4>
              <p className="text-gray-600">Our intelligent algorithm processes the image to identify patterns.</p>
            </div>
            <div className="text-center max-w-xs">
              <div className="bg-indigo-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Receive Results</h4>
              <p className="text-gray-600">Get a list of potential skin conditions with confidence scores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Used Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-4">Powered By</h4>
            <div className="flex justify-center items-center space-x-8">
                <p className="text-gray-700 font-semibold">TensorFlow</p>
                <p className="text-gray-700 font-semibold">Django</p>
                <p className="text-gray-700 font-semibold">React</p>
                <p className="text-gray-700 font-semibold">Tailwind CSS</p>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 DermAI. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">Disclaimer: This is not a medical service. Consult a professional for any health concerns.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;