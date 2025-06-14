import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeContext, UserContext } from './context'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import StockDetail from './pages/StockDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [userAuth, setUserAuth] = useState({
    access_token: null,
    profile_img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    new_notification_available: false,
  })

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col" data-theme={theme}>
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stock/:ticker" element={<StockDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
