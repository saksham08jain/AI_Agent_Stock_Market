import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserAuth } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // For demo purposes, we'll just simulate a successful login
    setTimeout(() => {
      // Demo credentials for easy testing
      if (email === 'demo@example.com' && password === 'password') {
        setUserAuth({
          access_token: 'demo-token-12345',
          profile_img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
          new_notification_available: true,
        });
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Use demo@example.com / password for demo');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input 
              type="email"
              id="email"
              className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@example.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input 
              type="password"
              id="password"
              className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
        <p className="mt-2 text-center text-xs text-gray-500">
          Demo credentials: demo@example.com / password
        </p>
      </div>
    </div>
  );
};

export default Login;