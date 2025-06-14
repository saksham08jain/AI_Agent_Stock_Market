import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Set theme from localStorage or default to light
const theme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', theme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
