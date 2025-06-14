import React, { useState } from 'react';
import InPageNavigation from '../components/InPageNavigation';
import StockChat from '../components/StockChat';
import StockChart from '../components/StockChart';

const Dashboard = () => {
  const [activeStock, setActiveStock] = useState('AAPL');
  const popularStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Stock Market Dashboard</h1>
      
      <InPageNavigation 
        routes={['AI Assistant', 'Market Overview', 'Watchlist']} 
        defaultActiveIndex={0}
      >
        {/* AI Assistant Tab */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <StockChat />
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-3">Quick Access</h3>
              <div className="flex flex-wrap gap-2">
                {popularStocks.map(stock => (
                  <button 
                    key={stock} 
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm"
                    onClick={() => setActiveStock(stock)}
                  >
                    {stock}
                  </button>
                ))}
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Try asking:</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500">
                    "What's the price of Apple stock?"
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500">
                    "Should I buy Tesla stock?"
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500">
                    "Analyze Microsoft for the last 6 months"
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-3">Market Snapshot</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>S&P 500</span>
                  <span className="text-green-500">+0.78%</span>
                </div>
                <div className="flex justify-between">
                  <span>NASDAQ</span>
                  <span className="text-green-500">+1.12%</span>
                </div>
                <div className="flex justify-between">
                  <span>DOW</span>
                  <span className="text-red-500">-0.26%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview Tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StockChart ticker={activeStock} period="1mo" />
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3">Top Gainers</h3>
            {/* Mock data */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>NVDA</span>
                <span className="text-green-500">+4.28%</span>
              </div>
              <div className="flex justify-between">
                <span>AMD</span>
                <span className="text-green-500">+3.14%</span>
              </div>
              <div className="flex justify-between">
                <span>PYPL</span>
                <span className="text-green-500">+2.67%</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3">Top Losers</h3>
            {/* Mock data */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>META</span>
                <span className="text-red-500">-2.18%</span>
              </div>
              <div className="flex justify-between">
                <span>JPM</span>
                <span className="text-red-500">-1.54%</span>
              </div>
              <div className="flex justify-between">
                <span>DIS</span>
                <span className="text-red-500">-1.07%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Watchlist Tab */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-center py-8 text-gray-500">
            Login to create and manage your watchlist
          </p>
        </div>
      </InPageNavigation>
    </div>
  );
};

export default Dashboard;