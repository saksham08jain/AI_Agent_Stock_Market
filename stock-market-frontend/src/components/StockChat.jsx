import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// API configuration
const API_URL = 'https://ai-agent-stock-market.onrender.com/api/v1/query';

const StockChat = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: 'Hello! I can help you with stock information. Try asking about a stock price or analysis.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: userQuery }]);
    setLoading(true);
    setError(null);

    try {
      console.log(`Sending query to ${API_URL}`);
      const response = await axios.post(API_URL, { query: userQuery });
      
      if (response.data && response.data.response) {
        // Add bot response
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: response.data.response 
        }]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('API Error:', error);
      
      let errorMessage = 'Sorry, I encountered an error processing your request.';
      
      if (error.response) {
        // Server responded with error
        if (error.response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please try again in a few moments.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Our AI service is currently experiencing issues.';
        }
        console.log('Error response:', error.response.data);
      } else if (error.request) {
        // No response received
        errorMessage = 'Could not connect to AI service. Please check your internet connection or try again later.';
        console.log('No response received:', error.request);
      }
      
      setError(errorMessage);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: errorMessage,
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    // Submit the question immediately
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSubmit(fakeEvent);
    }, 100);
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="font-medium">AI Stock Assistant</h2>
        <div className="text-xs bg-blue-600 px-2 py-1 rounded-full">
          Powered by AI
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : msg.isError 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                    : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans text-sm">{msg.content}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 inline-block">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about stocks..."
            className="flex-grow p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {/* Quick questions section */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button 
            type="button"
            onClick={() => handleQuickQuestion("What's the price of Apple stock?")}
            className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Apple stock price?
          </button>
          <button 
            type="button"
            onClick={() => handleQuickQuestion("Compare Microsoft and Google stocks")}
            className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Compare MSFT vs GOOGL
          </button>
          <button 
            type="button"
            onClick={() => handleQuickQuestion("What are the top gainers today?")}
            className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Top gainers today
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockChat;