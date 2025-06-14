import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Stock Market AI Assistant</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Get real-time stock analysis, insights, and recommendations powered by advanced AI
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Try the AI Assistant
          </Link>
          <Link to="/signup" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium py-2 px-6 rounded-lg transition-colors">
            Create Account
          </Link>
        </div>
      </div>
      
      {/* Features */}
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-Time Stock Data</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get up-to-date information on stock prices, trends, and market movements
          </p>
        </div>
        
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Advanced algorithms analyze market data to provide personalized insights
          </p>
        </div>
        
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Natural Language Interface</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Ask questions in plain English and get intelligent, conversational responses
          </p>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 text-center bg-blue-50 dark:bg-gray-800 rounded-lg my-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to make smarter investment decisions?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Our AI assistant analyzes market trends and provides personalized recommendations to help you grow your portfolio.
        </p>
        <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors">
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

export default Home;