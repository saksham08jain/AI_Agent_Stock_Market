import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StockChart from '../components/StockChart';
import axios from 'axios';

const StockDetail = () => {
  const { ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState('1mo');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        
        // Call your backend API to get stock details
        // For now, we'll use mock data
        setTimeout(() => {
          setStockData({
            ticker,
            name: getTickerNameMock(ticker),
            price: (Math.random() * 200 + 50).toFixed(2),
            change: (Math.random() * 10 - 5).toFixed(2),
            percentChange: (Math.random() * 5 - 2.5).toFixed(2),
            marketCap: `$${(Math.random() * 1000 + 50).toFixed(2)}B`,
            peRatio: (Math.random() * 30 + 10).toFixed(2),
            volume: `${(Math.random() * 10 + 1).toFixed(1)}M`,
            avgVolume: `${(Math.random() * 15 + 5).toFixed(1)}M`,
            dayRange: `$${(Math.random() * 160 + 40).toFixed(2)} - $${(Math.random() * 40 + 200).toFixed(2)}`,
            yearRange: `$${(Math.random() * 100 + 40).toFixed(2)} - $${(Math.random() * 100 + 140).toFixed(2)}`,
          });
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError('Failed to load stock data');
        setLoading(false);
      }
    };
    
    fetchStockData();
  }, [ticker]);

  // Helper function to get company name from ticker
  const getTickerNameMock = (ticker) => {
    const companies = {
      'AAPL': 'Apple Inc.',
      'MSFT': 'Microsoft Corporation',
      'GOOGL': 'Alphabet Inc.',
      'AMZN': 'Amazon.com Inc.',
      'META': 'Meta Platforms, Inc.',
      'TSLA': 'Tesla, Inc.',
      'NVDA': 'NVIDIA Corporation',
    };
    
    return companies[ticker] || `${ticker} Inc.`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-800 dark:text-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {stockData && (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                {stockData.name} 
                <span className="text-gray-500 ml-2 text-xl">({ticker})</span>
              </h1>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-semibold">${stockData.price}</span>
                <span className={`ml-2 flex items-center ${parseFloat(stockData.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {parseFloat(stockData.change) >= 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 10-2 0v-5.586l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L12 7.414V13z" clipRule="evenodd" />
                    </svg>
                  )}
                  {stockData.change} ({stockData.percentChange}%)
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Add to Watchlist</button>
            </div>
          </div>
          
          {/* Chart */}
          <div className="mb-8">
            <StockChart ticker={ticker} period={timePeriod} />
            <div className="flex justify-center mt-4 space-x-2">
              {['1mo', '3mo', '6mo', '1y'].map((period) => (
                <button 
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-3 py-1 text-sm rounded ${timePeriod === period ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Stock Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4">Key Statistics</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Market Cap</p>
                  <p className="font-medium">{stockData.marketCap}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">P/E Ratio</p>
                  <p className="font-medium">{stockData.peRatio}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Volume</p>
                  <p className="font-medium">{stockData.volume}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Avg. Volume</p>
                  <p className="font-medium">{stockData.avgVolume}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Day Range</p>
                  <p className="font-medium">{stockData.dayRange}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">52 Week Range</p>
                  <p className="font-medium">{stockData.yearRange}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4">AI Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Based on recent market trends and company performance, our AI suggests:
              </p>
              <div className="flex items-center">
                <div className={`w-2/5 h-2 rounded-full ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div className="ml-4">
                  <span className="font-medium">{Math.random() > 0.5 ? 'Bullish' : 'Bearish'}</span>
                </div>
              </div>
              <p className="mt-4 text-sm">
                For a more detailed analysis, ask our AI assistant specific questions about {ticker}.
              </p>
            </div>
          </div>
          
          {/* News & Recent Developments */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-medium mb-4">Recent News</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                  <h4 className="font-medium mb-1">News headline about {stockData.name} and market updates</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Brief summary of news article with relevant information for investors considering positions in {ticker}...
                  </p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                    <a href="#" className="text-xs text-blue-500 hover:underline">Read more</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StockDetail;