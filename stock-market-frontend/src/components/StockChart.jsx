import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ ticker = 'AAPL', period = '1mo' }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState(period);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // This is a placeholder - in a real app you would fetch from your backend or directly from Yahoo Finance API
        // For demo purposes, we're just generating mock data
        
        const days = currentPeriod === '1mo' ? 30 : 
                    currentPeriod === '3mo' ? 90 : 
                    currentPeriod === '6mo' ? 180 : 365;
                    
        const labels = Array.from({ length: days }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (days - i));
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        // Generate mock price data with a realistic trend
        const basePrice = 150 + Math.random() * 50;
        const volatility = 2;
        const trend = 0.05; // Slight upward trend
        
        const prices = labels.map((_, i) => {
          return basePrice + (basePrice * trend * i / days) + (Math.random() - 0.5) * volatility;
        });
        
        setChartData({
          labels,
          datasets: [
            {
              label: ticker,
              data: prices,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              tension: 0.1
            }
          ]
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [ticker, currentPeriod]);
  
  if (loading) return <div className="h-64 flex items-center justify-center">Loading chart...</div>;
  
  if (error) return <div className="h-64 flex items-center justify-center text-red-500">{error}</div>;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">{ticker} Stock Price</h3>
        <div className="flex gap-2">
          {['1mo', '3mo', '6mo', '1y'].map((p) => (
            <button 
              key={p}
              className={`px-2 py-1 text-sm rounded ${currentPeriod === p ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              onClick={() => setCurrentPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        {chartData && <Line data={chartData} options={{ maintainAspectRatio: false }} />}
      </div>
    </div>
  );
};

export default StockChart;