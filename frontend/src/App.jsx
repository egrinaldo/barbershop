import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Protected Routes */}
              <Route 
                path="/booking" 
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <Footer />
          
          {/* Back to Top Button */}
          <BackToTop />
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{
              zIndex: 9999
            }}
            toastOptions={{
              // Configurações globais para todos os toasts
              duration: 4000,
              // Forçar texto puro para evitar TrustedHTML
              unstyled: false,
              className: '',
              style: {
                background: '#fff',
                color: '#333',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                fontWeight: '500',
                padding: '12px 16px',
                maxWidth: '400px',
                // Evitar problemas de innerHTML
                whiteSpace: 'pre-line',
                wordBreak: 'break-word'
              },
              // Configurações específicas por tipo
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff'
                },
                style: {
                  background: '#f0fdf4',
                  color: '#166534',
                  border: '1px solid #bbf7d0'
                }
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff'
                },
                style: {
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca'
                }
              }
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;